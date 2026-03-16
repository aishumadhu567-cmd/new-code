// import React, { Component } from "react";
// import { Navigate } from "react-router-dom";
// import { 
//   FiHome, FiCalendar, 
//   FiLogOut, FiSettings, FiMenu, FiX, FiEye, FiEyeOff,
//   FiUsers, FiClock, FiLock
// } from "react-icons/fi";
// import EmpProfile from "./EmpProfile";
// import EmpSalary from "./EmpSalary";
// import EmployeeHolidayCalendar from "./EmployeeHolidayCalendar";
// import ReportingManager from "./ReportingManager";
// import EmpLeaveManagement from "./EmpLeaveManagement";
// import { FaRupeeSign } from "react-icons/fa";
// import "./EmpDashboard.css";

// export default class EmpDashboard extends Component {
//   state = {
//     activePage: "dashboard",
//     showChangePassword: false,
//     sidebarOpen: true,

//     showNewPassword: false,
//     showConfirmPassword: false,

//     password: "",
//     confirmPassword: "",
//     newPasswordError: "",
//     confirmPasswordError: "",
//     message: "",
//     logout: false,
//     leaveBalance: [], // Store leave balance data
//     myLeaves: [], // Preserve recent leave applications
//     errorMessage: "",
//   };

//   componentDidMount() {
//     this.fetchLeaveBalance();
//     this.fetchLeaveHistory();
//   }

//   fetchLeaveBalance = async () => {
//     try {
//       const response = await fetch('/api/leave-status/my-balance', {
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           this.setState({ errorMessage: 'Your session has expired. Please log in again.' });
//           return;
//         }
//         console.error('Failed to fetch leave balance:', response.status, response.statusText);
//         return;
//       }

//       const data = await response.json();
//       this.setState({ leaveBalance: data, errorMessage: '' });
//     } catch (error) {
//       console.error('Error fetching leave balance:', error);
//       this.setState({ errorMessage: 'Unable to load leave balance. Please try again later.' });
//     }
//   };

//   fetchLeaveHistory = async () => {
//     try {
//       const response = await fetch('/api/leave-record/myLeaves', {
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           this.setState({ errorMessage: 'Your session has expired. Please log in again.' });
//           return;
//         }
//         console.error('Failed to fetch leave history:', response.status, response.statusText);
//         return;
//       }

//       const data = await response.json();
//       this.setState({ myLeaves: Array.isArray(data) ? data : [], errorMessage: '' });
//     } catch (error) {
//       console.error('Error fetching leave history:', error);
//     }
//   };

//   passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   statusText = (status) => {
//     const statusMap = {
//       1: { text: 'PENDING', className: 'status-pending' },
//       2: { text: 'APPROVED', className: 'status-approved' },
//       3: { text: 'REJECTED', className: 'status-rejected' }
//     };
//     return statusMap[status] || { text: '-', className: '' };
//   };

//   formatDate = (date) => {
//     if (!date) return '-';

//     let parsedDate;
//     if (Array.isArray(date) && date.length >= 3) {
//       parsedDate = new Date(date[0], date[1] - 1, date[2]);
//     } else {
//       parsedDate = new Date(date);
//     }

//     if (isNaN(parsedDate.getTime())) return '-';

//     return parsedDate.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   toggleMenu = () => {
//     this.setState({ showMenu: !this.state.showMenu });
//   };

//   toggleSidebar = () => {
//     this.setState({ sidebarOpen: !this.state.sidebarOpen });
//   };

//   handleNavigation = (page) => {
//     if (page === "changePassword") {
//       this.setState({ activePage: page, showChangePassword: true, showMenu: false, sidebarOpen: false });
//       return;
//     }

//     this.setState({ activePage: page, sidebarOpen: false });
//   };

//   logout = () => {
//     fetch('/api/logout', {
//       method: 'POST',
//       credentials: 'include',
//     })
//       .then(() => this.setState({ logout: true }))
//       .catch(() => this.setState({ logout: true }));
//   };

//   submitPassword = () => {
//     const { password, confirmPassword } = this.state;

//     // Reset errors on each submit attempt
//     this.setState({ newPasswordError: "", confirmPasswordError: "", message: "" });

//     if (!password) {
//       this.setState({ newPasswordError: "New password is required" });
//       return;
//     }

