import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function EmpMgr() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const detailsRef = useRef(null);

  const fetchEmployeeByUsername = async (searchUsername = username) => {
    const usernameToSearch = searchUsername.trim().toUpperCase();
    if (!usernameToSearch) {
      setError('Please enter a username');
      return;
    }
    if (!/^VPPL\d{3}$/.test(usernameToSearch)) {
      setUsernameError('Username must start with VPPL followed by 3 digits');
      return;
    }
    setLoading(true);
    setError(null);
    setEmployeeData(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/hr/mgr/search-by-username?username=${usernameToSearch}`,
        { withCredentials: true }
      );
      setEmployeeData(response.data);
      setTimeout(() => {
        if (detailsRef.current) {
          detailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employee data');
      setEmployeeData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUsername('');
    setEmployeeData(null);
    setError(null);
  };

  return (
    <div className="dashboard-content">

      {/* ── WELCOME BANNER ── */}
      <div
        className="welcome-banner"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)',
          color: '#ffffff',
          borderRadius: '14px',
          padding: '32px 40px',
          marginBottom: '24px',
          boxShadow: '0 4px 24px rgba(29, 78, 216, 0.2)',
        }}
      >
        <div className="welcome-text">
          <h3
            className="welcome-title"
            style={{
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: '700',
              marginBottom: '6px',
              margin: '0 0 6px 0',
            }}
          >
            Employee Manager Information
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>
            View employee reporting structure and manager details
          </p>
        </div>
      </div>

      {/* ── SEARCH SECTION ── */}
      <div className="search-section">
        <div className="section-header">
          <h3>🔍 Search Employee by Username</h3>
          <p>Enter employee username to view manager information</p>
        </div>

        <div className="search-form">
          <div className="form-row">
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Employee ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  let val = e.target.value.toUpperCase();
                  if (!val.startsWith('VPPL')) val = 'VPPL';
                  const digits = val.slice(4).replace(/\D/g, '').slice(0, 3);
                  val = 'VPPL' + digits;
                  setUsername(val);
                  if (val.length >= 4 && !/^VPPL\d{0,3}$/.test(val)) {
                    setUsernameError('Username must be VPPL followed by 3 digits (e.g. VPPL001)');
                  } else {
                    setUsernameError('');
                  }
                }}
                placeholder="Enter Employee ID (e.g., VPPL027)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') fetchEmployeeByUsername();
                }}
              />
              {usernameError && <div className="alert-message error">{usernameError}</div>}
            </div>
          </div>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => fetchEmployeeByUsername()}
              disabled={loading || !username.trim() || !!usernameError}
            >
              {loading ? 'Searching...' : '🔍 Search Employee'}
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ── ERROR ── */}
      {error && (
        <div className="alert-message error">
          <div className="alert-title">Error:</div>
          <div>{error}</div>
        </div>
      )}

      {/* ── LOADING ── */}
      {loading && (
        <div className="loading-skeleton">
          <div className="spinner">⏳</div>
          <p>Loading employee data...</p>
        </div>
      )}

      {/* ── EMPLOYEE DETAILS ── */}
      {!loading && employeeData && (
        <div className="employee-details-section" ref={detailsRef}>
          <div className="section-header">
            <div>
              <h3>Employee Manager Details</h3>
              <p>{employeeData.employeeName} ({employeeData.employeeUsername})</p>
            </div>
          </div>

          <div className="details-grid">
            {/* Employee Info Card */}
            <div className="detail-card">
              <h4>👤 Employee Information</h4>
              <div className="detail-content">
                <div className="detail-item">
                  <span className="detail-label">Username</span>
                  <span className="detail-value">{employeeData.employeeUsername}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{employeeData.employeeName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{employeeData.employeeDepartment}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Designation</span>
                  <span className="detail-value">{employeeData.employeeDesignation}</span>
                </div>
              </div>
            </div>

            {/* Manager Info Card */}
            <div className="detail-card">
              <h4>👨‍💼 Reporting Manager</h4>
              <div className="detail-content">
                <div className="detail-item">
                  <span className="detail-label">Username</span>
                  <span className="detail-value">
                    <span className="username-badge1">{employeeData.managerUsername}</span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{employeeData.managerName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{employeeData.managerDepartment}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Designation</span>
                  <span className="detail-value">{employeeData.managerDesignation}</span>
                </div>
              </div>
            </div>

            {/* Direct Reports Table */}
            <div className="detail-card full-width">
              <h4>📋 Direct Reports ({employeeData.reportingEmployees?.length || 0})</h4>
              {employeeData.reportingEmployees?.length > 0 ? (
                <>
                  <p className="table-caption">
                    Employees who report directly to {employeeData.employeeName}
                  </p>
                  <div className="table-responsive">
                    <table className="results-table">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Designation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeData.reportingEmployees.map((emp, index) => (
                          <tr key={index}>
                            <td>
                              <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                                {emp.username}
                              </span>
                            </td>
                            <td className="employee-name">{emp.name}</td>
                            <td>{emp.department}</td>
                            <td>{emp.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">👥</div>
                  <h5>No Direct Reports</h5>
                  <p>{employeeData.employeeName} has no employees reporting directly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
