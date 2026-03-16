// import api from "./api";
// import React, { Component } from 'react';
// import { Navigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import Header from './components/Header';
// import './Login.css';

// export default class SetPassword extends Component {
//   // state = {
//   //   oldpassword: '',
//   //   newPassword: '',
//   //   confirmPassword: '',
//   //   showOldPassword: false,
//   //   showNewPassword: false,
//   //   showConfirmPassword: false,
//   //   message: '',
//   //   redirect: false
//   // };
//   state = {
//   oldpassword: '',
//   newPassword: '',
//   confirmPassword: '',
//   showOldPassword: false,
//   showNewPassword: false,
//   showConfirmPassword: false,
//   message: '',
//   redirect: false,

//   // 👇 ADD THIS
//   errors: {}
// };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
  

//   toggleOldPassword = () => {
//   this.setState(prev => ({
//     showOldPassword: !prev.showOldPassword
//   }));
// };

// toggleNewPassword = () => {
//   this.setState(prev => ({
//     showNewPassword: !prev.showNewPassword
//   }));
// };
// handleSubmit = (e) => {
//   e.preventDefault();

//   const { oldpassword, newPassword, confirmPassword } = this.state;
//   let errors = {};

//   if (!oldpassword.trim()) {
//     errors.oldpassword = "Email sent password is required";
//   }

//   const strongPasswordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

//   if (!newPassword) {
//     errors.newPassword = "New password is required";
//   } else if (!strongPasswordRegex.test(newPassword)) {
//     errors.newPassword =
//       "Must be 8+ chars, include uppercase, lowercase, number & special character";
//   }

//   if (!confirmPassword) {
//     errors.confirmPassword = "Please confirm your password";
//   } else if (newPassword !== confirmPassword) {
//     errors.confirmPassword = "Passwords do not match";
//   }

//   if (Object.keys(errors).length > 0) {
//     this.setState({ errors });
//     return;
//   }

//   this.setState({ errors: {} });

//   fetch('/api/set', {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//     body: JSON.stringify({
//       oldpassword,
//       password: newPassword
//     })
//   })
//     .then(res => {
//       if (!res.ok) throw new Error();
//       return res.text();
//     })
//     .then(msg => {
//       sessionStorage.clear();
//       localStorage.clear();
//       this.setState({ message: msg });

//       setTimeout(() => {
//         this.setState({ redirect: true });
//       }, 2000);
//     })
//     .catch(() => {
//       this.setState({ message: 'Password reset failed' });
//     });
// };
//   // handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   // ✅ Validation
//   //   if (this.state.newPassword !== this.state.confirmPassword) {
//   //     this.setState({ message: 'Passwords do not match' });
//   //     return;
//   //   }

//   //   fetch('/api/set', {
//   //     method: 'PUT',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     credentials: 'include',
//   //     body: JSON.stringify({
//   //       oldpassword: this.state.oldpassword, // ✅ REQUIRED
//   //       password: this.state.newPassword     // ✅ REQUIRED
//   //     })
//   //   })
//   //     .then(res => {
//   //       if (!res.ok) throw new Error();
//   //       return res.text();
//   //     })
//   //     .then(msg => {
//   //       // ✅ CLEAR SESSION
//   //       sessionStorage.clear();
//   //       localStorage.clear();

//   //       this.setState({ message: msg });

//   //       setTimeout(() => {
//   //         this.setState({ redirect: true });
//   //       }, 2000);
//   //     })
//   //     .catch(() => {
//   //       this.setState({ message: 'Password reset failed' });
//   //     });
//   // };

//   render() {
//     if (this.state.redirect) {
//       return <Navigate to="/" replace />;
//     }

//     return (
//       <div className="login-page">
//         <Header />

//         <div className="login-main">
//           <div className="login-right">
//             <form className="login-box" onSubmit={this.handleSubmit}>
//               <h2>Set New Password</h2>

//               {/* TEMP PASSWORD */}
//               <label className="login-label">Entire Email sent Password</label>
//               <div className="password-wrapper">
//                 <input
//                   type={this.state.showOldPassword ? 'text' : 'password'}
//                   name="oldpassword"
//                   placeholder="Enter  Email sent Password"
//                   value={this.state.oldpassword}
//                   onChange={this.handleChange}
//                   className="login-input password-input"
//                   required
//                 />
               
//               </div>
//                {this.state.errors.oldpassword && (
//   <p className="error-text">{this.state.errors.oldpassword}</p>
// )}