//     if (!this.passwordRegex.test(password)) {
//       this.setState({ newPasswordError: "Password must be 8+ chars with uppercase, lowercase, number & special character" });
//       return;
//     }

//     if (!confirmPassword) {
//       this.setState({ confirmPasswordError: "Confirm password is required" });
//       return;
//     }

//     if (password !== confirmPassword) {
//       this.setState({ confirmPasswordError: "Passwords do not match" });
//       return;
//     }

//     fetch("/api/password", {
//       method: "PUT",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ password }),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error();
//         return res.text();
//       })
//       .then(() => {
//         alert("Password updated successfully!");
//         this.setState({
//           message: "✓ Password changed successfully",
//           showChangePassword: false,
//           password: "",
//           confirmPassword: "",
//           newPasswordError: "",
//           confirmPasswordError: "",
//         });
//       })
//       .catch(() =>
//         this.setState({ message: "✗ Failed to update password" })
//       );
//   };

//   renderContent() {
//     switch (this.state.activePage) {
//       case "salary":
//         return <EmpSalary />;
//       case "empleavemanagement":
//         return <EmpLeaveManagement />;
//       case "EmployeeHolidayCalendar":
//         return <EmployeeHolidayCalendar />;
//       case "reportingmanager":
//         return <ReportingManager />;
//       default:
//         return this.renderDashboardHome();
//     }
//   }

//   renderDashboardHome() {
//     const { leaveBalance, myLeaves, errorMessage } = this.state;

//     // Filter out LOP (Leave Without Pay) from display
//     const visibleLeaves = leaveBalance.filter(leave => leave.leaveName !== 'LOP');

//     const sortedLeaves = [...myLeaves].sort((a, b) => b.recId - a.recId);

//     return (
//       <div className="dashboard-home">
//         <div className="welcome-card">
//           <h2>Welcome Back!</h2>
//           <p>Here's your dashboard overview</p>
//         </div>

//         {errorMessage && (
//           <div className="dashboard-error">
//             <p>{errorMessage}</p>
//           </div>
//         )}

//         {/* Leave Balance Cards */}
//         <div className="stats-grid">
//           {visibleLeaves.map((leave) => (
//             <div key={leave.leaveId} className="stat-card">
//               <div className="stat-header">
//                 <h3>{leave.leaveName}</h3>
//                 <div className="leave-progress">
//                   <div 
//                     className="progress-bar"
//                     style={{
//                       width: `${(leave.availedDays / leave.totalLeave) * 100}%`,
//                       backgroundColor: leave.leaveName === 'SL' ? '#ff6b6b' : '#4ecdc4'
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="stat-numbers">
//                 <div className="stat-item">
//                   <span className="stat-label">Total</span>
//                   <span className="stat-value">{leave.totalLeave}</span>
//                 </div>
//                 <div className="stat-item">
//                   <span className="stat-label">Used</span>
//                   <span className="stat-value">{leave.availedDays}</span>
//                 </div>
//                 <div className="stat-item">
//                   <span className="stat-label">Balance</span>
//                   <span className="stat-value highlight">{leave.remainingDays}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="quick-actions">
//           <h3>Quick Actions</h3>
//           <div className="actions-grid">
//             <button 
//               className="action-btn"
//               onClick={() => this.handleNavigation("empleavemanagement")}
//             >
//               <FiClock size={24} />
//               <span>Apply Leave</span>
//             </button>
//             <button 
//               className="action-btn"
//               onClick={() => this.handleNavigation("salary")}
//             >
//               <FaRupeeSign size={24} />
//               <span>View Payslip</span>
//             </button>
//             <button 
//               className="action-btn"
//               onClick={() => this.handleNavigation("EmployeeHolidayCalendar")}
//             >
//               <FiCalendar size={24} />
//               <span>Holiday Calendar</span>
//             </button>
//             <button 
//               className="action-btn"
//               onClick={() => this.handleNavigation("reportingmanager")}
//             >
//               <FiUsers size={24} />
//               <span>Reporting Manager</span>
//             </button>
//           </div>
//         </div>

//         {/* Recent Leave Applications */}
       
//       </div>
//     );
//   }

//   render() {
//     if (this.state.logout) return <Navigate to="/" replace />;

//     const menuItems = [
      
