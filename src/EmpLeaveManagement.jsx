import axios from "axios";
import React, { Component } from 'react';
import './EmpLeaveManagement.css';

const MAX_REASON_CHARS = 100;

export default class EmpLeaveManagement extends Component {
  state = {
    leaveTypes: [],
    myLeaves: [],
    teamLeaves: [],
    loading: false,
    activeTab: 'apply',
    leaveId: '',
    startDate: '',
    endDate: '',
    reason: '',
    rejectReason: '',
    selectedLeave: null,
    showRejectModal: false,
    message: { type: '', text: '' },
    calculatedDays: 0,
    currentUserId: parseInt(localStorage.getItem("userId"), 10) || null
  };

  componentDidMount() {
    this.loadAllData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.teamLeaves.length > 0 &&
      this.state.teamLeaves.length === 0 &&
      this.state.activeTab === 'team') {
      this.setState({ activeTab: 'apply' });
    }
  }

  /* ================= LOAD APIs ================= */
  loadAllData = async () => {
    try {
      this.setState({ loading: true });
      await Promise.all([
        this.loadLeaveTypes(),
        this.loadMyLeaves(),
        this.loadTeamLeaves()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      const backendMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Failed to load data.';
      this.showMessage('error', backendMsg);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadLeaveTypes = async () => {
    try {
      const res = await axios.get('/api/leave-master/all', { withCredentials: true });
      const data = Array.isArray(res.data) ? res.data : [];
      this.setState({ leaveTypes: data.filter(l => l.leaveName !== 'LOP') });
    } catch (error) {
      console.error('Error loading leave types:', error);
    }
  };

  loadMyLeaves = async () => {
    try {
      const res = await axios.get('/api/leave-record/myLeaves', { withCredentials: true });
      this.setState({ myLeaves: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      console.error('Error loading my leaves:', error);
    }
  };

  loadTeamLeaves = async () => {
    try {
      const res = await axios.get('/api/leave-record/teamLeaves', { withCredentials: true });
      const data = Array.isArray(res.data) ? res.data : [];
      this.setState({ teamLeaves: data });
    } catch (error) {
      console.error('Error loading team leaves:', error);
    }
  };

  /* ================= CALCULATE DAYS ================= */
  calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    let start, end;
    if (Array.isArray(startDate) && Array.isArray(endDate)) {
      start = new Date(startDate[0], startDate[1] - 1, startDate[2]);
      end = new Date(endDate[0], endDate[1] - 1, endDate[2]);
    } else if (typeof startDate === 'string' && typeof endDate === 'string') {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      return 0;
    }
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  /* ================= DATE HELPERS ================= */
  formatDate = (dateArray) => {
    if (!dateArray || !Array.isArray(dateArray) || dateArray.length < 3) return '-';
    const [year, month, day] = dateArray;
    if (!year || !month || !day) return '-';
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  convertToDateArray = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  };

  /* ================= APPLY LEAVE ================= */
  applyLeave = async () => {
    const { leaveId, startDate, endDate, reason, leaveTypes } = this.state;

    if (!leaveId || !startDate || !endDate || !reason.trim()) {
      this.showMessage('error', 'Please fill all required fields');
      return;
    }

    if (reason.trim().length > MAX_REASON_CHARS) {
      this.showMessage('error', `Reason must not exceed ${MAX_REASON_CHARS} characters`);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      this.showMessage('error', 'Invalid date format');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      this.showMessage('error', 'Start date cannot be in the past');
      return;
    }

    if (start > end) {
      this.showMessage('error', 'End date must be after start date');
      return;
    }

    const days = this.calculateDays(startDate, endDate);
    const selectedLeaveType = leaveTypes.find(lt => lt.leaveId === leaveId);

    if (selectedLeaveType && days > selectedLeaveType.noOfDays) {
      this.showMessage('error', `Selected leave type allows maximum ${selectedLeaveType.noOfDays} days`);
      return;
    }

    try {
      this.setState({ loading: true });
      const requestData = {
        leaveId,
        startDate: this.convertToDateArray(startDate),
        endDate: this.convertToDateArray(endDate),
        reason: reason.trim()
      };
      await axios.post('/api/leave-record/applyLeave', requestData, { withCredentials: true });
      this.showMessage('success', 'Leave application submitted successfully!');
      this.setState({ leaveId: '', startDate: '', endDate: '', reason: '', calculatedDays: 0 });
      await this.loadMyLeaves();
    } catch (error) {
      console.error('Error applying leave:', error);
      this.showMessage('error', error.response?.data?.message || 'Not enough leave balance available.');
    } finally {
      this.setState({ loading: false });
    }
  };

  /* ================= APPROVE LEAVE ================= */
  approveLeave = async (recId, status, employeeId) => {
    const { currentUserId } = this.state;
    if (Number(employeeId) === Number(currentUserId)) {
      this.showMessage('error', 'You cannot approve your own leave');
      return;
    }
    if (status !== 1) {
      this.showMessage('error', 'Only pending leaves can be approved');
      return;
    }
    if (!window.confirm('Are you sure you want to approve this leave request?')) return;
    try {
      this.setState({ loading: true });
      await axios.put(`/api/leave-record/approve/${recId}`, {}, { withCredentials: true });
      this.showMessage('success', 'Leave approved successfully!');
      await this.loadTeamLeaves();
      await this.loadMyLeaves();
    } catch (error) {
      console.error('Error approving leave:', error);
      this.showMessage('error', error.response?.data?.message || 'Failed to approve leave');
    } finally {
      this.setState({ loading: false });
    }
  };

  /* ================= REJECT LEAVE ================= */
  rejectLeave = async () => {
    const { selectedLeave, rejectReason } = this.state;

    if (!selectedLeave || selectedLeave.status !== 1) {
      this.showMessage('error', 'Only pending leaves can be rejected');
      return;
    }

    const trimmed = rejectReason.trim();

    if (!trimmed) {
      this.showMessage('error', 'Please enter a reason for rejection');
      return;
    }

    if (trimmed.length > MAX_REASON_CHARS) {
      this.showMessage('error', `Rejection reason must not exceed ${MAX_REASON_CHARS} characters`);
      return;
    }

    try {
      await axios.put(
        `/api/leave-record/reject/${selectedLeave.recId}`,
        { reason: trimmed },
        { withCredentials: true }
      );
      this.showMessage('success', 'Leave rejected successfully!');
      this.setState({ rejectReason: '', showRejectModal: false, selectedLeave: null });
      await this.loadTeamLeaves();
      await this.loadMyLeaves();
    } catch (error) {
      console.error('Error rejecting leave:', error);
      this.showMessage('error', error.response?.data?.message || 'Failed to reject leave');
    }
  };

  /* ================= HELPER METHODS ================= */
  showMessage = (type, text) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({ message: { type, text } });
    setTimeout(() => this.setState({ message: { type: '', text: '' } }), 5000);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    // Enforce max length on reason field at input level
    if (name === 'reason' && value.length > MAX_REASON_CHARS) return;
    this.setState({ [name]: value }, () => {
      if (name === 'startDate' || name === 'endDate') {
        const { startDate, endDate } = this.state;
        if (startDate && endDate) {
          this.setState({ calculatedDays: this.calculateDays(startDate, endDate) });
        } else {
          this.setState({ calculatedDays: 0 });
        }
      }
    });
  };

  handleRejectReasonChange = (e) => {
    const value = e.target.value;
    if (value.length > MAX_REASON_CHARS) return;
    this.setState({ rejectReason: value });
  };

  statusText = (status) => {
    const statusMap = {
      1: { text: 'PENDING',  className: 'status-pending'  },
      2: { text: 'APPROVED', className: 'status-approved' },
      3: { text: 'REJECTED', className: 'status-rejected' }
    };
    return statusMap[status] || { text: 'UNKNOWN', className: '' };
  };

  openRejectModal = (leave) => {
    this.setState({ selectedLeave: leave, rejectReason: '', showRejectModal: true });
  };

  /* ================= CHAR COUNTER HELPER ================= */
  renderCharCounter = (current, max) => {
    const remaining = max - current;
    const isNearLimit = remaining <= 20;
    const isAtLimit   = remaining === 0;
    return (
      <span className={`char-counter ${isAtLimit ? 'char-counter--full' : isNearLimit ? 'char-counter--warn' : ''}`}>
        {current}/{max}
      </span>
    );
  };

  /* ================= RENDER: HEADER ================= */
  renderHeader = () => (
    <div className="leave-header">
      <div className="header-content">
        <h1 className="page-title">Leave Management</h1>
        <p className="page-subtitle">Manage your leave applications and approvals</p>
      </div>
    </div>
  );

  /* ================= RENDER: TABS ================= */
  renderTabs = () => {
    const { activeTab, teamLeaves } = this.state;
    return (
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'apply' ? 'active' : ''}`}
          onClick={() => this.setState({ activeTab: 'apply' })}
        >
          <span className="tab-icon">+</span>
          Apply Leave
        </button>
        <button
          className={`tab-btn ${activeTab === 'my' ? 'active' : ''}`}
          onClick={() => this.setState({ activeTab: 'my' })}
        >
          <span className="tab-icon">📋</span>
          My Leaves
        </button>
        {teamLeaves.length > 0 && (
          <button
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'team' })}
          >
            <span className="tab-icon">👥</span>
            Team Leaves
          </button>
        )}
      </div>
    );
  };

  /* ================= RENDER: MESSAGE ================= */
  renderMessage = () => {
    const { message } = this.state;
    if (!message.text) return null;
    return (
      <div className={`message-container ${message.type}`}>
        <div className="message-content">
          <span className="message-icon">{message.type === 'success' ? '✓' : '!'}</span>
          {message.text}
        </div>
      </div>
    );
  };

  /* ================= RENDER: APPLY LEAVE ================= */
  renderApplyLeave = () => {
    const { leaveId, startDate, endDate, reason, leaveTypes, loading, calculatedDays } = this.state;
    const selectedLeaveType = leaveTypes.find(lt => lt.leaveId === leaveId);
    const maxDays      = selectedLeaveType?.noOfDays || 0;
    const exceedsLimit = calculatedDays > maxDays && maxDays > 0;
    const reasonLen    = reason.length;
    const reasonOver   = reasonLen > MAX_REASON_CHARS;

    return (
      <div className="section-container">
        <div className="section-header">
          <h2>Apply for Leave</h2>
          <p className="section-subtitle">Submit a new leave request with required details</p>
        </div>

        <div className="form-container">
          {/* Leave Type */}
          <div className="form-group">
            <label className="form-label">
              Leave Type <span className="required">*</span>
            </label>
            <select
              name="leaveId"
              value={leaveId}
              onChange={this.handleChange}
              className="form-select"
              disabled={loading}
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map(l => (
                <option key={l.leaveId} value={l.leaveId}>
                  {l.leaveName} (Max: {l.noOfDays} days)
                </option>
              ))}
            </select>
          </div>

          {/* Dates + Days */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Start Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={this.handleChange}
                className="form-input"
                disabled={loading}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                End Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={this.handleChange}
                className="form-input"
                disabled={loading}
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Total Days</label>
              <div className={`days-display ${exceedsLimit ? 'days-display-warning' : ''}`}>
                <span className="days-count">{calculatedDays}</span>
                <span className="days-text">
                  day{calculatedDays !== 1 ? 's' : ''}
                  {exceedsLimit && (
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--danger)', marginTop: '4px', fontWeight: '600' }}>
                      Exceeds by {calculatedDays - maxDays}d
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label">
                Reason <span className="required">*</span>
              </label>
              {this.renderCharCounter(reasonLen, MAX_REASON_CHARS)}
            </div>
            <textarea
              name="reason"
              value={reason}
              onChange={this.handleChange}
              className={`form-textarea ${reasonOver ? 'input-error' : ''}`}
              placeholder="Briefly describe your reason (max 100 characters)..."
              rows="3"
              disabled={loading}
              maxLength={MAX_REASON_CHARS}
            />
            {reasonOver && (
              <span className="field-error">Reason cannot exceed {MAX_REASON_CHARS} characters.</span>
            )}
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              className="btn btn-secondary"
              onClick={() => this.setState({ leaveId: '', startDate: '', endDate: '', reason: '', calculatedDays: 0 })}
              disabled={loading}
            >
              Clear Form
            </button>
            <button
              className="btn btn-primary"
              onClick={this.applyLeave}
              disabled={loading || exceedsLimit || reasonOver || !reason.trim()}
            >
              {loading ? 'Submitting…' : 'Apply Leave'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ================= RENDER: MY LEAVES ================= */
  renderMyLeaves = () => {
    const { myLeaves } = this.state;
    const sortedMyLeaves = [...myLeaves].sort((a, b) => b.recId - a.recId);

    return (
      <div className="section-container">
        <div className="section-header">
          <div>
            <h2>My Leave History</h2>
            <p className="section-subtitle">Track your leave applications and status</p>
          </div>
        </div>

        {sortedMyLeaves.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Leave Applications</h3>
            <p>You haven't applied for any leaves yet</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Duration</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedMyLeaves.map(leave => {
                  const status = this.statusText(leave.status);
                  const days = this.calculateDays(leave.startDate, leave.endDate);
                  return (
                    <tr key={leave.recId}>
                      <td>{this.formatDate(leave.startDate)}</td>
                      <td>{this.formatDate(leave.endDate)}</td>
                      <td className="text-center1">{days} {days === 1 ? 'day' : 'days'}</td>
                      <td className="reason-cell">{leave.reason || '-'}</td>
                      <td>
                        <span className={`status-badge ${status.className}`}>{status.text}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  /* ================= RENDER: TEAM LEAVES ================= */
  renderTeamLeaves = () => {
    const { teamLeaves, loading, rejectReason, showRejectModal, selectedLeave, currentUserId } = this.state;
    const sortedTeamLeaves = [...teamLeaves].sort((a, b) => b.recId - a.recId);
    const rejectLen  = rejectReason.length;
    const rejectOver = rejectLen > MAX_REASON_CHARS;

    return (
      <div className="section-container">
        <div className="section-header">
          <div>
            <h2>Team Leave Requests</h2>
            <p className="section-subtitle">Review and manage leave requests from your team</p>
          </div>
          <div className="section-actions">
            <button className="btn-refresh-small" onClick={this.loadTeamLeaves} disabled={loading}>
              ↻ Refresh
            </button>
          </div>
        </div>

        {sortedTeamLeaves.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No Team Requests</h3>
            <p>There are no leave requests from your team</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Duration</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTeamLeaves.map(leave => {
                  const status   = leave.status ? this.statusText(leave.status) : { text: 'UNKNOWN', className: '' };
                  const days     = leave.startDate && leave.endDate ? this.calculateDays(leave.startDate, leave.endDate) : 0;
                  const fromDate = this.formatDate(leave.startDate);
                  const toDate   = this.formatDate(leave.endDate);

                  return (
                    <tr key={leave.recId}>
                      <td>
                        <div className="employee-info">
                          <div className="employee-avatar">
                            {leave.employeeName?.charAt(0) || '?'}
                          </div>
                          <div className="employee-details">
                            <div className="employee-name">{leave.employeeName || 'Unknown'}</div>
                          </div>
                        </div>
                      </td>
                      <td>{fromDate}</td>
                      <td>{toDate}</td>
                      <td className="text-center">
                        {days > 0 ? `${days} ${days === 1 ? 'day' : 'days'}` : '-'}
                      </td>
                      <td className="reason-cell">{leave.reason || leave.remarks || '-'}</td>
                      <td>
                        <span className={`status-badge ${status.className}`}>{status.text}</span>
                      </td>
                      <td>
                        {leave.status === 1 ? (
                          <div className="action-buttons">
                            {Number(leave.employeeId) !== Number(currentUserId) && (
                              <button
                                className="btn-action approve"
                                onClick={() => this.approveLeave(leave.recId, leave.status, leave.employeeId)}
                                disabled={loading}
                              >
                                ✓ Approve
                              </button>
                            )}
                            <button
                              className="btn-action reject"
                              onClick={() => this.openRejectModal(leave)}
                              disabled={loading}
                            >
                              ✕ Reject
                            </button>
                          </div>
                        ) : (
                          <span className={`action-status ${status.className}`}>
                            {leave.status === 2 ? '✓ Approved' : leave.status === 3 ? '✕ Rejected' : '-'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== REJECT MODAL ===== */}
        {showRejectModal && selectedLeave && (
          <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') this.setState({ showRejectModal: false }); }}>
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-header-info">
                  <span className="modal-reject-icon">✕</span>
                  <h3>Reject Leave Request</h3>
                </div>
                <button className="modal-close" onClick={() => this.setState({ showRejectModal: false })}>×</button>
              </div>

              <div className="modal-body">
                <div className="leave-details">
                  <div className="detail-row">
                    <span className="detail-label">Employee</span>
                    <span className="detail-value">{selectedLeave.employeeName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Dates</span>
                    <span className="detail-value">
                      {this.formatDate(selectedLeave.startDate)} → {this.formatDate(selectedLeave.endDate)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">
                      {this.calculateDays(selectedLeave.startDate, selectedLeave.endDate)} days
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Leave Reason</span>
                    <span className="detail-value reason-text">{selectedLeave.reason || selectedLeave.remarks || '-'}</span>
                  </div>
                </div>

                {/* Rejection reason field */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <div className="form-label-row">
                    <label className="form-label">
                      Reason for Rejection <span className="required">*</span>
                    </label>
                    {this.renderCharCounter(rejectLen, MAX_REASON_CHARS)}
                  </div>
                  <textarea
                    value={rejectReason}
                    onChange={this.handleRejectReasonChange}
                    className={`form-textarea ${rejectOver ? 'input-error' : ''}`}
                    placeholder="State a clear reason for rejecting this request (max 100 chars)..."
                    rows="3"
                    autoFocus
                    maxLength={MAX_REASON_CHARS}
                  />
                  {rejectOver && (
                    <span className="field-error">Reason cannot exceed {MAX_REASON_CHARS} characters.</span>
                  )}
                  {!rejectReason.trim() && (
                    <span className="field-hint">A rejection reason is mandatory.</span>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => this.setState({ showRejectModal: false })}>
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.rejectLeave}
                  disabled={!rejectReason.trim() || rejectOver}
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ================= MAIN RENDER ================= */
  render() {
    const { loading, activeTab } = this.state;

    return (
      <div className="leave-management-container">
        {this.renderHeader()}
        {this.renderMessage()}
        {this.renderTabs()}

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Loading…</p>
          </div>
        )}

        <div className="content-wrapper">
          {activeTab === 'apply' && this.renderApplyLeave()}
          {activeTab === 'my'    && this.renderMyLeaves()}
          {activeTab === 'team'  && this.renderTeamLeaves()}
        </div>
      </div>
    );
  }
}