//               {/* NEW PASSWORD */}
//               <label className="login-label">New Password</label>
//               <div className="password-wrapper">
//                 <input
//                   type={this.state.showNewPassword ? 'text' : 'password'}
//                   name="newPassword"
//                   placeholder="Enter New Password"
//                   value={this.state.newPassword}
//                   onChange={this.handleChange}
//                   className="login-input password-input"
//                   required
//                 />
             
//               </div>
//                  {this.state.errors.newPassword && (
//   <p className="error-text">{this.state.errors.newPassword}</p>
// )}

//               {/* CONFIRM PASSWORD */}
//               <label className="login-label">Confirm Password</label>
//               <div className="password-wrapper">
//                 <input
//                   type={this.state.showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   placeholder="Confirm New Password"
//                   value={this.state.confirmPassword}
//                   onChange={this.handleChange}
//                   className="login-input password-input"
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={this.toggleConfirmPassword}
//                 >
//                   {this.state.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
              
//               </div>
//   {this.state.errors.confirmPassword && (
//   <p className="error-text">{this.state.errors.confirmPassword}</p>
// )}
//               <button className="login-button">
//                 Update Password
//               </button>

//               {this.state.message && (
//                 <p
//                   style={{
//                     marginTop: '12px',
//                     color: this.state.message.toLowerCase().includes('success')
//                       ? 'green'
//                       : 'red'
//                   }}
//                 >
//                   {this.state.message}
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>

//         <footer className="login-footer">
//           © 2026 Venturebiz Promotions Private Limited
//         </footer>
//       </div>
//     );
//   }
// }
import api from "./api";
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from './components/Header';
import './Login.css';

export default class SetPassword extends Component {
  state = {
    oldpassword: '',
    newPassword: '',
    confirmPassword: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
    message: '',
    redirect: false,
    errors: {}
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleOldPassword = () => {
    this.setState(prev => ({
      showOldPassword: !prev.showOldPassword
    }));
  };

  toggleNewPassword = () => {
    this.setState(prev => ({
      showNewPassword: !prev.showNewPassword
    }));
  };

  toggleConfirmPassword = () => {
    this.setState(prev => ({
      showConfirmPassword: !prev.showConfirmPassword
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { oldpassword, newPassword, confirmPassword } = this.state;
    let errors = {};

    if (!oldpassword.trim()) {
      errors.oldpassword = "Email sent password is required";
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (!strongPasswordRegex.test(newPassword)) {
      errors.newPassword =
        "Must be 8+ chars, include uppercase, lowercase, number & special character";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ errors: {} });

    fetch('/api/set', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        oldpassword,
        password: newPassword
      })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then(msg => {
        sessionStorage.clear();
        localStorage.clear();
        this.setState({ message: msg });

        setTimeout(() => {
          this.setState({ redirect: true });
        }, 2000);
      })
      .catch(() => {
        this.setState({ message: 'Password reset failed' });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="login-page">
        <Header />

        <div className="login-main">
          <div className="login-right">
            <form className="login-box" onSubmit={this.handleSubmit}>
              <h2>Set New Password</h2>

             
             
              {/* TEMP PASSWORD */}
              <label className="login-label">Enter Email sent Password</label>
              <div className="password-wrapper">
                <input
                  type={this.state.showOldPassword ? 'text' : 'password'}
                  name="oldpassword"
                  placeholder="Enter Email sent Password"
                  value={this.state.oldpassword}
                  onChange={this.handleChange}
                  className="login-input password-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={this.toggleOldPassword}
                >
                  {this.state.showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {this.state.errors.oldpassword && (
                <p className="error-text">{this.state.errors.oldpassword}</p>
              )}

              {/* NEW PASSWORD */}
              <label className="login-label">New Password</label>
              <div className="password-wrapper">
                <input
                  type={this.state.showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  placeholder="Enter New Password"
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                  className="login-input password-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={this.toggleNewPassword}
                >
                  {this.state.showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {this.state.errors.newPassword && (
                <p className="error-text">{this.state.errors.newPassword}</p>
              )}

              {/* CONFIRM PASSWORD */}
              <label className="login-label">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={this.state.showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  className="login-input password-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={this.toggleConfirmPassword}
                >
                  {this.state.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {this.state.errors.confirmPassword && (
                <p className="error-text">{this.state.errors.confirmPassword}</p>
              )}

              <button className="login-button">Update Password</button>

              {this.state.message && (
                <p
                  style={{
                    marginTop: '12px',
                    color: this.state.message.toLowerCase().includes('success')
                      ? 'green'
                      : 'red'
                  }}
                >
                  {this.state.message}
                </p>
              )}
            </form>
          </div>
        </div>

        <footer className="login-footer">
          © 2026 Venturebiz Promotions Private Limited
        </footer>
      </div>
    );
  }
}
