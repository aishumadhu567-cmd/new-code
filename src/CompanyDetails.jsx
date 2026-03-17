// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./CompanyDetails.css";

// // const API_BASE = "/api/comapanyDetails";

// // const EMPTY_FORM = {
// //   companyName: "", address: "", companyDescription: "",
// //   linkedinUrl: "", websiteUrl: "", primaryPhoneNumber: "",
// //   secondaryPhoneNumber: "", primaryEmail: "", secondaryEmail: "",
// //   hrName: "", hrContactNumber: "",
// // };

// // const FIELDS = [
// //   { name: "companyName",          label: "Company Name",      placeholder: "HR Nexus Technologies", icon: "🏢", required: true },
// //   { name: "address",              label: "Address",           placeholder: "100, Tech Park, Bengaluru", icon: "📍" },
// //   { name: "companyDescription",   label: "Description",       placeholder: "Brief company overview…", icon: "📝", full: true },
// //   { name: "websiteUrl",           label: "Website URL",       placeholder: "https://yourcompany.com", icon: "🌐" },
// //   { name: "linkedinUrl",          label: "LinkedIn URL",      placeholder: "https://linkedin.com/company/…", icon: "🔗" },
// //   { name: "primaryPhoneNumber",   label: "Primary Phone",     placeholder: "+91 80 2345 6789", icon: "📞" },
// //   { name: "secondaryPhoneNumber", label: "Secondary Phone",   placeholder: "+91 80 2345 6790", icon: "📞" },
// //   { name: "primaryEmail",         label: "Primary Email",     placeholder: "info@company.in",  icon: "✉️" },
// //   { name: "secondaryEmail",       label: "Secondary Email",   placeholder: "hr@company.in",    icon: "✉️" },
// //   { name: "hrName",               label: "HR Name",           placeholder: "Priya Sharma",     icon: "👤" },
// //   { name: "hrContactNumber",      label: "HR Contact",        placeholder: "+91 98765 43210",  icon: "📱" },
// // ];

// // export default function CompanyDetails() {
// //   const [companies, setCompanies] = useState([]);
// //   const [form,      setForm]      = useState(EMPTY_FORM);
// //   const [editId,    setEditId]    = useState(null);
// //   const [loading,   setLoading]   = useState(true);
// //   const [saving,    setSaving]    = useState(false);
// //   const [toast,     setToast]     = useState(null);
// //   const [showForm,  setShowForm]  = useState(false);

// //   const fetchCompanies = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(API_BASE);
// //       setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
// //     } catch { setCompanies([]); }
// //     finally { setLoading(false); }
// //   };

// //   useEffect(() => { fetchCompanies(); }, []);

// //   const showToast = (msg, type = "success") => {
// //     setToast({ msg, type });
// //     setTimeout(() => setToast(null), 3200);
// //   };

// //   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
// //   const cleanPayload = (data) => {
// //   return {
// //     companyName: data.companyName || "",
// //     address: data.address || "",
// //     companyDescription: data.companyDescription || "",
// //     linkedinUrl: data.linkedinUrl || "",
// //     websiteUrl: data.websiteUrl || "",
// //     primaryPhoneNumber: data.primaryPhoneNumber || "",
// //     secondaryPhoneNumber: data.secondaryPhoneNumber || "",
// //     primaryEmail: data.primaryEmail || "",
// //     secondaryEmail: data.secondaryEmail || "",
// //     hrName: data.hrName || "",
// //     hrContactNumber: data.hrContactNumber || ""
// //   };
// // };

// //   const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   setSaving(true);

// //   try {
// //     const payload = cleanPayload(form); // ✅ CLEAN DATA

// //     if (editId) {
// //       await axios.put(`${API_BASE}/${editId}`, payload);
// //       showToast("Company updated successfully!");
// //     } else {
// //       await axios.post(API_BASE, payload);
// //       showToast("Company created successfully!");
// //     }

// //     setForm(EMPTY_FORM);
// //     setEditId(null);
// //     setShowForm(false);
// //     fetchCompanies();