//       { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
//       // {key: "profile", label: "My Profile", icon: <FiUsers /> },
//       { key: "salary", label: "Salary", icon: <FaRupeeSign /> },
//       { key: "empleavemanagement", label: "Leave Management", icon: <FiClock /> },
//       { key: "EmployeeHolidayCalendar", label: "Holiday Calendar", icon: <FiCalendar /> },
//       { key: "reportingmanager", label: "Reporting Manager", icon: <FiUsers /> },
//     ];

//     return (
//       <div className="emp-dashboard">
//         {/* HEADER */}
//         <header className="emp-header">
//           <div className="header-left">
//             {/* <button className="menu-toggle" onClick={this.toggleSidebar}>
//               {this.state.sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button> */}
//             <h3>HRMS PORTAL</h3>
//           </div>

//           <div className="header-profile-section">
//             <button
//               className="btn-update-password"
//               onClick={() =>
//                 this.setState({
//                   showChangePassword: true,
//                   showMenu: false,
//                   message: "",
//                   newPasswordError: "",
//                   confirmPasswordError: "",
//                 })
//               }
//             >
//               <FiLock size={18} />
//               <span>Update Password</span>
//             </button>

//             <button className="emp-logout-btn" onClick={this.logout}>
//               <FiLogOut />
//               <span className="logout-text">Logout</span>
//             </button>
//           </div>
//         </header>

//         {/* SIDEBAR OVERLAY */}
//         {this.state.sidebarOpen && (
//           <div 
//             className="sidebar-overlay"
//             onClick={() => this.setState({ sidebarOpen: false })}
//           />
//         )}

//         {/* BODY */}
//         <div className="emp-body">
//           <aside
//             className={`emp-sidebar ${
//               this.state.sidebarOpen ? "open" : ""
//             }`}
//           >
//             {/* <div className="sidebar-header">
//               <h4>Navigation</h4>
//             </div> */}
//             {menuItems.map(({ key, label, icon }) => (
//               <div
//                 key={key}
//                 className={`emp-side-item ${
//                   this.state.activePage === key ? "active" : ""
//                 }`}
//                 onClick={() => this.handleNavigation(key)}
//               >
//                 <span className="item-icon">{icon}</span>
//                 <span className="item-label">{label}</span>
//               </div>
//             ))}
//           </aside>

//           <main className="emp-content">{this.renderContent()}</main>
//         </div>

//         {/* FOOTER */}
//         <footer className="emp-footer">
//           <span>© 2026 VentureBiz - HR Management System</span>
//         </footer>

//         {/* CHANGE PASSWORD MODAL */}
//         {this.state.showChangePassword && (
//           <div className="emp-modal-overlay">
//             <div className="emp-modal-box">
//               <div className="modal-header">
//                 <h4 style={{ color: '#fff' }}>Change Password</h4>
//                 <button 
//                   className="close-modal"
//                   onClick={() =>
//                     this.setState({
//                       showChangePassword: false,
//                       password: "",
//                       confirmPassword: "",
//                       message: "",
//                       newPasswordError: "",
//                       confirmPasswordError: "",
//                     })
//                   }
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="modal-body">
//                 <div className="password-field">
//                   <label>New Password</label>
                  
//                   <div className="input-with-icon">
//                     <input
//                       type={this.state.showNewPassword ? "text" : "password"}
//                       placeholder="Enter the new Password"
//                       value={this.state.password}
//                       maxLength={20}
//                       onChange={(e) =>
//                         this.setState({ password: e.target.value, newPasswordError: "", message: "" })
//                       }
//                     />
//                     <button
//                       className="toggle-visibility"
//                       onClick={() =>
//                         this.setState({
//                           showNewPassword: !this.state.showNewPassword,
//                         })
//                       }
//                     >
//                       {this.state.showNewPassword ? <FiEyeOff /> : <FiEye />}
//                     </button>
                   
//                   </div>
//                   {this.state.newPasswordError && (
//                     <div className="field-error">{this.state.newPasswordError}</div>
//                   )}
//                 </div>
//                 <div className="password-field">
//                   <label>Confirm Password</label>
//                   <div className="input-with-icon">
//                     <input
//                       type={this.state.showConfirmPassword ? "text" : "password"}
//                       placeholder="Confirm new password"
//                       value={this.state.confirmPassword}
//                       maxLength={20}
//                       onChange={(e) =>
//                         this.setState({ confirmPassword: e.target.value, confirmPasswordError: "", message: "" })
//                       }
//                     />
//                     <button
                    