// //   } catch (err) {
// //     console.error(err.response?.data); // 🔥 debug
// //     showToast(err.response?.data?.message || "Something went wrong", "error");
// //   } finally {
// //     setSaving(false);
// //   }
// // };
 
// // const handleEdit = (company) => {
// //   setForm(cleanPayload(company)); // ✅ only allowed fields
// //   setEditId(company.id);
// //   setShowForm(true);

// //   window.scrollTo({ top: 0, behavior: "smooth" });
// // };

// //   const handleCancel = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(false); };

// //   const getInitials = (name = "") =>
// //     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

// //   return (
// //     <div className="cd-root">

// //       {toast && (
// //         <div className={`cd-toast cd-toast--${toast.type}`}>
// //           <span className="cd-toast-dot" />{toast.msg}
// //         </div>
// //       )}

// //       {/* Page header */}
// //       <div className="cd-page-header">
// //         <div>
// //           <h1 className="cd-page-title">Company Management</h1>
// //           <p className="cd-page-sub">Manage your organisation's profile and contact details</p>
// //         </div>
// //         {!showForm && (
// //           <button className="cd-btn cd-btn--primary" onClick={() => setShowForm(true)}>
// //             + Add Company
// //           </button>
// //         )}
// //       </div>

     

// //       {/* Form */}
// //       {showForm && (
// //         <div className="cd-form-card">
// //           <div className="cd-form-header">
// //             <div className="cd-form-header-icon">{editId ? "✏️" : "✦"}</div>
// //             <div>
// //               <div className="cd-form-header-title">{editId ? "Edit Company" : "New Company"}</div>
// //               <div className="cd-form-header-sub">{editId ? `Updating record ${editId}` : "Fill in the company details below"}</div>
// //             </div>
// //             <button className="cd-close-btn" onClick={handleCancel}>✕</button>
// //           </div>

// //           <form className="cd-form" onSubmit={handleSubmit}>
// //             {FIELDS.map((f) => (
// //               <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
// //                 <label className="cd-label">
// //                   <span className="cd-label-icon">{f.icon}</span>
// //                   {f.label}{f.required && <span className="cd-required"> *</span>}
// //                 </label>
// //                 {f.full ? (
// //                   <textarea
// //                     name={f.name} className="cd-input cd-textarea"
// //                     placeholder={f.placeholder} value={form[f.name]}
// //                     onChange={handleChange} rows={2}
// //                   />
// //                 ) : (
// //                   <input
// //                     name={f.name} className="cd-input"
// //                     placeholder={f.placeholder} value={form[f.name]}
// //                     onChange={handleChange} required={f.required}
// //                   />
// //                 )}
// //               </div>
// //             ))}

// //             <div className="cd-form-actions">
// //               <button type="submit" className="cd-btn cd-btn--primary cd-btn--lg" disabled={saving}>
// //                 {saving ? <><span className="cd-spinner" /> Saving…</> : editId ? "💾  Update Company" : "✓  Create Company"}
// //               </button>
// //               <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>Cancel</button>
// //             </div>
// //           </form>
// //         </div>
// //       )}

// //       {/* List section */}
// //       <div className="cd-section-header">
// //         <span className="cd-section-title">Registered Companies</span>
        
// //       </div>

// //       {loading ? (
// //         <div className="cd-loading">
// //           <div className="cd-loading-ring" /><span>Loading…</span>
// //         </div>
// //       ) : companies.length === 0 ? (
// //         <div className="cd-empty">
// //           <div className="cd-empty-icon">🏢</div>
// //           <div className="cd-empty-title">No companies yet</div>
// //           <div className="cd-empty-sub">Click "Add Company" to get started</div>
// //         </div>
// //       ) : (
// //         <div className="cd-table-wrap">
// //           <table className="cd-table">
// //             <thead>
// //               <tr>
// //                 <th>Id</th><th>Company</th><th>Email</th>
// //                 <th>Phone</th><th>HR Name</th><th>Website</th><th>Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {companies.map((c, i) => (
// //                 <tr key={c.id || i} className="cd-tr">
// //                   <td className="cd-td-num">{i + 1}</td>
// //                   <td>
// //                     <div className="cd-name-cell">
// //                       <div className="cd-avatar">{getInitials(c.companyName)}</div>
// //                       <div>
// //                         <div className="cd-co-name">{c.companyName}</div>
// //                         <div className="cd-co-desc">{c.companyDescription || "—"}</div>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
// //                   <td>{c.primaryPhoneNumber || "—"}</td>
// //                   <td>
// //                     <div className="cd-hr-cell">
// //                       <span className="cd-hr-name">{c.hrName || "—"}</span>
// //                       {c.hrContactNumber && <span className="cd-hr-num">{c.hrContactNumber}</span>}
// //                     </div>
// //                   </td>
// //                   <td>
// //                     {c.websiteUrl
// //                       ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
// //                       : "—"}
// //                   </td>
// //                   <td>
// //                     <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>✏️ Edit</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./CompanyDetails.css";

// const API_BASE = "/api/comapanyDetails";

// const EMPTY_FORM = {
//   companyName: "", address: "", companyDescription: "",
//   linkedinUrl: "", websiteUrl: "", primaryPhoneNumber: "",
//   secondaryPhoneNumber: "", primaryEmail: "", secondaryEmail: "",
//   hrName: "", hrContactNumber: "",
// };

// const FIELDS = [
//   { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",    icon: "🏢", required: true },
//   { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru", icon: "📍" },
//   { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",  icon: "📝", full: true },
//   { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",   icon: "🌐" },
//   { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
//   { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",          icon: "📞" },
//   { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",          icon: "📞" },
//   { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",           icon: "✉️" },
//   { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",             icon: "✉️" },
//   { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",              icon: "👤" },
//   { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",           icon: "📱" },
// ];

// const cleanPayload = (data) => ({
//   companyName:          data.companyName          || "",
//   address:              data.address              || "",
//   companyDescription:   data.companyDescription   || "",
//   linkedinUrl:          data.linkedinUrl          || "",
//   websiteUrl:           data.websiteUrl           || "",
//   primaryPhoneNumber:   data.primaryPhoneNumber   || "",
//   secondaryPhoneNumber: data.secondaryPhoneNumber || "",
//   primaryEmail:         data.primaryEmail         || "",
//   secondaryEmail:       data.secondaryEmail       || "",
//   hrName:               data.hrName               || "",
//   hrContactNumber:      data.hrContactNumber      || "",
// });

// export default function CompanyDetails() {
//   const [companies, setCompanies] = useState([]);
//   const [form,      setForm]      = useState(EMPTY_FORM);
//   const [editId,    setEditId]    = useState(null);
//   const [loading,   setLoading]   = useState(true);
//   const [saving,    setSaving]    = useState(false);
//   const [toast,     setToast]     = useState(null);
//   const [showForm,  setShowForm]  = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState("");
// const [searchExp, setSearchExp] = useState("");
// const [searchResults, setSearchResults] = useState([]);
// const [isSearching, setIsSearching] = useState(false);

//   /* ── GET ── */
//   const fetchCompanies = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_BASE);
//       setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
//     } catch { setCompanies([]); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchCompanies(); }, []);

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3200);
//   };

//   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   /* ── POST / PUT ── */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const payload = cleanPayload(form);
//       if (editId) {
//         await axios.put(`${API_BASE}/${editId}`, payload);
//         showToast("Company updated successfully!");
//       } else {
//         await axios.post(API_BASE, payload);
//         showToast("Company created successfully!");
//       }
//       setForm(EMPTY_FORM);
//       setEditId(null);
//       setShowForm(false);
//       fetchCompanies();
//     } catch (err) {
//       console.error(err.response?.data);
//       showToast(err.response?.data?.message || "Something went wrong.", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = (company) => {
//     setForm(cleanPayload(company));
//     setEditId(company.id);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleCancel = () => {
//     setForm(EMPTY_FORM);
//     setEditId(null);
//     setShowForm(false);
//   };
//   const handleSearch = async () => {
//   setIsSearching(true);
//   try {
//     const res = await axios.get("/api/skill/search", {
//       params: {
//         keyWord: searchKeyword,
//         yrOfExp: searchExp
//       }
//     });