//                       className="toggle-visibility"
//                       onClick={() =>
//                         this.setState({
//                           showConfirmPassword: !this.state.showConfirmPassword,
//                         })
//                       }
//                     >
//                       {this.state.showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//                     </button>
//                   </div>
//                   {this.state.confirmPasswordError && (
//                     <div className="field-error">{this.state.confirmPasswordError}</div>
//                   )}
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button 
//                   className="btn-primary"
//                   onClick={this.submitPassword}
//                 >
//                   Update Password
//                 </button>
//                 <button
//                   className="btn-secondary"
//                   onClick={() =>
//                     this.setState({
//                       showChangePassword: false,
//                       password: "",
//                       confirmPassword: "",
//                       message: "",
//                       newPasswordError: "",
//                       confirmPasswordError: "",
//                     })
//                   }
//                 >
//                   Cancel
//                 </button>
//               </div>

//               {this.state.message && (
//                 <p className={`message-text ${
//                   this.state.message.includes("✓") ? "success" : "error"
//                 }`}>
//                   {this.state.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { 
  FiHome, FiCalendar, 
  FiLogOut, FiSettings, FiMenu, FiX, FiEye, FiEyeOff,
  FiUsers, FiClock, FiLock, FiUser // Added FiUser import
} from "react-icons/fi";
import EmpProfile from "./EmpProfile";
import EmpSalary from "./EmpSalary";
import EmployeeHolidayCalendar from "./EmployeeHolidayCalendar";
import ReportingManager from "./ReportingManager";
import EmpLeaveManagement from "./EmpLeaveManagement";
import { FaRupeeSign } from "react-icons/fa";
import "./EmpDashboard.css";

export default class EmpDashboard extends Component {
  state = {
    activePage: "dashboard",
    showChangePassword: false,
    sidebarOpen: true,

    showNewPassword: false,
    showConfirmPassword: false,

    password: "",
    confirmPassword: "",
    newPasswordError: "",
    confirmPasswordError: "",
    message: "",
    logout: false,
    leaveBalance: [], // Store leave balance data
    myLeaves: [], // Preserve recent leave applications
    errorMessage: "",
  };

  componentDidMount() {
    this.fetchLeaveBalance();
    this.fetchLeaveHistory();
  }