//     setSearchResults(Array.isArray(res.data) ? res.data : []);
//   } catch (err) {
//     console.error(err);
//     showToast("Search failed", "error");
//   } finally {
//     setIsSearching(false);
//   }
// };
  

//   const getInitials = (name = "") =>
//     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

//   return (
//     <div className="cd-root">

//       {/* ── Toast notification ── */}
//       {toast && (
//         <div className={`cd-toast cd-toast--${toast.type}`}>
//           <span className="cd-toast-dot" />
//           {toast.msg}
//         </div>
//       )}

//       {/* ── Hero banner — navy-to-blue gradient ── */}
//       <div className="cd-hero">
//         <div className="cd-hero-content">
          
//           <h1 className="cd-hero-title">Company Management</h1>
//           <p className="cd-hero-sub">
//             Manage your organisation's profile, contact details, and HR information
//           </p>
//           <div className="cd-hero-actions">
//             {!showForm && (
//               <button
//                 className="cd-btn cd-btn--primary"
//                 onClick={() => setShowForm(true)}
//               >
//                 + Add Company
//               </button>
//             )}
//             {showForm && (
//               <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
//                 ✕ Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── Body content ── */}
//       <div className="cd-body">

      

//         {/* ── Add / Edit Form ── */}
//         {showForm && (
//           <div className="cd-form-card">
//             <div className="cd-form-header">
              
//               <div>
//                 <div className="cd-form-header-title">
//                   {editId ? "Edit Company" : "New Company"}
//                 </div>
                
//               </div>
//               <button className="cd-close-btn" onClick={handleCancel}>✕</button>
//             </div>

//             <form className="cd-form" onSubmit={handleSubmit}>
//               {FIELDS.map((f) => (
//                 <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
//                   <label className="cd-label">
//                     <span className="cd-label-icon">{f.icon}</span>
//                     {f.label}
//                     {f.required && <span className="cd-required"> *</span>}
//                   </label>
//                   {f.full ? (
//                     <textarea
//                       name={f.name}
//                       className="cd-input cd-textarea"
//                       placeholder={f.placeholder}
//                       value={form[f.name]}
//                       onChange={handleChange}
//                       rows={2}
//                     />
//                   ) : (
//                     <input
//                       name={f.name}
//                       className="cd-input"
//                       placeholder={f.placeholder}
//                       value={form[f.name]}
//                       onChange={handleChange}
//                       required={f.required}
//                     />
//                   )}
//                 </div>
//               ))}

//               <div className="cd-form-actions">
//                 <button
//                   type="submit"
//                   className="cd-btn cd-btn--blue cd-btn--lg"
//                   disabled={saving}
//                 >
//                   {saving
//                     ? <><span className="cd-spinner" /> Saving…</>
//                     : editId ? "💾  Update Company" : "✓  Create Company"}
//                 </button>
//                 <button
//                   type="button"
//                   className="cd-btn cd-btn--ghost"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
// <div className="cd-search-bar">
//   <input
//     type="text"
//     placeholder="Search by skill (e.g. Python)"
//     value={searchKeyword}
//     onChange={(e) => setSearchKeyword(e.target.value)}
//     className="cd-input"
//   />

//   <input
//     type="number"
//     placeholder="Years of Experience"
//     value={searchExp}
//     onChange={(e) => setSearchExp(e.target.value)}
//     className="cd-input"
//   />

//   <button className="cd-btn cd-btn--blue" onClick={handleSearch}>
//     🔍 Search
//   </button>
// </div>
//         {/* ── Section heading ── */}
//         <div className="cd-section-header">
//           <span className="cd-section-title">Registered Companies</span>
          
//         </div>

//         {/* ── States: loading / empty / table ── */}
//         {loading ? (
//           <div className="cd-loading">
//             <div className="cd-loading-ring" />
//             <span>Loading companies…</span>
//           </div>
//         ) : companies.length === 0 ? (
//           <div className="cd-empty">
//             <div className="cd-empty-icon">🏢</div>
//             <div className="cd-empty-title">No companies yet</div>
//             <div className="cd-empty-sub">Click "Add Company" in the header to create your first entry</div>
//           </div>
//         ) : (
//           <div className="cd-table-wrap">
//             <table className="cd-table">
//               <thead>
//                 <tr>
//                   <th>Id</th>
//                   <th>Company</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>HR Name</th>
//                   <th>Website</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {companies.map((c, i) => (
//                   <tr key={c.id || i} className="cd-tr">
//                     <td className="cd-td-num">{i + 1}</td>
//                     <td>
//                       <div className="cd-name-cell">
//                         <div className="cd-avatar">{getInitials(c.companyName)}</div>
//                         <div>
//                           <div className="cd-co-name">{c.companyName}</div>
//                           <div className="cd-co-desc">{c.companyDescription || "—"}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
//                     <td>{c.primaryPhoneNumber || "—"}</td>
//                     <td>
//                       <div className="cd-hr-cell">
//                         <span className="cd-hr-name">{c.hrName || "—"}</span>
//                         {c.hrContactNumber && (
//                           <span className="cd-hr-num">{c.hrContactNumber}</span>
//                         )}
//                       </div>
//                     </td>
//                     <td>
//                       {c.websiteUrl
//                         ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
//                         : "—"}
//                     </td>
//                     <td>
//                       <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
//                         ✏️ Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {isSearching ? (
//   <div className="cd-loading">
//     <div className="cd-loading-ring" />
//     <span>Searching…</span>
//   </div>
// ) : searchResults.length > 0 ? (
//   <div className="cd-table-wrap">
//     <h3>Search Results</h3>
//     <table className="cd-table">
//       <thead>
//         <tr>
//           <th>User ID</th>
//           <th>Name</th>
//           <th>Department</th>
//           <th>Designation</th>
//           <th>Skill</th>
//           <th>Experience</th>
//         </tr>
//       </thead>
//       <tbody>
//   {searchResults.map((user, i) => (
//     <tr key={i}>
//       <td>{user.userId}</td>

//       <td>{user.username}</td>

//       <td>
//         {user.firstName} {user.middleName || ""} {user.lastName}
//       </td>

//       <td>{user.gender}</td>

//       <td>
//         {user.dob
//           ? `${user.dob[2]}-${user.dob[1]}-${user.dob[0]}`
//           : "—"}
//       </td>

//       <td>{user.departmentName}</td>

//       <td>{user.designationName}</td>

//       <td>{user.skillName}</td>

//       <td>{user.yearsOfExperience} yrs</td>
//       <td>{user.nationality}</td>
// <td>{user.maritalStatus}</td>
// <td>{user.bloodGroup}</td>
// <td>{user.address1}</td>
// <td>{user.skillDescription}</td>
//     </tr>
//   ))}
// </tbody>
//     </table>
//   </div>
// ) : null}
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompanyDetails.css";

const API_BASE = "/api/comapanyDetails";

const EMPTY_FORM = {
  companyName: "", address: "", companyDescription: "",
  linkedinUrl: "", websiteUrl: "", primaryPhoneNumber: "",
  secondaryPhoneNumber: "", primaryEmail: "", secondaryEmail: "",
  hrName: "", hrContactNumber: "",
};