  fetchLeaveBalance = async () => {
    try {
      const response = await fetch('/api/leave-status/my-balance', {
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.setState({ errorMessage: 'Your session has expired. Please log in again.' });
          return;
        }
        console.error('Failed to fetch leave balance:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      this.setState({ leaveBalance: data, errorMessage: '' });
    } catch (error) {
      console.error('Error fetching leave balance:', error);
      this.setState({ errorMessage: 'Unable to load leave balance. Please try again later.' });
    }
  };

  fetchLeaveHistory = async () => {
    try {
      const response = await fetch('/api/leave-record/myLeaves', {
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.setState({ errorMessage: 'Your session has expired. Please log in again.' });
          return;
        }
        console.error('Failed to fetch leave history:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      this.setState({ myLeaves: Array.isArray(data) ? data : [], errorMessage: '' });
    } catch (error) {
      console.error('Error fetching leave history:', error);
    }
  };

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  statusText = (status) => {
    const statusMap = {
      1: { text: 'PENDING', className: 'status-pending' },
      2: { text: 'APPROVED', className: 'status-approved' },
      3: { text: 'REJECTED', className: 'status-rejected' }
    };
    return statusMap[status] || { text: '-', className: '' };
  };

  formatDate = (date) => {
    if (!date) return '-';

    let parsedDate;
    if (Array.isArray(date) && date.length >= 3) {
      parsedDate = new Date(date[0], date[1] - 1, date[2]);
    } else {
      parsedDate = new Date(date);
    }

    if (isNaN(parsedDate.getTime())) return '-';

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  handleNavigation = (page) => {
    if (page === "changePassword") {
      this.setState({ activePage: page, showChangePassword: true, showMenu: false, sidebarOpen: false });
      return;
    }

    this.setState({ activePage: page, sidebarOpen: false });
  };

  logout = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => this.setState({ logout: true }))
      .catch(() => this.setState({ logout: true }));
  };

  submitPassword = () => {
    const { password, confirmPassword } = this.state;

    // Reset errors on each submit attempt
    this.setState({ newPasswordError: "", confirmPasswordError: "", message: "" });

    if (!password) {
      this.setState({ newPasswordError: "New password is required" });
      return;
    }

    if (!this.passwordRegex.test(password)) {
      this.setState({ newPasswordError: "Password must be 8+ chars with uppercase, lowercase, number & special character" });
      return;
    }

    if (!confirmPassword) {
      this.setState({ confirmPasswordError: "Confirm password is required" });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ confirmPasswordError: "Passwords do not match" });
      return;
    }

    fetch("/api/password", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then(() => {
        alert("Password updated successfully!");
        this.setState({
          message: "✓ Password changed successfully",
          showChangePassword: false,
          password: "",
          confirmPassword: "",
          newPasswordError: "",
          confirmPasswordError: "",
        });
      })
      .catch(() =>
        this.setState({ message: "✗ Failed to update password" })
      );
  };

  renderContent() {
    switch (this.state.activePage) {
      case "profile": // Added profile case
        return <EmpProfile />;
      case "salary":
        return <EmpSalary />;
      case "empleavemanagement":
        return <EmpLeaveManagement />;
      case "EmployeeHolidayCalendar":
        return <EmployeeHolidayCalendar />;
      case "reportingmanager":
        return <ReportingManager />;
      default:
        return this.renderDashboardHome();
    }
  }

  renderDashboardHome() {
    const { leaveBalance, myLeaves, errorMessage } = this.state;

    // Filter out LOP (Leave Without Pay) from display
    const visibleLeaves = leaveBalance.filter(leave => leave.leaveName !== 'LOP');

    const sortedLeaves = [...myLeaves].sort((a, b) => b.recId - a.recId);

    return (
      <div className="dashboard-home">
        <div className="welcome-card">
          <h2>Welcome Back!</h2>
          <p>Here's your dashboard overview</p>
        </div>

        {errorMessage && (
          <div className="dashboard-error">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Leave Balance Cards */}
        <div className="stats-grid">
          {visibleLeaves.map((leave) => (
            <div key={leave.leaveId} className="stat-card">
              <div className="stat-header">
                <h3>{leave.leaveName}</h3>
                <div className="leave-progress">
                  <div 
                    className="progress-bar"
                    style={{
                      width: `${(leave.availedDays / leave.totalLeave) * 100}%`,
                      backgroundColor: leave.leaveName === 'SL' ? '#ff6b6b' : '#4ecdc4'
                    }}
                  />
                </div>
              </div>
              <div className="stat-numbers">
                <div className="stat-item">
                  <span className="stat-label">Total</span>
                  <span className="stat-value">{leave.totalLeave}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Used</span>
                  <span className="stat-value">{leave.availedDays}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Balance</span>
                  <span className="stat-value highlight">{leave.remainingDays}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button 
              className="action-btn"
              onClick={() => this.handleNavigation("profile")}
            >
              <FiUser size={24} />
              <span>My Profile</span>
            </button>
            <button 
              className="action-btn"
              onClick={() => this.handleNavigation("empleavemanagement")}
            >
              <FiClock size={24} />
              <span>Apply Leave</span>
            </button>
            <button 
              className="action-btn"
              onClick={() => this.handleNavigation("salary")}
            >
              <FaRupeeSign size={24} />
              <span>View Payslip</span>
            </button>
            <button 
              className="action-btn"
              onClick={() => this.handleNavigation("EmployeeHolidayCalendar")}
            >
              <FiCalendar size={24} />
              <span>Holiday Calendar</span>
            </button>
            <button 
              className="action-btn"
              onClick={() => this.handleNavigation("reportingmanager")}
            >
              <FiUsers size={24} />
              <span>Reporting Manager</span>
            </button>
          </div>
        </div>

        {/* Recent Leave Applications */}
       
      </div>
    );
  }

  render() {
    if (this.state.logout) return <Navigate to="/" replace />;

    const menuItems = [
      { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
      { key: "profile", label: "My Profile", icon: <FiUser /> }, // Added profile back with FiUser icon
      { key: "salary", label: "Salary", icon: <FaRupeeSign /> },
      { key: "empleavemanagement", label: "Leave Management", icon: <FiClock /> },
      { key: "EmployeeHolidayCalendar", label: "Holiday Calendar", icon: <FiCalendar /> },
      { key: "reportingmanager", label: "Reporting Manager", icon: <FiUsers /> },
    ];

    return (
      <div className="emp-dashboard">
        {/* HEADER */}
        <header className="emp-header">
          <div className="header-left">
            {/* <button className="menu-toggle" onClick={this.toggleSidebar}>
              {this.state.sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button> */}
            <h3>HRMS PORTAL</h3>
          </div>

          <div className="header-profile-section">
            <button
              className="btn-update-password"
              onClick={() =>
                this.setState({
                  showChangePassword: true,
                  showMenu: false,
                  message: "",
                  newPasswordError: "",
                  confirmPasswordError: "",
                })
              }
            >
              <FiLock size={18} />
              <span>Update Password</span>
            </button>

            <button className="emp-logout-btn" onClick={this.logout}>
              <FiLogOut />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </header>

        {/* SIDEBAR OVERLAY */}
        {this.state.sidebarOpen && (
          <div 
            className="sidebar-overlay"
            onClick={() => this.setState({ sidebarOpen: false })}
          />
        )}

        {/* BODY */}
        <div className="emp-body">
          <aside
            className={`emp-sidebar ${
              this.state.sidebarOpen ? "open" : ""
            }`}
          >
            {/* <div className="sidebar-header">
              <h4>Navigation</h4>
            </div> */}
            {menuItems.map(({ key, label, icon }) => (
              <div
                key={key}
                className={`emp-side-item ${
                  this.state.activePage === key ? "active" : ""
                }`}
                onClick={() => this.handleNavigation(key)}
              >
                <span className="item-icon">{icon}</span>
                <span className="item-label">{label}</span>
              </div>
            ))}
          </aside>

          <main className="emp-content">{this.renderContent()}</main>
        </div>

        {/* FOOTER */}
        <footer className="emp-footer">
          <span>© 2026 VentureBiz - HR Management System</span>
        </footer>

        {/* CHANGE PASSWORD MODAL */}
        {this.state.showChangePassword && (
          <div className="emp-modal-overlay">
            <div className="emp-modal-box">
              <div className="modal-header">
                <h4 style={{ color: '#fff' }}>Change Password</h4>
                <button 
                  className="close-modal"
                  onClick={() =>
                    this.setState({
                      showChangePassword: false,
                      password: "",
                      confirmPassword: "",
                      message: "",
                      newPasswordError: "",
                      confirmPasswordError: "",
                    })
                  }
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="password-field">
                  <label>New Password</label>
                  
                  <div className="input-with-icon">
                    <input
                      type={this.state.showNewPassword ? "text" : "password"}
                      placeholder="Enter the new Password"
                      value={this.state.password}
                      maxLength={20}
                      onChange={(e) =>
                        this.setState({ password: e.target.value, newPasswordError: "", message: "" })
                      }
                    />
                    <button
                      className="toggle-visibility"
                      onClick={() =>
                        this.setState({
                          showNewPassword: !this.state.showNewPassword,
                        })
                      }
                    >
                      {this.state.showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                   
                  </div>
                  {this.state.newPasswordError && (
                    <div className="field-error">{this.state.newPasswordError}</div>
                  )}
                </div>
                <div className="password-field">
                  <label>Confirm Password</label>
                  <div className="input-with-icon">
                    <input
                      type={this.state.showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={this.state.confirmPassword}
                      maxLength={20}
                      onChange={(e) =>
                        this.setState({ confirmPassword: e.target.value, confirmPasswordError: "", message: "" })
                      }
                    />
                    <button
                      className="toggle-visibility"
                      onClick={() =>
                        this.setState({
                          showConfirmPassword: !this.state.showConfirmPassword,
                        })
                      }
                    >
                      {this.state.showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {this.state.confirmPasswordError && (
                    <div className="field-error">{this.state.confirmPasswordError}</div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-primary"
                  onClick={this.submitPassword}
                >
                  Update Password
                </button>
                <button
                  className="btn-secondary"
                  onClick={() =>
                    this.setState({
                      showChangePassword: false,
                      password: "",
                      confirmPassword: "",
                      message: "",
                      newPasswordError: "",
                      confirmPasswordError: "",
                    })
                  }
                >
                  Cancel
                </button>
              </div>

              {this.state.message && (
                <p className={`message-text ${
                  this.state.message.includes("✓") ? "success" : "error"
                }`}>
                  {this.state.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