const FIELDS = [
  { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",    icon: "🏢", required: true },
  { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru", icon: "📍" },
  { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",  icon: "📝", full: true },
  { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",   icon: "🌐" },
  { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
  { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",          icon: "📞" },
  { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",          icon: "📞" },
  { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",           icon: "✉️" },
  { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",             icon: "✉️" },
  { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",              icon: "👤" },
  { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",           icon: "📱" },
];

const cleanPayload = (data) => ({
  companyName:          data.companyName          || "",
  address:              data.address              || "",
  companyDescription:   data.companyDescription   || "",
  linkedinUrl:          data.linkedinUrl          || "",
  websiteUrl:           data.websiteUrl           || "",
  primaryPhoneNumber:   data.primaryPhoneNumber   || "",
  secondaryPhoneNumber: data.secondaryPhoneNumber || "",
  primaryEmail:         data.primaryEmail         || "",
  secondaryEmail:       data.secondaryEmail       || "",
  hrName:               data.hrName               || "",
  hrContactNumber:      data.hrContactNumber      || "",
});

export default function CompanyDetails() {
  const [companies, setCompanies] = useState([]);
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [editId,    setEditId]    = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [toast,     setToast]     = useState(null);
  const [showForm,  setShowForm]  = useState(false);
  
  // Search states
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchExp, setSearchExp] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Company search states
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [companySearchResults, setCompanySearchResults] = useState([]);
  const [isSearchingCompany, setIsSearchingCompany] = useState(false);

  /* ── GET ── */
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
    } catch { setCompanies([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCompanies(); }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  /* ── POST / PUT ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = cleanPayload(form);
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, payload);
        showToast("Company updated successfully!");
      } else {
        await axios.post(API_BASE, payload);
        showToast("Company created successfully!");
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      setShowForm(false);
      fetchCompanies();
    } catch (err) {
      console.error(err.response?.data);
      showToast(err.response?.data?.message || "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (company) => {
    setForm(cleanPayload(company));
    setEditId(company.id);
    setShowForm(true);
    setShowSearch(false); // Close search if open
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  // Toggle search panel
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      // Reset search results when opening
      setSearchResults([]);
      setCompanySearchResults([]);
      setSearchKeyword("");
      setSearchExp("");
      setCompanySearchTerm("");
    }
  };

  // Skill search handler
  const handleSkillSearch = async () => {
    if (!searchKeyword && !searchExp) {
      showToast("Please enter at least one search criteria", "error");
      return;
    }
    
    setIsSearching(true);
    try {
      const res = await axios.get("/api/skill/search", {
        params: {
          keyWord: searchKeyword,
          yrOfExp: searchExp
        }
      });
      setSearchResults(Array.isArray(res.data) ? res.data : []);
      if (res.data.length === 0) {
        showToast("No results found", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Search failed", "error");
    } finally {
      setIsSearching(false);
    }
  };

  // Company search handler
  const handleCompanySearch = async () => {
    if (!companySearchTerm) {
      showToast("Please enter a company name to search", "error");
      return;
    }

    setIsSearchingCompany(true);
    try {
      // Filter companies locally first for instant results
      const filtered = companies.filter(company => 
        company.companyName?.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        company.primaryEmail?.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        company.hrName?.toLowerCase().includes(companySearchTerm.toLowerCase())
      );
      setCompanySearchResults(filtered);
      
      if (filtered.length === 0) {
        showToast("No matching companies found", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Company search failed", "error");
    } finally {
      setIsSearchingCompany(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchResults([]);
    setCompanySearchResults([]);
    setSearchKeyword("");
    setSearchExp("");
    setCompanySearchTerm("");
  };

  const getInitials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

  return (
    <div className="cd-root">

      {/* ── Toast notification ── */}
      {toast && (
        <div className={`cd-toast cd-toast--${toast.type}`}>
          <span className="cd-toast-dot" />
          {toast.msg}
        </div>
      )}

      {/* ── Hero banner — navy-to-blue gradient with search button ── */}
      <div className="cd-hero">
        <div className="cd-hero-content">
          <h1 className="cd-hero-title">Company Management</h1>
          <p className="cd-hero-sub">
            Manage your organisation's profile, contact details, and HR information
          </p>
          <div className="cd-hero-actions">
            {/* Search Button in Header */}
            <button
              className="cd-btn cd-btn--search"
              onClick={toggleSearch}
            >
              <span>🔍</span> {showSearch ? 'Hide Search' : 'Search Options'}
            </button>
            
            {!showForm && (
              <button
                className="cd-btn cd-btn--primary"
                onClick={() => {
                  setShowForm(true);
                  setShowSearch(false);
                }}
              >
                + Add Company
              </button>
            )}
            {showForm && (
              <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
                ✕ Cancel
              </button>
            )}
          </div>
        </div>
        <div className="cd-hero-circle3"></div>
      </div>

      {/* ── Search Panel (shown when search button is clicked) ── */}
      {showSearch && (
        <div className="cd-search-container">
          <div className="cd-search-form">
            <div className="cd-search-header">
              <h3 className="cd-search-title">🔍 Search Options</h3>
              <button className="cd-close-btn" onClick={toggleSearch}>✕</button>
            </div>
            
            <div className="cd-search-tabs">
              <div className="cd-search-fields">
                {/* Skill Search Section */}
                <div className="cd-search-section">
                  <h4 className="cd-search-section-title">Skill Search</h4>
                  <div className="cd-search-field">
                    <label className="cd-search-label">
                      <span className="cd-search-icon">💻</span>
                      Skill / Keyword
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Python, React, Java"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="cd-search-input"
                    />
                  </div>
                  
                  <div className="cd-search-field">
                    <label className="cd-search-label">
                      <span className="cd-search-icon">⏳</span>
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 3"
                      value={searchExp}
                      onChange={(e) => setSearchExp(e.target.value)}
                      className="cd-search-input"
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="cd-search-actions">
                    <button 
                      className="cd-btn cd-btn--blue" 
                      onClick={handleSkillSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? <><span className="cd-spinner" /> Searching...</> : '🔍 Search Skills'}
                    </button>
                  </div>
                </div>

                {/* Company Search Section */}
                <div className="cd-search-section">
                  <h4 className="cd-search-section-title">Company Search</h4>
                  <div className="cd-search-field">
                    <label className="cd-search-label">
                      <span className="cd-search-icon">🏢</span>
                      Company Name / Email / HR
                    </label>
                    <input
                      type="text"
                      placeholder="Search companies..."
                      value={companySearchTerm}
                      onChange={(e) => setCompanySearchTerm(e.target.value)}
                      className="cd-search-input"
                    />
                  </div>
                  
                  <div className="cd-search-actions">
                    <button 
                      className="cd-btn cd-btn--blue" 
                      onClick={handleCompanySearch}
                      disabled={isSearchingCompany}
                    >
                      {isSearchingCompany ? <><span className="cd-spinner" /> Searching...</> : '🔍 Search Companies'}
                    </button>
                    {(searchResults.length > 0 || companySearchResults.length > 0) && (
                      <button 
                        className="cd-btn cd-btn--ghost" 
                        onClick={clearSearch}
                      >
                        Clear Results
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Body content ── */}
      <div className="cd-body">

        {/* ── Add / Edit Form ── */}
        {showForm && (
          <div className="cd-form-card">
            <div className="cd-form-header">
              <div>
                <div className="cd-form-header-title">
                  {editId ? "Edit Company" : "New Company"}
                </div>
              </div>
              <button className="cd-close-btn" onClick={handleCancel}>✕</button>
            </div>

            <form className="cd-form" onSubmit={handleSubmit}>
              {FIELDS.map((f) => (
                <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
                  <label className="cd-label">
                    <span className="cd-label-icon">{f.icon}</span>
                    {f.label}
                    {f.required && <span className="cd-required"> *</span>}
                  </label>
                  {f.full ? (
                    <textarea
                      name={f.name}
                      className="cd-input cd-textarea"
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={handleChange}
                      rows={2}
                    />
                  ) : (
                    <input
                      name={f.name}
                      className="cd-input"
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={handleChange}
                      required={f.required}
                    />
                  )}
                </div>
              ))}

              <div className="cd-form-actions">
                <button
                  type="submit"
                  className="cd-btn cd-btn--blue cd-btn--lg"
                  disabled={saving}
                >
                  {saving
                    ? <><span className="cd-spinner" /> Saving…</>
                    : editId ? "💾  Update Company" : "✓  Create Company"}
                </button>
                <button
                  type="button"
                  className="cd-btn cd-btn--ghost"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Search Results Section ── */}
        {searchResults.length > 0 && (
          <div className="cd-search-results">
            <div className="cd-section-header">
              <span className="cd-section-title">Skill Search Results</span>
              <span className="cd-count-badge">{searchResults.length} found</span>
            </div>
            <div className="cd-table-wrap">
              <table className="cd-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Skill</th>
                    <th>Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((user, i) => (
                    <tr key={i} className="cd-tr">
                      <td className="cd-td-num">{user.userId || i + 1}</td>
                      <td>
                        <div className="cd-name-cell">
                          <div className="cd-avatar">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </div>
                          <div>
                            <div className="cd-co-name">
                              {user.firstName} {user.middleName || ""} {user.lastName}
                            </div>
                            <div className="cd-co-desc">{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.departmentName || "—"}</td>
                      <td>{user.designationName || "—"}</td>
                      <td className="cd-td-blue">{user.skillName || "—"}</td>
                      <td>{user.yearsOfExperience ? `${user.yearsOfExperience} yrs` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Company Search Results ── */}
        {companySearchResults.length > 0 && (
          <div className="cd-search-results">
            <div className="cd-section-header">
              <span className="cd-section-title">Company Search Results</span>
              <span className="cd-count-badge">{companySearchResults.length} found</span>
            </div>
            <div className="cd-table-wrap">
              <table className="cd-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>HR Name</th>
                    <th>Website</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {companySearchResults.map((c, i) => (
                    <tr key={c.id || i} className="cd-tr">
                      <td className="cd-td-num">{i + 1}</td>
                      <td>
                        <div className="cd-name-cell">
                          <div className="cd-avatar">{getInitials(c.companyName)}</div>
                          <div>
                            <div className="cd-co-name">{c.companyName}</div>
                            <div className="cd-co-desc">{c.companyDescription || "—"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
                      <td>{c.primaryPhoneNumber || "—"}</td>
                      <td>
                        <div className="cd-hr-cell">
                          <span className="cd-hr-name">{c.hrName || "—"}</span>
                          {c.hrContactNumber && (
                            <span className="cd-hr-num">{c.hrContactNumber}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        {c.websiteUrl
                          ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
                          : "—"}
                      </td>
                      <td>
                        <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
                          ✏️ Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Section heading for main company list ── */}
        {!companySearchResults.length > 0 && (
          <div className="cd-section-header">
            <span className="cd-section-title">Registered Companies</span>
            <span className="cd-count-badge">{companies.length} total</span>
          </div>
        )}

        {/* ── Main Company List (only show if no company search results) ── */}
        {!companySearchResults.length > 0 && (
          loading ? (
            <div className="cd-loading">
              <div className="cd-loading-ring" />
              <span>Loading companies…</span>
            </div>
          ) : companies.length === 0 ? (
            <div className="cd-empty">
              <div className="cd-empty-icon">🏢</div>
              <div className="cd-empty-title">No companies yet</div>
              <div className="cd-empty-sub">Click "Add Company" in the header to create your first entry</div>
            </div>
          ) : (
            <div className="cd-table-wrap">
              <table className="cd-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>HR Name</th>
                    <th>Website</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((c, i) => (
                    <tr key={c.id || i} className="cd-tr">
                      <td className="cd-td-num">{i + 1}</td>
                      <td>
                        <div className="cd-name-cell">
                          <div className="cd-avatar">{getInitials(c.companyName)}</div>
                          <div>
                            <div className="cd-co-name">{c.companyName}</div>
                            <div className="cd-co-desc">{c.companyDescription || "—"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
                      <td>{c.primaryPhoneNumber || "—"}</td>
                      <td>
                        <div className="cd-hr-cell">
                          <span className="cd-hr-name">{c.hrName || "—"}</span>
                          {c.hrContactNumber && (
                            <span className="cd-hr-num">{c.hrContactNumber}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        {c.websiteUrl
                          ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
                          : "—"}
                      </td>
                      <td>
                        <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
                          ✏️ Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}