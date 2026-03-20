// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import "./CompanyDetails.css";

// // // // // // // const API_BASE = "/api/comapanyDetails";

// // // // // // // const EMPTY_FORM = {
// // // // // // //   companyName: "", address: "", companyDescription: "",
// // // // // // //   linkedinUrl: "", websiteUrl: "", primaryPhoneNumber: "",
// // // // // // //   secondaryPhoneNumber: "", primaryEmail: "", secondaryEmail: "",
// // // // // // //   hrName: "", hrContactNumber: "",
// // // // // // // };

// // // // // // // const FIELDS = [
// // // // // // //   { name: "companyName",          label: "Company Name",      placeholder: "HR Nexus Technologies", icon: "🏢", required: true },
// // // // // // //   { name: "address",              label: "Address",           placeholder: "100, Tech Park, Bengaluru", icon: "📍" },
// // // // // // //   { name: "companyDescription",   label: "Description",       placeholder: "Brief company overview…", icon: "📝", full: true },
// // // // // // //   { name: "websiteUrl",           label: "Website URL",       placeholder: "https://yourcompany.com", icon: "🌐" },
// // // // // // //   { name: "linkedinUrl",          label: "LinkedIn URL",      placeholder: "https://linkedin.com/company/…", icon: "🔗" },
// // // // // // //   { name: "primaryPhoneNumber",   label: "Primary Phone",     placeholder: "+91 80 2345 6789", icon: "📞" },
// // // // // // //   { name: "secondaryPhoneNumber", label: "Secondary Phone",   placeholder: "+91 80 2345 6790", icon: "📞" },
// // // // // // //   { name: "primaryEmail",         label: "Primary Email",     placeholder: "info@company.in",  icon: "✉️" },
// // // // // // //   { name: "secondaryEmail",       label: "Secondary Email",   placeholder: "hr@company.in",    icon: "✉️" },
// // // // // // //   { name: "hrName",               label: "HR Name",           placeholder: "Priya Sharma",     icon: "👤" },
// // // // // // //   { name: "hrContactNumber",      label: "HR Contact",        placeholder: "+91 98765 43210",  icon: "📱" },
// // // // // // // ];

// // // // // // // export default function CompanyDetails() {
// // // // // // //   const [companies, setCompanies] = useState([]);
// // // // // // //   const [form,      setForm]      = useState(EMPTY_FORM);
// // // // // // //   const [editId,    setEditId]    = useState(null);
// // // // // // //   const [loading,   setLoading]   = useState(true);
// // // // // // //   const [saving,    setSaving]    = useState(false);
// // // // // // //   const [toast,     setToast]     = useState(null);
// // // // // // //   const [showForm,  setShowForm]  = useState(false);

// // // // // // //   const fetchCompanies = async () => {
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const res = await axios.get(API_BASE);
// // // // // // //       setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
// // // // // // //     } catch { setCompanies([]); }
// // // // // // //     finally { setLoading(false); }
// // // // // // //   };

// // // // // // //   useEffect(() => { fetchCompanies(); }, []);

// // // // // // //   const showToast = (msg, type = "success") => {
// // // // // // //     setToast({ msg, type });
// // // // // // //     setTimeout(() => setToast(null), 3200);
// // // // // // //   };

// // // // // // //   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
// // // // // // //   const cleanPayload = (data) => {
// // // // // // //   return {
// // // // // // //     companyName: data.companyName || "",
// // // // // // //     address: data.address || "",
// // // // // // //     companyDescription: data.companyDescription || "",
// // // // // // //     linkedinUrl: data.linkedinUrl || "",
// // // // // // //     websiteUrl: data.websiteUrl || "",
// // // // // // //     primaryPhoneNumber: data.primaryPhoneNumber || "",
// // // // // // //     secondaryPhoneNumber: data.secondaryPhoneNumber || "",
// // // // // // //     primaryEmail: data.primaryEmail || "",
// // // // // // //     secondaryEmail: data.secondaryEmail || "",
// // // // // // //     hrName: data.hrName || "",
// // // // // // //     hrContactNumber: data.hrContactNumber || ""
// // // // // // //   };
// // // // // // // };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //   e.preventDefault();
// // // // // // //   setSaving(true);

// // // // // // //   try {
// // // // // // //     const payload = cleanPayload(form); // ✅ CLEAN DATA

// // // // // // //     if (editId) {
// // // // // // //       await axios.put(`${API_BASE}/${editId}`, payload);
// // // // // // //       showToast("Company updated successfully!");
// // // // // // //     } else {
// // // // // // //       await axios.post(API_BASE, payload);
// // // // // // //       showToast("Company created successfully!");
// // // // // // //     }

// // // // // // //     setForm(EMPTY_FORM);
// // // // // // //     setEditId(null);
// // // // // // //     setShowForm(false);
// // // // // // //     fetchCompanies();

// // // // // // //   } catch (err) {
// // // // // // //     console.error(err.response?.data); // 🔥 debug
// // // // // // //     showToast(err.response?.data?.message || "Something went wrong", "error");
// // // // // // //   } finally {
// // // // // // //     setSaving(false);
// // // // // // //   }
// // // // // // // };
 
// // // // // // // const handleEdit = (company) => {
// // // // // // //   setForm(cleanPayload(company)); // ✅ only allowed fields
// // // // // // //   setEditId(company.id);
// // // // // // //   setShowForm(true);

// // // // // // //   window.scrollTo({ top: 0, behavior: "smooth" });
// // // // // // // };

// // // // // // //   const handleCancel = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(false); };

// // // // // // //   const getInitials = (name = "") =>
// // // // // // //     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

// // // // // // //   return (
// // // // // // //     <div className="cd-root">

// // // // // // //       {toast && (
// // // // // // //         <div className={`cd-toast cd-toast--${toast.type}`}>
// // // // // // //           <span className="cd-toast-dot" />{toast.msg}
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* Page header */}
// // // // // // //       <div className="cd-page-header">
// // // // // // //         <div>
// // // // // // //           <h1 className="cd-page-title">Company Management</h1>
// // // // // // //           <p className="cd-page-sub">Manage your organisation's profile and contact details</p>
// // // // // // //         </div>
// // // // // // //         {!showForm && (
// // // // // // //           <button className="cd-btn cd-btn--primary" onClick={() => setShowForm(true)}>
// // // // // // //             + Add Company
// // // // // // //           </button>
// // // // // // //         )}
// // // // // // //       </div>

     

// // // // // // //       {/* Form */}
// // // // // // //       {showForm && (
// // // // // // //         <div className="cd-form-card">
// // // // // // //           <div className="cd-form-header">
// // // // // // //             <div className="cd-form-header-icon">{editId ? "✏️" : "✦"}</div>
// // // // // // //             <div>
// // // // // // //               <div className="cd-form-header-title">{editId ? "Edit Company" : "New Company"}</div>
// // // // // // //               <div className="cd-form-header-sub">{editId ? `Updating record ${editId}` : "Fill in the company details below"}</div>
// // // // // // //             </div>
// // // // // // //             <button className="cd-close-btn" onClick={handleCancel}>✕</button>
// // // // // // //           </div>

// // // // // // //           <form className="cd-form" onSubmit={handleSubmit}>
// // // // // // //             {FIELDS.map((f) => (
// // // // // // //               <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
// // // // // // //                 <label className="cd-label">
// // // // // // //                   <span className="cd-label-icon">{f.icon}</span>
// // // // // // //                   {f.label}{f.required && <span className="cd-required"> *</span>}
// // // // // // //                 </label>
// // // // // // //                 {f.full ? (
// // // // // // //                   <textarea
// // // // // // //                     name={f.name} className="cd-input cd-textarea"
// // // // // // //                     placeholder={f.placeholder} value={form[f.name]}
// // // // // // //                     onChange={handleChange} rows={2}
// // // // // // //                   />
// // // // // // //                 ) : (
// // // // // // //                   <input
// // // // // // //                     name={f.name} className="cd-input"
// // // // // // //                     placeholder={f.placeholder} value={form[f.name]}
// // // // // // //                     onChange={handleChange} required={f.required}
// // // // // // //                   />
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             ))}

// // // // // // //             <div className="cd-form-actions">
// // // // // // //               <button type="submit" className="cd-btn cd-btn--primary cd-btn--lg" disabled={saving}>
// // // // // // //                 {saving ? <><span className="cd-spinner" /> Saving…</> : editId ? "💾  Update Company" : "✓  Create Company"}
// // // // // // //               </button>
// // // // // // //               <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>Cancel</button>
// // // // // // //             </div>
// // // // // // //           </form>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* List section */}
// // // // // // //       <div className="cd-section-header">
// // // // // // //         <span className="cd-section-title">Registered Companies</span>
        
// // // // // // //       </div>

// // // // // // //       {loading ? (
// // // // // // //         <div className="cd-loading">
// // // // // // //           <div className="cd-loading-ring" /><span>Loading…</span>
// // // // // // //         </div>
// // // // // // //       ) : companies.length === 0 ? (
// // // // // // //         <div className="cd-empty">
// // // // // // //           <div className="cd-empty-icon">🏢</div>
// // // // // // //           <div className="cd-empty-title">No companies yet</div>
// // // // // // //           <div className="cd-empty-sub">Click "Add Company" to get started</div>
// // // // // // //         </div>
// // // // // // //       ) : (
// // // // // // //         <div className="cd-table-wrap">
// // // // // // //           <table className="cd-table">
// // // // // // //             <thead>
// // // // // // //               <tr>
// // // // // // //                 <th>Id</th><th>Company</th><th>Email</th>
// // // // // // //                 <th>Phone</th><th>HR Name</th><th>Website</th><th>Action</th>
// // // // // // //               </tr>
// // // // // // //             </thead>
// // // // // // //             <tbody>
// // // // // // //               {companies.map((c, i) => (
// // // // // // //                 <tr key={c.id || i} className="cd-tr">
// // // // // // //                   <td className="cd-td-num">{i + 1}</td>
// // // // // // //                   <td>
// // // // // // //                     <div className="cd-name-cell">
// // // // // // //                       <div className="cd-avatar">{getInitials(c.companyName)}</div>
// // // // // // //                       <div>
// // // // // // //                         <div className="cd-co-name">{c.companyName}</div>
// // // // // // //                         <div className="cd-co-desc">{c.companyDescription || "—"}</div>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   </td>
// // // // // // //                   <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
// // // // // // //                   <td>{c.primaryPhoneNumber || "—"}</td>
// // // // // // //                   <td>
// // // // // // //                     <div className="cd-hr-cell">
// // // // // // //                       <span className="cd-hr-name">{c.hrName || "—"}</span>
// // // // // // //                       {c.hrContactNumber && <span className="cd-hr-num">{c.hrContactNumber}</span>}
// // // // // // //                     </div>
// // // // // // //                   </td>
// // // // // // //                   <td>
// // // // // // //                     {c.websiteUrl
// // // // // // //                       ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
// // // // // // //                       : "—"}
// // // // // // //                   </td>
// // // // // // //                   <td>
// // // // // // //                     <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>✏️ Edit</button>
// // // // // // //                   </td>
// // // // // // //                 </tr>
// // // // // // //               ))}
// // // // // // //             </tbody>
// // // // // // //           </table>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }






// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import axios from "axios";
// // // // // // import "./CompanyDetails.css";

// // // // // // const API_BASE = "/api/comapanyDetails";

// // // // // // const EMPTY_FORM = {
// // // // // //   companyName: "", address: "", companyDescription: "",
// // // // // //   linkedinUrl: "", websiteUrl: "", primaryPhoneNumber: "",
// // // // // //   secondaryPhoneNumber: "", primaryEmail: "", secondaryEmail: "",
// // // // // //   hrName: "", hrContactNumber: "",
// // // // // // };

// // // // // // const FIELDS = [
// // // // // //   { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",    icon: "🏢", required: true },
// // // // // //   { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru", icon: "📍" },
// // // // // //   { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",  icon: "📝", full: true },
// // // // // //   { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",   icon: "🌐" },
// // // // // //   { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
// // // // // //   { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",          icon: "📞" },
// // // // // //   { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",          icon: "📞" },
// // // // // //   { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",           icon: "✉️" },
// // // // // //   { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",             icon: "✉️" },
// // // // // //   { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",              icon: "👤" },
// // // // // //   { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",           icon: "📱" },
// // // // // // ];

// // // // // // const cleanPayload = (data) => ({
// // // // // //   companyName:          data.companyName          || "",
// // // // // //   address:              data.address              || "",
// // // // // //   companyDescription:   data.companyDescription   || "",
// // // // // //   linkedinUrl:          data.linkedinUrl          || "",
// // // // // //   websiteUrl:           data.websiteUrl           || "",
// // // // // //   primaryPhoneNumber:   data.primaryPhoneNumber   || "",
// // // // // //   secondaryPhoneNumber: data.secondaryPhoneNumber || "",
// // // // // //   primaryEmail:         data.primaryEmail         || "",
// // // // // //   secondaryEmail:       data.secondaryEmail       || "",
// // // // // //   hrName:               data.hrName               || "",
// // // // // //   hrContactNumber:      data.hrContactNumber      || "",
// // // // // // });

// // // // // // export default function CompanyDetails() {
// // // // // //   const [companies, setCompanies] = useState([]);
// // // // // //   const [form,      setForm]      = useState(EMPTY_FORM);
// // // // // //   const [editId,    setEditId]    = useState(null);
// // // // // //   const [loading,   setLoading]   = useState(true);
// // // // // //   const [saving,    setSaving]    = useState(false);
// // // // // //   const [toast,     setToast]     = useState(null);
// // // // // //   const [showForm,  setShowForm]  = useState(false);
// // // // // //   const [searchKeyword, setSearchKeyword] = useState("");
// // // // // // const [searchExp, setSearchExp] = useState("");
// // // // // // const [searchResults, setSearchResults] = useState([]);
// // // // // // const [isSearching, setIsSearching] = useState(false);

// // // // // //   /* ── GET ── */
// // // // // //   const fetchCompanies = async () => {
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const res = await axios.get(API_BASE);
// // // // // //       setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
// // // // // //     } catch { setCompanies([]); }
// // // // // //     finally { setLoading(false); }
// // // // // //   };

// // // // // //   useEffect(() => { fetchCompanies(); }, []);

// // // // // //   const showToast = (msg, type = "success") => {
// // // // // //     setToast({ msg, type });
// // // // // //     setTimeout(() => setToast(null), 3200);
// // // // // //   };

// // // // // //   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

// // // // // //   /* ── POST / PUT ── */
// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     setSaving(true);
// // // // // //     try {
// // // // // //       const payload = cleanPayload(form);
// // // // // //       if (editId) {
// // // // // //         await axios.put(`${API_BASE}/${editId}`, payload);
// // // // // //         showToast("Company updated successfully!");
// // // // // //       } else {
// // // // // //         await axios.post(API_BASE, payload);
// // // // // //         showToast("Company created successfully!");
// // // // // //       }
// // // // // //       setForm(EMPTY_FORM);
// // // // // //       setEditId(null);
// // // // // //       setShowForm(false);
// // // // // //       fetchCompanies();
// // // // // //     } catch (err) {
// // // // // //       console.error(err.response?.data);
// // // // // //       showToast(err.response?.data?.message || "Something went wrong.", "error");
// // // // // //     } finally {
// // // // // //       setSaving(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleEdit = (company) => {
// // // // // //     setForm(cleanPayload(company));
// // // // // //     setEditId(company.id);
// // // // // //     setShowForm(true);
// // // // // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // // // // //   };

// // // // // //   const handleCancel = () => {
// // // // // //     setForm(EMPTY_FORM);
// // // // // //     setEditId(null);
// // // // // //     setShowForm(false);
// // // // // //   };
// // // // // //   const handleSearch = async () => {
// // // // // //   setIsSearching(true);
// // // // // //   try {
// // // // // //     const res = await axios.get("/api/skill/search", {
// // // // // //       params: {
// // // // // //         keyWord: searchKeyword,
// // // // // //         yrOfExp: searchExp
// // // // // //       }
// // // // // //     });

// // // // // //     setSearchResults(Array.isArray(res.data) ? res.data : []);
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     showToast("Search failed", "error");
// // // // // //   } finally {
// // // // // //     setIsSearching(false);
// // // // // //   }
// // // // // // };
  

// // // // // //   const getInitials = (name = "") =>
// // // // // //     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

// // // // // //   return (
// // // // // //     <div className="cd-root">

// // // // // //       {/* ── Toast notification ── */}
// // // // // //       {toast && (
// // // // // //         <div className={`cd-toast cd-toast--${toast.type}`}>
// // // // // //           <span className="cd-toast-dot" />
// // // // // //           {toast.msg}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* ── Hero banner — navy-to-blue gradient ── */}
// // // // // //       <div className="cd-hero">
// // // // // //         <div className="cd-hero-content">
          
// // // // // //           <h1 className="cd-hero-title">Company Management</h1>
// // // // // //           <p className="cd-hero-sub">
// // // // // //             Manage your organisation's profile, contact details, and HR information
// // // // // //           </p>
// // // // // //           <div className="cd-hero-actions">
// // // // // //             {!showForm && (
// // // // // //               <button
// // // // // //                 className="cd-btn cd-btn--primary"
// // // // // //                 onClick={() => setShowForm(true)}
// // // // // //               >
// // // // // //                 + Add Company
// // // // // //               </button>
// // // // // //             )}
// // // // // //             {showForm && (
// // // // // //               <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
// // // // // //                 ✕ Cancel
// // // // // //               </button>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* ── Body content ── */}
// // // // // //       <div className="cd-body">

      

// // // // // //         {/* ── Add / Edit Form ── */}
// // // // // //         {showForm && (
// // // // // //           <div className="cd-form-card">
// // // // // //             <div className="cd-form-header">
              
// // // // // //               <div>
// // // // // //                 <div className="cd-form-header-title">
// // // // // //                   {editId ? "Edit Company" : "New Company"}
// // // // // //                 </div>
                
// // // // // //               </div>
// // // // // //               <button className="cd-close-btn" onClick={handleCancel}>✕</button>
// // // // // //             </div>

// // // // // //             <form className="cd-form" onSubmit={handleSubmit}>
// // // // // //               {FIELDS.map((f) => (
// // // // // //                 <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
// // // // // //                   <label className="cd-label">
// // // // // //                     <span className="cd-label-icon">{f.icon}</span>
// // // // // //                     {f.label}
// // // // // //                     {f.required && <span className="cd-required"> *</span>}
// // // // // //                   </label>
// // // // // //                   {f.full ? (
// // // // // //                     <textarea
// // // // // //                       name={f.name}
// // // // // //                       className="cd-input cd-textarea"
// // // // // //                       placeholder={f.placeholder}
// // // // // //                       value={form[f.name]}
// // // // // //                       onChange={handleChange}
// // // // // //                       rows={2}
// // // // // //                     />
// // // // // //                   ) : (
// // // // // //                     <input
// // // // // //                       name={f.name}
// // // // // //                       className="cd-input"
// // // // // //                       placeholder={f.placeholder}
// // // // // //                       value={form[f.name]}
// // // // // //                       onChange={handleChange}
// // // // // //                       required={f.required}
// // // // // //                     />
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               ))}

// // // // // //               <div className="cd-form-actions">
// // // // // //                 <button
// // // // // //                   type="submit"
// // // // // //                   className="cd-btn cd-btn--blue cd-btn--lg"
// // // // // //                   disabled={saving}
// // // // // //                 >
// // // // // //                   {saving
// // // // // //                     ? <><span className="cd-spinner" /> Saving…</>
// // // // // //                     : editId ? "💾  Update Company" : "✓  Create Company"}
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   type="button"
// // // // // //                   className="cd-btn cd-btn--ghost"
// // // // // //                   onClick={handleCancel}
// // // // // //                 >
// // // // // //                   Cancel
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </form>
// // // // // //           </div>
// // // // // //         )}
// // // // // // <div className="cd-search-bar">
// // // // // //   <input
// // // // // //     type="text"
// // // // // //     placeholder="Search by skill (e.g. Python)"
// // // // // //     value={searchKeyword}
// // // // // //     onChange={(e) => setSearchKeyword(e.target.value)}
// // // // // //     className="cd-input"
// // // // // //   />

// // // // // //   <input
// // // // // //     type="number"
// // // // // //     placeholder="Years of Experience"
// // // // // //     value={searchExp}
// // // // // //     onChange={(e) => setSearchExp(e.target.value)}
// // // // // //     className="cd-input"
// // // // // //   />

// // // // // //   <button className="cd-btn cd-btn--blue" onClick={handleSearch}>
// // // // // //     🔍 Search
// // // // // //   </button>
// // // // // // </div>
// // // // // //         {/* ── Section heading ── */}
// // // // // //         <div className="cd-section-header">
// // // // // //           <span className="cd-section-title">Registered Companies</span>
          
// // // // // //         </div>

// // // // // //         {/* ── States: loading / empty / table ── */}
// // // // // //         {loading ? (
// // // // // //           <div className="cd-loading">
// // // // // //             <div className="cd-loading-ring" />
// // // // // //             <span>Loading companies…</span>
// // // // // //           </div>
// // // // // //         ) : companies.length === 0 ? (
// // // // // //           <div className="cd-empty">
// // // // // //             <div className="cd-empty-icon">🏢</div>
// // // // // //             <div className="cd-empty-title">No companies yet</div>
// // // // // //             <div className="cd-empty-sub">Click "Add Company" in the header to create your first entry</div>
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <div className="cd-table-wrap">
// // // // // //             <table className="cd-table">
// // // // // //               <thead>
// // // // // //                 <tr>
// // // // // //                   <th>Id</th>
// // // // // //                   <th>Company</th>
// // // // // //                   <th>Email</th>
// // // // // //                   <th>Phone</th>
// // // // // //                   <th>HR Name</th>
// // // // // //                   <th>Website</th>
// // // // // //                   <th>Action</th>
// // // // // //                 </tr>
// // // // // //               </thead>
// // // // // //               <tbody>
// // // // // //                 {companies.map((c, i) => (
// // // // // //                   <tr key={c.id || i} className="cd-tr">
// // // // // //                     <td className="cd-td-num">{i + 1}</td>
// // // // // //                     <td>
// // // // // //                       <div className="cd-name-cell">
// // // // // //                         <div className="cd-avatar">{getInitials(c.companyName)}</div>
// // // // // //                         <div>
// // // // // //                           <div className="cd-co-name">{c.companyName}</div>
// // // // // //                           <div className="cd-co-desc">{c.companyDescription || "—"}</div>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     </td>
// // // // // //                     <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
// // // // // //                     <td>{c.primaryPhoneNumber || "—"}</td>
// // // // // //                     <td>
// // // // // //                       <div className="cd-hr-cell">
// // // // // //                         <span className="cd-hr-name">{c.hrName || "—"}</span>
// // // // // //                         {c.hrContactNumber && (
// // // // // //                           <span className="cd-hr-num">{c.hrContactNumber}</span>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                     </td>
// // // // // //                     <td>
// // // // // //                       {c.websiteUrl
// // // // // //                         ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
// // // // // //                         : "—"}
// // // // // //                     </td>
// // // // // //                     <td>
// // // // // //                       <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
// // // // // //                         ✏️ Edit
// // // // // //                       </button>
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ))}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           </div>
// // // // // //         )}
// // // // // //         {isSearching ? (
// // // // // //   <div className="cd-loading">
// // // // // //     <div className="cd-loading-ring" />
// // // // // //     <span>Searching…</span>
// // // // // //   </div>
// // // // // // ) : searchResults.length > 0 ? (
// // // // // //   <div className="cd-table-wrap">
// // // // // //     <h3>Search Results</h3>
// // // // // //     <table className="cd-table">
// // // // // //       <thead>
// // // // // //         <tr>
// // // // // //           <th>User ID</th>
// // // // // //           <th>Name</th>
// // // // // //           <th>Department</th>
// // // // // //           <th>Designation</th>
// // // // // //           <th>Skill</th>
// // // // // //           <th>Experience</th>
// // // // // //         </tr>
// // // // // //       </thead>
// // // // // //       <tbody>
// // // // // //   {searchResults.map((user, i) => (
// // // // // //     <tr key={i}>
// // // // // //       <td>{user.userId}</td>

// // // // // //       <td>{user.username}</td>

// // // // // //       <td>
// // // // // //         {user.firstName} {user.middleName || ""} {user.lastName}
// // // // // //       </td>

// // // // // //       <td>{user.gender}</td>

// // // // // //       <td>
// // // // // //         {user.dob
// // // // // //           ? `${user.dob[2]}-${user.dob[1]}-${user.dob[0]}`
// // // // // //           : "—"}
// // // // // //       </td>

// // // // // //       <td>{user.departmentName}</td>

// // // // // //       <td>{user.designationName}</td>

// // // // // //       <td>{user.skillName}</td>

// // // // // //       <td>{user.yearsOfExperience} yrs</td>
// // // // // //       <td>{user.nationality}</td>
// // // // // // <td>{user.maritalStatus}</td>
// // // // // // <td>{user.bloodGroup}</td>
// // // // // // <td>{user.address1}</td>
// // // // // // <td>{user.skillDescription}</td>
// // // // // //     </tr>
// // // // // //   ))}
// // // // // // </tbody>
// // // // // //     </table>
// // // // // //   </div>
// // // // // // ) : null}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // import React, { useEffect, useState } from "react";
// // // // // import axios from "axios";
// // // // // import "./CompanyDetails.css";

// // // // // const API_BASE = "/api/comapanyDetails";

// // // // // const EMPTY_FORM = {
// // // // //   companyName: "", address: "", companyDescription: "",
// // // // //   linkedinUrl: "", websiteUrl: "", primaryPhoneNumber: "",
// // // // //   secondaryPhoneNumber: "", primaryEmail: "", secondaryEmail: "",
// // // // //   hrName: "", hrContactNumber: "",
// // // // // };

// // // // // const FIELDS = [
// // // // //   { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",         icon: "🏢", required: true },
// // // // //   { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru",      icon: "📍" },
// // // // //   { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",        icon: "📝", full: true },
// // // // //   { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",        icon: "🌐" },
// // // // //   { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
// // // // //   { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",               icon: "📞" },
// // // // //   { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",               icon: "📞" },
// // // // //   { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",                icon: "✉️" },
// // // // //   { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",                  icon: "✉️" },
// // // // //   { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",                   icon: "👤" },
// // // // //   { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",                icon: "📱" },
// // // // // ];

// // // // // const cleanPayload = (data) => ({
// // // // //   companyName:          data.companyName          || "",
// // // // //   address:              data.address              || "",
// // // // //   companyDescription:   data.companyDescription   || "",
// // // // //   linkedinUrl:          data.linkedinUrl          || "",
// // // // //   websiteUrl:           data.websiteUrl           || "",
// // // // //   primaryPhoneNumber:   data.primaryPhoneNumber   || "",
// // // // //   secondaryPhoneNumber: data.secondaryPhoneNumber || "",
// // // // //   primaryEmail:         data.primaryEmail         || "",
// // // // //   secondaryEmail:       data.secondaryEmail       || "",
// // // // //   hrName:               data.hrName               || "",
// // // // //   hrContactNumber:      data.hrContactNumber      || "",
// // // // // });

// // // // // export default function CompanyDetails() {
// // // // //   const [companies,     setCompanies]     = useState([]);
// // // // //   const [form,          setForm]          = useState(EMPTY_FORM);
// // // // //   const [editId,        setEditId]        = useState(null);
// // // // //   const [loading,       setLoading]       = useState(true);
// // // // //   const [saving,        setSaving]        = useState(false);
// // // // //   const [toast,         setToast]         = useState(null);
// // // // //   const [showForm,      setShowForm]      = useState(false);
// // // // //   const [searchKeyword, setSearchKeyword] = useState("");
// // // // //   const [searchExp,     setSearchExp]     = useState("");
// // // // //   const [searchResults, setSearchResults] = useState([]);
// // // // //   const [isSearching,   setIsSearching]   = useState(false);

// // // // //   // ── NEW: one state to show/hide the search bar ──
// // // // //   const [showSearch, setShowSearch] = useState(false);

// // // // //   /* ── GET ── */
// // // // //   const fetchCompanies = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await axios.get(API_BASE);
// // // // //       setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
// // // // //     } catch { setCompanies([]); }
// // // // //     finally { setLoading(false); }
// // // // //   };

// // // // //   useEffect(() => { fetchCompanies(); }, []);

// // // // //   const showToast = (msg, type = "success") => {
// // // // //     setToast({ msg, type });
// // // // //     setTimeout(() => setToast(null), 3200);
// // // // //   };

// // // // //   /* ── ALL HANDLERS BELOW ARE 100% ORIGINAL — NOT TOUCHED ── */

// // // // //   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setSaving(true);
// // // // //     try {
// // // // //       const payload = cleanPayload(form);
// // // // //       if (editId) {
// // // // //         await axios.put(`${API_BASE}/${editId}`, payload);
// // // // //         showToast("Company updated successfully!");
// // // // //       } else {
// // // // //         await axios.post(API_BASE, payload);
// // // // //         showToast("Company created successfully!");
// // // // //       }
// // // // //       setForm(EMPTY_FORM);
// // // // //       setEditId(null);
// // // // //       setShowForm(false);
// // // // //       fetchCompanies();
// // // // //     } catch (err) {
// // // // //       console.error(err.response?.data);
// // // // //       showToast(err.response?.data?.message || "Something went wrong.", "error");
// // // // //     } finally {
// // // // //       setSaving(false);
// // // // //     }
// // // // //   };

// // // // //   const handleEdit = (company) => {
// // // // //     setForm(cleanPayload(company));
// // // // //     setEditId(company.id);
// // // // //     setShowForm(true);
// // // // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // // // //   };

// // // // //   const handleCancel = () => {
// // // // //     setForm(EMPTY_FORM);
// // // // //     setEditId(null);
// // // // //     setShowForm(false);
// // // // //   };

// // // // //   const handleSearch = async () => {
// // // // //     setIsSearching(true);
// // // // //     try {
// // // // //       const res = await axios.get("/api/skill/search", {
// // // // //         params: {
// // // // //           keyWord: searchKeyword,
// // // // //           yrOfExp: searchExp
// // // // //         }
// // // // //       });
// // // // //       setSearchResults(Array.isArray(res.data) ? res.data : []);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       showToast("Search failed", "error");
// // // // //     } finally {
// // // // //       setIsSearching(false);
// // // // //     }
// // // // //   };

// // // // //   const getInitials = (name = "") =>
// // // // //     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

// // // // //   return (
// // // // //     <div className="cd-root">

// // // // //       {/* ── Toast notification ── */}
// // // // //       {toast && (
// // // // //         <div className={`cd-toast cd-toast--${toast.type}`}>
// // // // //           <span className="cd-toast-dot" />
// // // // //           {toast.msg}
// // // // //         </div>
// // // // //       )}

// // // // //       {/* ── Hero banner ── */}
// // // // //       <div className="cd-hero">
// // // // //         <div className="cd-hero-content">
// // // // //           <h1 className="cd-hero-title">Company Management</h1>
// // // // //           <p className="cd-hero-sub">
// // // // //             Manage your organisation's profile, contact details, and HR information
// // // // //           </p>

// // // // //           <div className="cd-hero-actions">

// // // // //             {/* ── ORIGINAL: Add Company / Cancel toggle ── */}
// // // // //             {!showForm ? (
// // // // //               <button
// // // // //                 className="cd-btn cd-btn--primary"
// // // // //                 onClick={() => { setShowForm(true); setShowSearch(false); }}
// // // // //               >
// // // // //                 + Add Company
// // // // //               </button>
// // // // //             ) : (
// // // // //               <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
// // // // //                 ✕ Cancel
// // // // //               </button>
// // // // //             )}

// // // // //             {/* ── NEW: Edit Company button ──
// // // // //                 Clicking scrolls to the table so user can click ✏️ Edit on any row.
// // // // //                 If form is already open in edit mode it shows "✕ Cancel Edit" instead. */}
// // // // //             {!showForm && (
// // // // //               <button
// // // // //                 className="cd-btn cd-btn--ghost-white"
// // // // //                 onClick={() => {
// // // // //                   setShowSearch(false);
// // // // //                   // scroll to table so user can pick a company row to edit
// // // // //                   document.querySelector(".cd-table-wrap")?.scrollIntoView({ behavior: "smooth" });
// // // // //                 }}
// // // // //               >
// // // // //                 ✏️ Edit Company
// // // // //               </button>
// // // // //             )}
// // // // //             {showForm && editId && (
// // // // //               <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
// // // // //                 ✕ Cancel Edit
// // // // //               </button>
// // // // //             )}

// // // // //             {/* ── NEW: Search toggle button ── */}
// // // // //             <button
// // // // //               className="cd-btn cd-btn--ghost-white"
// // // // //               onClick={() => setShowSearch((prev) => !prev)}
// // // // //             >
// // // // //               {showSearch ? "✕ Close Search" : "🔍 Search"}
// // // // //             </button>

// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ── Body content ── */}
// // // // //       <div className="cd-body">

// // // // //         {/* ── Add / Edit Form — ORIGINAL, NOT TOUCHED ── */}
// // // // //         {showForm && (
// // // // //           <div className="cd-form-card">
// // // // //             <div className="cd-form-header">
// // // // //               <div>
// // // // //                 <div className="cd-form-header-title">
// // // // //                   {editId ? "Edit Company" : "New Company"}
// // // // //                 </div>
// // // // //               </div>
// // // // //               <button className="cd-close-btn" onClick={handleCancel}>✕</button>
// // // // //             </div>

// // // // //             <form className="cd-form" onSubmit={handleSubmit}>
// // // // //               {FIELDS.map((f) => (
// // // // //                 <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
// // // // //                   <label className="cd-label">
// // // // //                     <span className="cd-label-icon">{f.icon}</span>
// // // // //                     {f.label}
// // // // //                     {f.required && <span className="cd-required"> *</span>}
// // // // //                   </label>
// // // // //                   {f.full ? (
// // // // //                     <textarea
// // // // //                       name={f.name}
// // // // //                       className="cd-input cd-textarea"
// // // // //                       placeholder={f.placeholder}
// // // // //                       value={form[f.name]}
// // // // //                       onChange={handleChange}
// // // // //                       rows={2}
// // // // //                     />
// // // // //                   ) : (
// // // // //                     <input
// // // // //                       name={f.name}
// // // // //                       className="cd-input"
// // // // //                       placeholder={f.placeholder}
// // // // //                       value={form[f.name]}
// // // // //                       onChange={handleChange}
// // // // //                       required={f.required}
// // // // //                     />
// // // // //                   )}
// // // // //                 </div>
// // // // //               ))}

// // // // //               <div className="cd-form-actions">
// // // // //                 <button
// // // // //                   type="submit"
// // // // //                   className="cd-btn cd-btn--blue cd-btn--lg"
// // // // //                   disabled={saving}
// // // // //                 >
// // // // //                   {saving
// // // // //                     ? <><span className="cd-spinner" /> Saving…</>
// // // // //                     : editId ? "💾  Update Company" : "✓  Create Company"}
// // // // //                 </button>
// // // // //                 <button
// // // // //                   type="button"
// // // // //                   className="cd-btn cd-btn--ghost"
// // // // //                   onClick={handleCancel}
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>
// // // // //               </div>
// // // // //             </form>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* ── Search bar — ORIGINAL inputs & logic, now toggled by header button ── */}
// // // // //         {showSearch && (
// // // // //           <div className="cd-search-bar">
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Search by skill (e.g. Python)"
// // // // //               value={searchKeyword}
// // // // //               onChange={(e) => setSearchKeyword(e.target.value)}
// // // // //               className="cd-input"
// // // // //             />
// // // // //             <input
// // // // //               type="number"
// // // // //               placeholder="Years of Experience"
// // // // //               value={searchExp}
// // // // //               onChange={(e) => setSearchExp(e.target.value)}
// // // // //               className="cd-input"
// // // // //             />
// // // // //             <button className="cd-btn cd-btn--blue" onClick={handleSearch}>
// // // // //               🔍 Search
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* ── Section heading ── */}
// // // // //         <div className="cd-section-header">
// // // // //           <span className="cd-section-title">Registered Companies</span>
// // // // //         </div>

// // // // //         {/* ── States: loading / empty / table — ORIGINAL, NOT TOUCHED ── */}
// // // // //         {loading ? (
// // // // //           <div className="cd-loading">
// // // // //             <div className="cd-loading-ring" />
// // // // //             <span>Loading companies…</span>
// // // // //           </div>
// // // // //         ) : companies.length === 0 ? (
// // // // //           <div className="cd-empty">
// // // // //             <div className="cd-empty-icon">🏢</div>
// // // // //             <div className="cd-empty-title">No companies yet</div>
// // // // //             <div className="cd-empty-sub">Click "Add Company" in the header to create your first entry</div>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="cd-table-wrap">
// // // // //             <table className="cd-table">
// // // // //               <thead>
// // // // //                 <tr>
// // // // //                   <th>Id</th>
// // // // //                   <th>Company</th>
// // // // //                   <th>Email</th>
// // // // //                   <th>Phone</th>
// // // // //                   <th>HR Name</th>
// // // // //                   <th>Website</th>
// // // // //                   <th>Action</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {companies.map((c, i) => (
// // // // //                   <tr key={c.id || i} className="cd-tr">
// // // // //                     <td className="cd-td-num">{i + 1}</td>
// // // // //                     <td>
// // // // //                       <div className="cd-name-cell">
// // // // //                         <div className="cd-avatar">{getInitials(c.companyName)}</div>
// // // // //                         <div>
// // // // //                           <div className="cd-co-name">{c.companyName}</div>
// // // // //                           <div className="cd-co-desc">{c.companyDescription || "—"}</div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
// // // // //                     <td>{c.primaryPhoneNumber || "—"}</td>
// // // // //                     <td>
// // // // //                       <div className="cd-hr-cell">
// // // // //                         <span className="cd-hr-name">{c.hrName || "—"}</span>
// // // // //                         {c.hrContactNumber && (
// // // // //                           <span className="cd-hr-num">{c.hrContactNumber}</span>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td>
// // // // //                       {c.websiteUrl
// // // // //                         ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
// // // // //                         : "—"}
// // // // //                     </td>
// // // // //                     <td>
// // // // //                       {/* ── ORIGINAL ✏️ Edit button — calls handleEdit which opens the filled form ── */}
// // // // //                       <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
// // // // //                         ✏️ Edit
// // // // //                       </button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* ── Search results — ORIGINAL, NOT TOUCHED ── */}
// // // // //         {isSearching ? (
// // // // //           <div className="cd-loading">
// // // // //             <div className="cd-loading-ring" />
// // // // //             <span>Searching…</span>
// // // // //           </div>
// // // // //         ) : searchResults.length > 0 ? (
// // // // //           <div className="cd-table-wrap">
// // // // //             <h3>Search Results</h3>
// // // // //             <table className="cd-table">
// // // // //               <thead>
// // // // //                 <tr>
// // // // //                   <th>User ID</th>
// // // // //                   <th>Name</th>
// // // // //                   <th>Department</th>
// // // // //                   <th>Designation</th>
// // // // //                   <th>Skill</th>
// // // // //                   <th>Experience</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {searchResults.map((user, i) => (
// // // // //                   <tr key={i}>
// // // // //                     <td>{user.userId}</td>
// // // // //                     <td>{user.username}</td>
// // // // //                     <td>{user.firstName} {user.middleName || ""} {user.lastName}</td>
// // // // //                     <td>{user.gender}</td>
// // // // //                     <td>{user.dob ? `${user.dob[2]}-${user.dob[1]}-${user.dob[0]}` : "—"}</td>
// // // // //                     <td>{user.departmentName}</td>
// // // // //                     <td>{user.designationName}</td>
// // // // //                     <td>{user.skillName}</td>
// // // // //                     <td>{user.yearsOfExperience} yrs</td>
// // // // //                     <td>{user.nationality}</td>
// // // // //                     <td>{user.maritalStatus}</td>
// // // // //                     <td>{user.bloodGroup}</td>
// // // // //                     <td>{user.address1}</td>
// // // // //                     <td>{user.skillDescription}</td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         ) : null}

// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import "./CompanyDetails.css";

// // // // const API_BASE = "/api/comapanyDetails";

// // // // const EMPTY_FORM = {
// // // //   companyName: "", address: "", companyDescription: "",
// // // //   linkedinUrl: "", websiteUrl: "", primaryPhoneNumber: "",
// // // //   secondaryPhoneNumber: "", primaryEmail: "", secondaryEmail: "",
// // // //   hrName: "", hrContactNumber: "",
// // // // };

// // // // const FIELDS = [
// // // //   { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",         icon: "🏢", required: true },
// // // //   { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru",      icon: "📍" },
// // // //   { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",        icon: "📝", full: true },
// // // //   { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",        icon: "🌐" },
// // // //   { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
// // // //   { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",               icon: "📞" },
// // // //   { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",               icon: "📞" },
// // // //   { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",                icon: "✉️" },
// // // //   { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",                  icon: "✉️" },
// // // //   { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",                   icon: "👤" },
// // // //   { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",                icon: "📱" },
// // // // ];

// // // // const cleanPayload = (data) => ({
// // // //   companyName:          data.companyName          || "",
// // // //   address:              data.address              || "",
// // // //   companyDescription:   data.companyDescription   || "",
// // // //   linkedinUrl:          data.linkedinUrl          || "",
// // // //   websiteUrl:           data.websiteUrl           || "",
// // // //   primaryPhoneNumber:   data.primaryPhoneNumber   || "",
// // // //   secondaryPhoneNumber: data.secondaryPhoneNumber || "",
// // // //   primaryEmail:         data.primaryEmail         || "",
// // // //   secondaryEmail:       data.secondaryEmail       || "",
// // // //   hrName:               data.hrName               || "",
// // // //   hrContactNumber:      data.hrContactNumber      || "",
// // // // });

// // // // export default function CompanyDetails() {
// // // //   const [companies,     setCompanies]     = useState([]);
// // // //   const [form,          setForm]          = useState(EMPTY_FORM);
// // // //   const [editId,        setEditId]        = useState(null);
// // // //   const [loading,       setLoading]       = useState(true);
// // // //   const [saving,        setSaving]        = useState(false);
// // // //   const [toast,         setToast]         = useState(null);
// // // //   const [showForm,      setShowForm]      = useState(false);
// // // //   const [searchKeyword, setSearchKeyword] = useState("");
// // // //   const [searchExp,     setSearchExp]     = useState("");
// // // //   const [searchResults, setSearchResults] = useState([]);
// // // //   const [isSearching,   setIsSearching]   = useState(false);

// // // //   // NEW: controls search bar visibility
// // // //   const [showSearch,    setShowSearch]    = useState(false);
// // // //   // NEW: controls companies table visibility (shown only when Edit Company clicked)
// // // //   const [showTable,     setShowTable]     = useState(false);

// // // //   /* ── GET ── */
// // // //   const fetchCompanies = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await axios.get(API_BASE);
// // // //       setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
// // // //     } catch { setCompanies([]); }
// // // //     finally { setLoading(false); }
// // // //   };

// // // //   useEffect(() => { fetchCompanies(); }, []);

// // // //   const showToast = (msg, type = "success") => {
// // // //     setToast({ msg, type });
// // // //     setTimeout(() => setToast(null), 3200);
// // // //   };

// // // //   /* ── ALL ORIGINAL HANDLERS — NOT TOUCHED ── */

// // // //   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setSaving(true);
// // // //     try {
// // // //       const payload = cleanPayload(form);
// // // //       if (editId) {
// // // //         await axios.put(`${API_BASE}/${editId}`, payload);
// // // //         showToast("Company updated successfully!");
// // // //       } else {
// // // //         await axios.post(API_BASE, payload);
// // // //         showToast("Company created successfully!");
// // // //       }
// // // //       setForm(EMPTY_FORM);
// // // //       setEditId(null);
// // // //       setShowForm(false);
// // // //       setShowTable(false);
// // // //       fetchCompanies();
// // // //     } catch (err) {
// // // //       console.error(err.response?.data);
// // // //       showToast(err.response?.data?.message || "Something went wrong.", "error");
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   const handleEdit = (company) => {
// // // //     setForm(cleanPayload(company));
// // // //     setEditId(company.id);
// // // //     setShowForm(true);
// // // //     setShowTable(false); // hide table once a company is picked for editing
// // // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // // //   };

// // // //   const handleCancel = () => {
// // // //     setForm(EMPTY_FORM);
// // // //     setEditId(null);
// // // //     setShowForm(false);
// // // //   };

// // // //   const handleSearch = async () => {
// // // //     setIsSearching(true);
// // // //     try {
// // // //       const res = await axios.get("/api/skill/search", {
// // // //         params: {
// // // //           keyWord: searchKeyword,
// // // //           yrOfExp: searchExp
// // // //         }
// // // //       });
// // // //       setSearchResults(Array.isArray(res.data) ? res.data : []);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       showToast("Search failed", "error");
// // // //     } finally {
// // // //       setIsSearching(false);
// // // //     }
// // // //   };

// // // //   const getInitials = (name = "") =>
// // // //     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

// // // //   return (
// // // //     <div className="cd-root">

// // // //       {/* ── Toast ── */}
// // // //       {toast && (
// // // //         <div className={`cd-toast cd-toast--${toast.type}`}>
// // // //           <span className="cd-toast-dot" />
// // // //           {toast.msg}
// // // //         </div>
// // // //       )}

// // // //       {/* ── Hero banner ── */}
// // // //       <div className="cd-hero">
// // // //         <div className="cd-hero-content">
// // // //           <h1 className="cd-hero-title">Company Management</h1>
// // // //           <p className="cd-hero-sub">
// // // //             Manage your organisation's profile, contact details, and HR information
// // // //           </p>

// // // //           <div className="cd-hero-actions">

// // // //             {/* Add Company — original behaviour */}
// // // //             {!showForm ? (
// // // //               <button
// // // //                 className="cd-btn cd-btn--primary"
// // // //                 onClick={() => { setShowForm(true); setShowSearch(false); setShowTable(false); }}
// // // //               >
// // // //                 + Add Company
// // // //               </button>
// // // //             ) : (
// // // //               <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
// // // //                 ✕ Cancel
// // // //               </button>
// // // //             )}

// // // //             {/* NEW: Edit Company — toggles the companies table so user picks a row */}
// // // //             <button
// // // //               className="cd-btn cd-btn--ghost-white"
// // // //               onClick={() => {
// // // //                 setShowTable((prev) => !prev);
// // // //                 setShowSearch(false);
// // // //                 setShowForm(false);
// // // //                 setForm(EMPTY_FORM);
// // // //                 setEditId(null);
// // // //               }}
// // // //             >
// // // //               {showTable ? "✕ Close" : "✏️ Edit Company"}
// // // //             </button>

// // // //             {/* NEW: Search — toggles the search bar */}
// // // //             <button
// // // //               className="cd-btn cd-btn--ghost-white"
// // // //               onClick={() => { setShowSearch((prev) => !prev); setShowTable(false); }}
// // // //             >
// // // //               {showSearch ? "✕ Close Search" : "🔍 Search"}
// // // //             </button>

// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* ── Body ── */}
// // // //       <div className="cd-body">

// // // //         {/* ── Add / Edit Form — ORIGINAL, NOT TOUCHED ── */}
// // // //         {showForm && (
// // // //           <div className="cd-form-card">
// // // //             <div className="cd-form-header">
// // // //               <div>
// // // //                 <div className="cd-form-header-title">
// // // //                   {editId ? "Edit Company" : "New Company"}
// // // //                 </div>
// // // //               </div>
// // // //               <button className="cd-close-btn" onClick={handleCancel}>✕</button>
// // // //             </div>

// // // //             <form className="cd-form" onSubmit={handleSubmit}>
// // // //               {FIELDS.map((f) => (
// // // //                 <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
// // // //                   <label className="cd-label">
// // // //                     <span className="cd-label-icon">{f.icon}</span>
// // // //                     {f.label}
// // // //                     {f.required && <span className="cd-required"> *</span>}
// // // //                   </label>
// // // //                   {f.full ? (
// // // //                     <textarea
// // // //                       name={f.name}
// // // //                       className="cd-input cd-textarea"
// // // //                       placeholder={f.placeholder}
// // // //                       value={form[f.name]}
// // // //                       onChange={handleChange}
// // // //                       rows={2}
// // // //                     />
// // // //                   ) : (
// // // //                     <input
// // // //                       name={f.name}
// // // //                       className="cd-input"
// // // //                       placeholder={f.placeholder}
// // // //                       value={form[f.name]}
// // // //                       onChange={handleChange}
// // // //                       required={f.required}
// // // //                     />
// // // //                   )}
// // // //                 </div>
// // // //               ))}

// // // //               <div className="cd-form-actions">
// // // //                 <button
// // // //                   type="submit"
// // // //                   className="cd-btn cd-btn--blue cd-btn--lg"
// // // //                   disabled={saving}
// // // //                 >
// // // //                   {saving
// // // //                     ? <><span className="cd-spinner" /> Saving…</>
// // // //                     : editId ? "💾  Update Company" : "✓  Create Company"}
// // // //                 </button>
// // // //                 <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>
// // // //                   Cancel
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         )}

// // // //         {/* ── Search bar — toggled by header 🔍 button ── */}
// // // //         {showSearch && (
// // // //           <div className="cd-search-bar">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Search by skill (e.g. Python)"
// // // //               value={searchKeyword}
// // // //               onChange={(e) => setSearchKeyword(e.target.value)}
// // // //               className="cd-input"
// // // //             />
// // // //             <input
// // // //               type="number"
// // // //               placeholder="Years of Experience"
// // // //               value={searchExp}
// // // //               onChange={(e) => setSearchExp(e.target.value)}
// // // //               className="cd-input"
// // // //             />
// // // //             <button className="cd-btn cd-btn--blue" onClick={handleSearch}>
// // // //               🔍 Search
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {/* ── Companies table — shown ONLY when Edit Company is clicked ── */}
// // // //         {showTable && (
// // // //           <>
// // // //             <div className="cd-section-header">
// // // //               <span className="cd-section-title">Select a Company to Edit</span>
// // // //             </div>

// // // //             {loading ? (
// // // //               <div className="cd-loading">
// // // //                 <div className="cd-loading-ring" />
// // // //                 <span>Loading companies…</span>
// // // //               </div>
// // // //             ) : companies.length === 0 ? (
// // // //               <div className="cd-empty">
// // // //                 <div className="cd-empty-icon">🏢</div>
// // // //                 <div className="cd-empty-title">No companies yet</div>
// // // //                 <div className="cd-empty-sub">Click "Add Company" to create your first entry</div>
// // // //               </div>
// // // //             ) : (
// // // //               <div className="cd-table-wrap">
// // // //                 <table className="cd-table">
// // // //                   <thead>
// // // //                     <tr>
// // // //                       <th>Id</th>
// // // //                       <th>Company</th>
// // // //                       <th>Email</th>
// // // //                       <th>Phone</th>
// // // //                       <th>HR Name</th>
// // // //                       <th>Website</th>
// // // //                       <th>Action</th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody>
// // // //                     {companies.map((c, i) => (
// // // //                       <tr key={c.id || i} className="cd-tr">
// // // //                         <td className="cd-td-num">{i + 1}</td>
// // // //                         <td>
// // // //                           <div className="cd-name-cell">
// // // //                             <div className="cd-avatar">{getInitials(c.companyName)}</div>
// // // //                             <div>
// // // //                               <div className="cd-co-name">{c.companyName}</div>
// // // //                               <div className="cd-co-desc">{c.companyDescription || "—"}</div>
// // // //                             </div>
// // // //                           </div>
// // // //                         </td>
// // // //                         <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
// // // //                         <td>{c.primaryPhoneNumber || "—"}</td>
// // // //                         <td>
// // // //                           <div className="cd-hr-cell">
// // // //                             <span className="cd-hr-name">{c.hrName || "—"}</span>
// // // //                             {c.hrContactNumber && (
// // // //                               <span className="cd-hr-num">{c.hrContactNumber}</span>
// // // //                             )}
// // // //                           </div>
// // // //                         </td>
// // // //                         <td>
// // // //                           {c.websiteUrl
// // // //                             ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
// // // //                             : "—"}
// // // //                         </td>
// // // //                         <td>
// // // //                           <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
// // // //                             ✏️ Edit
// // // //                           </button>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         )}

// // // //         {/* ── Search results — ORIGINAL, NOT TOUCHED ── */}
// // // //         {isSearching ? (
// // // //           <div className="cd-loading">
// // // //             <div className="cd-loading-ring" />
// // // //             <span>Searching…</span>
// // // //           </div>
// // // //         ) : searchResults.length > 0 ? (
// // // //           <div className="cd-table-wrap">
// // // //             <h3>Search Results</h3>
// // // //             <table className="cd-table">
// // // //               <thead>
// // // //                 <tr>
// // // //                   <th>User ID</th>
// // // //                   <th>Name</th>
// // // //                   <th>Department</th>
// // // //                   <th>Designation</th>
// // // //                   <th>Skill</th>
// // // //                   <th>Experience</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {searchResults.map((user, i) => (
// // // //                   <tr key={i}>
// // // //                     <td>{user.userId}</td>
// // // //                     <td>{user.username}</td>
// // // //                     <td>{user.firstName} {user.middleName || ""} {user.lastName}</td>
// // // //                     <td>{user.gender}</td>
// // // //                     <td>{user.dob ? `${user.dob[2]}-${user.dob[1]}-${user.dob[0]}` : "—"}</td>
// // // //                     <td>{user.departmentName}</td>
// // // //                     <td>{user.designationName}</td>
// // // //                     <td>{user.skillName}</td>
// // // //                     <td>{user.yearsOfExperience} yrs</td>
// // // //                     <td>{user.nationality}</td>
// // // //                     <td>{user.maritalStatus}</td>
// // // //                     <td>{user.bloodGroup}</td>
// // // //                     <td>{user.address1}</td>
// // // //                     <td>{user.skillDescription}</td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         ) : null}

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import "./CompanyDetails.css";

// // // const API_BASE = "/api/comapanyDetails";

// // // const EMPTY_FORM = {
// // //   companyName: "", address: "", companyDescription: "",
// // //   linkedinUrl: "", websiteUrl: "", primaryPhoneNumber: "",
// // //   secondaryPhoneNumber: "", primaryEmail: "", secondaryEmail: "",
// // //   hrName: "", hrContactNumber: "",
// // // };

// // // const FIELDS = [
// // //   { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",         icon: "🏢", required: true },
// // //   { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru",      icon: "📍" },
// // //   { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",        icon: "📝", full: true },
// // //   { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",        icon: "🌐" },
// // //   { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
// // //   { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",               icon: "📞" },
// // //   { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",               icon: "📞" },
// // //   { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",                icon: "✉️" },
// // //   { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",                  icon: "✉️" },
// // //   { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",                   icon: "👤" },
// // //   { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",                icon: "📱" },
// // // ];

// // // const cleanPayload = (data) => ({
// // //   companyName:          data.companyName          || "",
// // //   address:              data.address              || "",
// // //   companyDescription:   data.companyDescription   || "",
// // //   linkedinUrl:          data.linkedinUrl          || "",
// // //   websiteUrl:           data.websiteUrl           || "",
// // //   primaryPhoneNumber:   data.primaryPhoneNumber   || "",
// // //   secondaryPhoneNumber: data.secondaryPhoneNumber || "",
// // //   primaryEmail:         data.primaryEmail         || "",
// // //   secondaryEmail:       data.secondaryEmail       || "",
// // //   hrName:               data.hrName               || "",
// // //   hrContactNumber:      data.hrContactNumber      || "",
// // // });

// // // export default function CompanyDetails() {
// // //   const [companies,     setCompanies]     = useState([]);
// // //   const [form,          setForm]          = useState(EMPTY_FORM);
// // //   const [editId,        setEditId]        = useState(null);
// // //   const [loading,       setLoading]       = useState(true);
// // //   const [saving,        setSaving]        = useState(false);
// // //   const [toast,         setToast]         = useState(null);
// // //   const [showForm,      setShowForm]      = useState(false);
// // //   const [searchKeyword, setSearchKeyword] = useState("");
// // //   const [searchExp,     setSearchExp]     = useState("");
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [isSearching,   setIsSearching]   = useState(false);
// // //   const [showSearch,    setShowSearch]    = useState(false);
// // //   const [showTable,     setShowTable]     = useState(false);

// // //   /* ── GET ── */
// // //   const fetchCompanies = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await axios.get(API_BASE);
// // //       setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
// // //     } catch { setCompanies([]); }
// // //     finally { setLoading(false); }
// // //   };

// // //   useEffect(() => { fetchCompanies(); }, []);

// // //   const showToast = (msg, type = "success") => {
// // //     setToast({ msg, type });
// // //     setTimeout(() => setToast(null), 3200);
// // //   };

// // //   /* ── ALL ORIGINAL HANDLERS — NOT TOUCHED ── */

// // //   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setSaving(true);
// // //     try {
// // //       const payload = cleanPayload(form);
// // //       if (editId) {
// // //         await axios.put(`${API_BASE}/${editId}`, payload);
// // //         showToast("Company updated successfully!");
// // //       } else {
// // //         await axios.post(API_BASE, payload);
// // //         showToast("Company created successfully!");
// // //       }
// // //       setForm(EMPTY_FORM);
// // //       setEditId(null);
// // //       setShowForm(false);
// // //       setShowTable(false);
// // //       fetchCompanies();
// // //     } catch (err) {
// // //       console.error(err.response?.data);
// // //       showToast(err.response?.data?.message || "Something went wrong.", "error");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   const handleEdit = (company) => {
// // //     setForm(cleanPayload(company));
// // //     setEditId(company.id);
// // //     setShowForm(true);
// // //     setShowTable(false);
// // //     window.scrollTo({ top: 0, behavior: "smooth" });
// // //   };

// // //   const handleCancel = () => {
// // //     setForm(EMPTY_FORM);
// // //     setEditId(null);
// // //     setShowForm(false);
// // //   };

// // //   const handleSearch = async () => {
// // //     setIsSearching(true);
// // //     try {
// // //       const res = await axios.get("/api/skill/search", {
// // //         params: { keyWord: searchKeyword, yrOfExp: searchExp }
// // //       });
// // //       setSearchResults(Array.isArray(res.data) ? res.data : []);
// // //     } catch (err) {
// // //       console.error(err);
// // //       showToast("Search failed", "error");
// // //     } finally {
// // //       setIsSearching(false);
// // //     }
// // //   };

// // //   const getInitials = (name = "") =>
// // //     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

// // //   /* ── Block Add if a company already exists ── */
// // //   const companyExists = companies.length > 0;

// // //   const handleAddClick = () => {
// // //     if (companyExists) {
// // //       showToast("A company already exists. You can only edit it.", "error");
// // //       return;
// // //     }
// // //     setShowForm(true);
// // //     setShowSearch(false);
// // //     setShowTable(false);
// // //   };

// // //   return (
// // //     <div className="cd-root">

// // //       {/* ── Toast ── */}
// // //       {toast && (
// // //         <div className={`cd-toast cd-toast--${toast.type}`}>
// // //           <span className="cd-toast-dot" />
// // //           {toast.msg}
// // //         </div>
// // //       )}

// // //       {/* ── Hero ── */}
// // //       <div className="cd-hero">
// // //         <div className="cd-hero-content">
// // //           <h1 className="cd-hero-title">Company Management</h1>
// // //           <p className="cd-hero-sub">
// // //             Manage your organisation's profile, contact details, and HR information
// // //           </p>

// // //           <div className="cd-hero-actions">

// // //             {/* Add Company */}
// // //             {!showForm ? (
// // //               <button
// // //                 className={`cd-btn ${companyExists ? "cd-btn--ghost-white cd-btn--disabled" : "cd-btn--primary"}`}
// // //                 onClick={handleAddClick}
// // //                 title={companyExists ? "A company already exists. Edit it instead." : ""}
// // //               >
// // //                 + Add Company
// // //               </button>
// // //             ) : (
// // //               <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
// // //                 ✕ Cancel
// // //               </button>
// // //             )}

// // //             {/* Edit Company */}
// // //             <button
// // //               className="cd-btn cd-btn--ghost-white"
// // //               onClick={() => {
// // //                 setShowTable((prev) => !prev);
// // //                 setShowSearch(false);
// // //                 setShowForm(false);
// // //                 setForm(EMPTY_FORM);
// // //                 setEditId(null);
// // //               }}
// // //             >
// // //               {showTable ? "✕ Close" : "✏️ Edit Company"}
// // //             </button>

// // //             {/* Search */}
// // //             <button
// // //               className="cd-btn cd-btn--ghost-white"
// // //               onClick={() => { setShowSearch((prev) => !prev); setShowTable(false); }}
// // //             >
// // //               {showSearch ? "✕ Close Search" : "🔍 Search"}
// // //             </button>

// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ── Body ── */}
// // //       <div className="cd-body">

// // //         {/* ── Add / Edit Form ── */}
// // //         {showForm && (
// // //           <div className="cd-form-card">
// // //             <div className="cd-form-header">
// // //               <div>
// // //                 <div className="cd-form-header-title">
// // //                   {editId ? "Edit Company" : "New Company"}
// // //                 </div>
// // //               </div>
// // //               <button className="cd-close-btn" onClick={handleCancel}>✕</button>
// // //             </div>

// // //             <form className="cd-form" onSubmit={handleSubmit}>
// // //               {FIELDS.map((f) => (
// // //                 <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
// // //                   <label className="cd-label">
// // //                     <span className="cd-label-icon">{f.icon}</span>
// // //                     {f.label}
// // //                     {f.required && <span className="cd-required"> *</span>}
// // //                   </label>
// // //                   {f.full ? (
// // //                     <textarea
// // //                       name={f.name}
// // //                       className="cd-input cd-textarea"
// // //                       placeholder={f.placeholder}
// // //                       value={form[f.name]}
// // //                       onChange={handleChange}
// // //                       rows={2}
// // //                     />
// // //                   ) : (
// // //                     <input
// // //                       name={f.name}
// // //                       className="cd-input"
// // //                       placeholder={f.placeholder}
// // //                       value={form[f.name]}
// // //                       onChange={handleChange}
// // //                       required={f.required}
// // //                     />
// // //                   )}
// // //                 </div>
// // //               ))}

// // //               <div className="cd-form-actions">
// // //                 <button
// // //                   type="submit"
// // //                   className="cd-btn cd-btn--blue cd-btn--lg"
// // //                   disabled={saving}
// // //                 >
// // //                   {saving
// // //                     ? <><span className="cd-spinner" /> Saving…</>
// // //                     : editId ? "💾  Update Company" : "✓  Create Company"}
// // //                 </button>
// // //                 <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         )}

// // //         {/* ── Search bar ── */}
// // //         {showSearch && (
// // //           <div className="cd-search-bar">
// // //             <input
// // //               type="text"
// // //               placeholder="Search by skill (e.g. Python)"
// // //               value={searchKeyword}
// // //               onChange={(e) => setSearchKeyword(e.target.value)}
// // //               className="cd-input"
// // //             />
// // //             <input
// // //               type="number"
// // //               placeholder="Years of Experience"
// // //               value={searchExp}
// // //               onChange={(e) => setSearchExp(e.target.value)}
// // //               className="cd-input"
// // //             />
// // //             <button className="cd-btn cd-btn--blue" onClick={handleSearch}>
// // //               🔍 Search
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* ── Companies table — shown only when Edit Company clicked ── */}
// // //         {showTable && (
// // //           <>
// // //             <div className="cd-section-header">
// // //               <span className="cd-section-title">Select a Company to Edit</span>
// // //             </div>

// // //             {loading ? (
// // //               <div className="cd-loading">
// // //                 <div className="cd-loading-ring" />
// // //                 <span>Loading companies…</span>
// // //               </div>
// // //             ) : companies.length === 0 ? (
// // //               <div className="cd-empty">
// // //                 <div className="cd-empty-icon">🏢</div>
// // //                 <div className="cd-empty-title">No companies yet</div>
// // //                 <div className="cd-empty-sub">Click "Add Company" to create your first entry</div>
// // //               </div>
// // //             ) : (
// // //               <div className="cd-table-wrap">
// // //                 <table className="cd-table">
// // //                   <thead>
// // //                     <tr>
// // //                       <th>Id</th>
// // //                       <th>Company</th>
// // //                       <th>Email</th>
// // //                       <th>Phone</th>
// // //                       <th>HR Name</th>
// // //                       <th>Website</th>
// // //                       <th>Action</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody>
// // //                     {companies.map((c, i) => (
// // //                       <tr key={c.id || i} className="cd-tr">
// // //                         <td className="cd-td-num">{i + 1}</td>
// // //                         <td>
// // //                           <div className="cd-name-cell">
// // //                             <div className="cd-avatar">{getInitials(c.companyName)}</div>
// // //                             <div>
// // //                               <div className="cd-co-name">{c.companyName}</div>
// // //                               <div className="cd-co-desc">{c.companyDescription || "—"}</div>
// // //                             </div>
// // //                           </div>
// // //                         </td>
// // //                         <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
// // //                         <td>{c.primaryPhoneNumber || "—"}</td>
// // //                         <td>
// // //                           <div className="cd-hr-cell">
// // //                             <span className="cd-hr-name">{c.hrName || "—"}</span>
// // //                             {c.hrContactNumber && (
// // //                               <span className="cd-hr-num">{c.hrContactNumber}</span>
// // //                             )}
// // //                           </div>
// // //                         </td>
// // //                         <td>
// // //                           {c.websiteUrl
// // //                             ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
// // //                             : "—"}
// // //                         </td>
// // //                         <td>
// // //                           <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
// // //                             ✏️ Edit
// // //                           </button>
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}

// // //         {/* ── Search results — wide table with horizontal scroll ── */}
// // //         {isSearching ? (
// // //           <div className="cd-loading">
// // //             <div className="cd-loading-ring" />
// // //             <span>Searching…</span>
// // //           </div>
// // //         ) : searchResults.length > 0 ? (
// // //           <>
// // //             <div className="cd-section-header">
// // //               <span className="cd-section-title">Search Results</span>
// // //               <span className="cd-count-badge">{searchResults.length} found</span>
// // //             </div>
// // //             {/* cd-table--wide forces min-width so wide table scrolls horizontally */}
// // //             <div className="cd-table-wrap">
// // //               <table className="cd-table cd-table--wide">
// // //                 <thead>
// // //                   <tr>
// // //                     <th>#</th>
// // //                     <th>User ID</th>
// // //                     <th>Username</th>
// // //                     <th>Full Name</th>
// // //                     <th>Gender</th>
// // //                     <th>DOB</th>
// // //                     <th>Department</th>
// // //                     <th>Designation</th>
// // //                     <th>Skill</th>
// // //                     <th>Experience</th>
// // //                     <th>Nationality</th>
// // //                     <th>Marital Status</th>
// // //                     <th>Blood Group</th>
// // //                     <th>Address</th>
// // //                     <th>Skill Description</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {searchResults.map((user, i) => (
// // //                     <tr key={i} className="cd-tr">
// // //                       <td className="cd-td-num">{i + 1}</td>
// // //                       <td>{user.userId}</td>
// // //                       <td className="cd-td-blue">{user.username}</td>
// // //                       <td>
// // //                         <div className="cd-name-cell">
// // //                           <div className="cd-avatar">
// // //                             {getInitials(`${user.firstName || ""} ${user.lastName || ""}`)}
// // //                           </div>
// // //                           <span className="cd-co-name">
// // //                             {user.firstName} {user.middleName || ""} {user.lastName}
// // //                           </span>
// // //                         </div>
// // //                       </td>
// // //                       <td>{user.gender || "—"}</td>
// // //                       <td>
// // //                         {user.dob
// // //                           ? `${user.dob[2]}-${user.dob[1]}-${user.dob[0]}`
// // //                           : "—"}
// // //                       </td>
// // //                       <td>{user.departmentName || "—"}</td>
// // //                       <td>{user.designationName || "—"}</td>
// // //                       <td>{user.skillName || "—"}</td>
// // //                       <td>{user.yearsOfExperience} yrs</td>
// // //                       <td>{user.nationality || "—"}</td>
// // //                       <td>{user.maritalStatus || "—"}</td>
// // //                       <td>{user.bloodGroup || "—"}</td>
// // //                       <td className="cd-td-wrap">{user.address1 || "—"}</td>
// // //                       <td className="cd-td-wrap">{user.skillDescription || "—"}</td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </>
// // //         ) : null}

// // //       </div>
// // //     </div>
// // //   );
// // // }



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
// //   { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",         icon: "🏢", required: true },
// //   { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru",      icon: "📍" },
// //   { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",        icon: "📝", full: true },
// //   { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",        icon: "🌐" },
// //   { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
// //   { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",               icon: "📞" },
// //   { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",               icon: "📞" },
// //   { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",                icon: "✉️" },
// //   { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",                  icon: "✉️" },
// //   { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",                   icon: "👤" },
// //   { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",                icon: "📱" },
// // ];

// // const cleanPayload = (data) => ({
// //   companyName:          data.companyName          || "",
// //   address:              data.address              || "",
// //   companyDescription:   data.companyDescription   || "",
// //   linkedinUrl:          data.linkedinUrl          || "",
// //   websiteUrl:           data.websiteUrl           || "",
// //   primaryPhoneNumber:   data.primaryPhoneNumber   || "",
// //   secondaryPhoneNumber: data.secondaryPhoneNumber || "",
// //   primaryEmail:         data.primaryEmail         || "",
// //   secondaryEmail:       data.secondaryEmail       || "",
// //   hrName:               data.hrName               || "",
// //   hrContactNumber:      data.hrContactNumber      || "",
// // });

// // export default function CompanyDetails() {
// //   const [companies,     setCompanies]     = useState([]);
// //   const [form,          setForm]          = useState(EMPTY_FORM);
// //   const [editId,        setEditId]        = useState(null);
// //   const [loading,       setLoading]       = useState(true);
// //   const [saving,        setSaving]        = useState(false);
// //   const [toast,         setToast]         = useState(null);
// //   const [showForm,      setShowForm]      = useState(false);
// //   const [searchKeyword, setSearchKeyword] = useState("");
// //   const [searchExp,     setSearchExp]     = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [isSearching,   setIsSearching]   = useState(false);
// //   const [showSearch,    setShowSearch]    = useState(false);
// //   const [showTable,     setShowTable]     = useState(false);
  
// //   // NEW: State for selected user for resume creation
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [creatingResume, setCreatingResume] = useState(false);

// //   /* ── GET ── */
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

// //   /* ── ALL ORIGINAL HANDLERS ── */

// //   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);
// //     try {
// //       const payload = cleanPayload(form);
// //       if (editId) {
// //         await axios.put(`${API_BASE}/${editId}`, payload);
// //         showToast("Company updated successfully!");
// //       } else {
// //         await axios.post(API_BASE, payload);
// //         showToast("Company created successfully!");
// //       }
// //       setForm(EMPTY_FORM);
// //       setEditId(null);
// //       setShowForm(false);
// //       setShowTable(false);
// //       fetchCompanies();
// //     } catch (err) {
// //       console.error(err.response?.data);
// //       showToast(err.response?.data?.message || "Something went wrong.", "error");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const handleEdit = (company) => {
// //     setForm(cleanPayload(company));
// //     setEditId(company.id);
// //     setShowForm(true);
// //     setShowTable(false);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const handleCancel = () => {
// //     setForm(EMPTY_FORM);
// //     setEditId(null);
// //     setShowForm(false);
// //   };

// //   const handleSearch = async () => {
// //     setIsSearching(true);
// //     setSelectedUser(null); // Clear selected user when new search is performed
// //     try {
// //       const res = await axios.get("/api/skill/search", {
// //         params: { keyWord: searchKeyword, yrOfExp: searchExp }
// //       });
// //       setSearchResults(Array.isArray(res.data) ? res.data : []);
// //     } catch (err) {
// //       console.error(err);
// //       showToast("Search failed", "error");
// //     } finally {
// //       setIsSearching(false);
// //     }
// //   };

// //   // NEW: Handle user selection from search results
// //   const handleSelectUser = (user) => {
// //     setSelectedUser(user);
// //     showToast(`Selected: ${user.firstName} ${user.lastName}`, "success");
// //   };

// //   // NEW: Handle resume creation
// //   const handleCreateResume = async () => {
// //     if (!selectedUser) {
// //       showToast("Please select a user from search results first", "error");
// //       return;
// //     }

// //     setCreatingResume(true);
// //     try {
// //       // Prepare resume data
// //       const resumeData = {
// //         userId: selectedUser.userId,
// //         username: selectedUser.username,
// //         firstName: selectedUser.firstName,
// //         middleName: selectedUser.middleName,
// //         lastName: selectedUser.lastName,
// //         email: selectedUser.email || selectedUser.primaryEmail,
// //         phone: selectedUser.phoneNumber || selectedUser.primaryPhoneNumber,
// //         department: selectedUser.departmentName,
// //         designation: selectedUser.designationName,
// //         skills: [
// //           {
// //             skillName: selectedUser.skillName,
// //             yearsOfExperience: selectedUser.yearsOfExperience,
// //             skillDescription: selectedUser.skillDescription
// //           }
// //         ],
// //         address: selectedUser.address1,
// //         nationality: selectedUser.nationality,
// //         maritalStatus: selectedUser.maritalStatus,
// //         bloodGroup: selectedUser.bloodGroup,
// //         dateOfBirth: selectedUser.dob,
// //         gender: selectedUser.gender
// //       };

// //       // Call API to create resume
// //       const response = await axios.post("/api/resume/create", resumeData);
      
// //       if (response.data && response.data.resumeId) {
// //         showToast(`Resume created successfully for ${selectedUser.firstName} ${selectedUser.lastName}!`, "success");
        
// //         // Optionally, open resume in new tab or download
// //         if (response.data.resumeUrl) {
// //           window.open(response.data.resumeUrl, '_blank');
// //         }
        
// //         // Clear selected user after successful creation
// //         setSelectedUser(null);
// //       } else {
// //         showToast("Resume created but no URL returned", "info");
// //       }
// //     } catch (err) {
// //       console.error("Error creating resume:", err);
// //       showToast(err.response?.data?.message || "Failed to create resume", "error");
// //     } finally {
// //       setCreatingResume(false);
// //     }
// //   };

// //   const getInitials = (name = "") =>
// //     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

// //   /* ── Block Add if a company already exists ── */
// //   const companyExists = companies.length > 0;

// //   const handleAddClick = () => {
// //     if (companyExists) {
// //       showToast("A company already exists. You can only edit it.", "error");
// //       return;
// //     }
// //     setShowForm(true);
// //     setShowSearch(false);
// //     setShowTable(false);
// //   };

// //   return (
// //     <div className="cd-root">

// //       {/* ── Toast ── */}
// //       {toast && (
// //         <div className={`cd-toast cd-toast--${toast.type}`}>
// //           <span className="cd-toast-dot" />
// //           {toast.msg}
// //         </div>
// //       )}

// //       {/* ── Hero ── */}
// //       <div className="cd-hero">
// //         <div className="cd-hero-content">
// //           <h1 className="cd-hero-title">Company Management</h1>
// //           <p className="cd-hero-sub">
// //             Manage your organisation's profile, contact details, and HR information
// //           </p>

// //           <div className="cd-hero-actions">

// //             {/* Add Company */}
// //             {!showForm ? (
// //               <button
// //                 className={`cd-btn ${companyExists ? "cd-btn--ghost-white cd-btn--disabled" : "cd-btn--primary"}`}
// //                 onClick={handleAddClick}
// //                 title={companyExists ? "A company already exists. Edit it instead." : ""}
// //               >
// //                 + Add Company
// //               </button>
// //             ) : (
// //               <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
// //                 ✕ Cancel
// //               </button>
// //             )}

// //             {/* Edit Company */}
// //             <button
// //               className="cd-btn cd-btn--ghost-white"
// //               onClick={() => {
// //                 setShowTable((prev) => !prev);
// //                 setShowSearch(false);
// //                 setShowForm(false);
// //                 setForm(EMPTY_FORM);
// //                 setEditId(null);
// //               }}
// //             >
// //               {showTable ? "✕ Close" : "✏️ Edit Company"}
// //             </button>

// //             {/* Search */}
// //             <button
// //               className="cd-btn cd-btn--ghost-white"
// //               onClick={() => { 
// //                 setShowSearch((prev) => !prev); 
// //                 setShowTable(false);
// //                 setSelectedUser(null); // Clear selected user when closing search
// //               }}
// //             >
// //               {showSearch ? "✕ Close Search" : "🔍 Search"}
// //             </button>

// //             {/* NEW: Create Resume button - only shows when a user is selected */}
// //             {selectedUser && (
// //               <button
// //                 className="cd-btn cd-btn--primary"
// //                 onClick={handleCreateResume}
// //                 disabled={creatingResume}
// //               >
// //                 {creatingResume ? (
// //                   <><span className="cd-spinner" /> Creating...</>
// //                 ) : (
// //                   "📄 Create Resume"
// //                 )}
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── Body ── */}
// //       <div className="cd-body">

// //         {/* ── Add / Edit Form ── */}
// //         {showForm && (
// //           <div className="cd-form-card">
// //             <div className="cd-form-header">
// //               <div>
// //                 <div className="cd-form-header-title">
// //                   {editId ? "Edit Company" : "New Company"}
// //                 </div>
// //               </div>
// //               <button className="cd-close-btn" onClick={handleCancel}>✕</button>
// //             </div>

// //             <form className="cd-form" onSubmit={handleSubmit}>
// //               {FIELDS.map((f) => (
// //                 <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
// //                   <label className="cd-label">
// //                     <span className="cd-label-icon">{f.icon}</span>
// //                     {f.label}
// //                     {f.required && <span className="cd-required"> *</span>}
// //                   </label>
// //                   {f.full ? (
// //                     <textarea
// //                       name={f.name}
// //                       className="cd-input cd-textarea"
// //                       placeholder={f.placeholder}
// //                       value={form[f.name]}
// //                       onChange={handleChange}
// //                       rows={2}
// //                     />
// //                   ) : (
// //                     <input
// //                       name={f.name}
// //                       className="cd-input"
// //                       placeholder={f.placeholder}
// //                       value={form[f.name]}
// //                       onChange={handleChange}
// //                       required={f.required}
// //                     />
// //                   )}
// //                 </div>
// //               ))}

// //               <div className="cd-form-actions">
// //                 <button
// //                   type="submit"
// //                   className="cd-btn cd-btn--blue cd-btn--lg"
// //                   disabled={saving}
// //                 >
// //                   {saving
// //                     ? <><span className="cd-spinner" /> Saving…</>
// //                     : editId ? "💾  Update Company" : "✓  Create Company"}
// //                 </button>
// //                 <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         )}

// //         {/* ── Search bar ── */}
// //         {showSearch && (
// //           <div className="cd-search-bar">
// //             <input
// //               type="text"
// //               placeholder="Search by skill (e.g. Python)"
// //               value={searchKeyword}
// //               onChange={(e) => setSearchKeyword(e.target.value)}
// //               className="cd-input"
// //             />
// //             <input
// //               type="number"
// //               placeholder="Years of Experience"
// //               value={searchExp}
// //               onChange={(e) => setSearchExp(e.target.value)}
// //               className="cd-input"
// //             />
// //             <button className="cd-btn cd-btn--blue" onClick={handleSearch}>
// //               🔍 Search
// //             </button>
// //           </div>
// //         )}

// //         {/* ── Companies table ── */}
// //         {showTable && (
// //           <>
// //             <div className="cd-section-header">
// //               <span className="cd-section-title">Select a Company to Edit</span>
// //             </div>

// //             {loading ? (
// //               <div className="cd-loading">
// //                 <div className="cd-loading-ring" />
// //                 <span>Loading companies…</span>
// //               </div>
// //             ) : companies.length === 0 ? (
// //               <div className="cd-empty">
// //                 <div className="cd-empty-icon">🏢</div>
// //                 <div className="cd-empty-title">No companies yet</div>
// //                 <div className="cd-empty-sub">Click "Add Company" to create your first entry</div>
// //               </div>
// //             ) : (
// //               <div className="cd-table-wrap">
// //                 <table className="cd-table">
// //                   <thead>
// //                     <tr>
// //                       <th>Id</th>
// //                       <th>Company</th>
// //                       <th>Email</th>
// //                       <th>Phone</th>
// //                       <th>HR Name</th>
// //                       <th>Website</th>
// //                       <th>Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {companies.map((c, i) => (
// //                       <tr key={c.id || i} className="cd-tr">
// //                         <td className="cd-td-num">{i + 1}</td>
// //                         <td>
// //                           <div className="cd-name-cell">
// //                             <div className="cd-avatar">{getInitials(c.companyName)}</div>
// //                             <div>
// //                               <div className="cd-co-name">{c.companyName}</div>
// //                               <div className="cd-co-desc">{c.companyDescription || "—"}</div>
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
// //                         <td>{c.primaryPhoneNumber || "—"}</td>
// //                         <td>
// //                           <div className="cd-hr-cell">
// //                             <span className="cd-hr-name">{c.hrName || "—"}</span>
// //                             {c.hrContactNumber && (
// //                               <span className="cd-hr-num">{c.hrContactNumber}</span>
// //                             )}
// //                           </div>
// //                         </td>
// //                         <td>
// //                           {c.websiteUrl
// //                             ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
// //                             : "—"}
// //                         </td>
// //                         <td>
// //                           <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
// //                             ✏️ Edit
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )}
// //           </>
// //         )}

// //         {/* ── Search results with select option ── */}
// //         {isSearching ? (
// //           <div className="cd-loading">
// //             <div className="cd-loading-ring" />
// //             <span>Searching…</span>
// //           </div>
// //         ) : searchResults.length > 0 ? (
// //           <>
// //             <div className="cd-section-header">
// //               <span className="cd-section-title">Search Results</span>
// //               <span className="cd-count-badge">{searchResults.length} found</span>
// //               {selectedUser && (
// //                 <span className="cd-selected-badge">
// //                   Selected: {selectedUser.firstName} {selectedUser.lastName}
// //                 </span>
// //               )}
// //             </div>
// //             <div className="cd-table-wrap">
// //               <table className="cd-table cd-table--wide">
// //                 <thead>
// //                   <tr>
// //                     <th>Select</th>
// //                     <th>#</th>
// //                     <th>User ID</th>
// //                     <th>Username</th>
// //                     <th>Full Name</th>
// //                     <th>Gender</th>
// //                     <th>DOB</th>
// //                     <th>Department</th>
// //                     <th>Designation</th>
// //                     <th>Skill</th>
// //                     <th>Experience</th>
// //                     <th>Nationality</th>
// //                     <th>Marital Status</th>
// //                     <th>Blood Group</th>
// //                     <th>Address</th>
// //                     <th>Skill Description</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {searchResults.map((user, i) => (
// //                     <tr 
// //                       key={i} 
// //                       className={`cd-tr ${selectedUser?.userId === user.userId ? 'cd-tr--selected' : ''}`}
// //                       onClick={() => handleSelectUser(user)}
// //                       style={{ cursor: 'pointer' }}
// //                     >
// //                       <td>
// //                         <input
// //                           type="radio"
// //                           name="selectedUser"
// //                           checked={selectedUser?.userId === user.userId}
// //                           onChange={() => handleSelectUser(user)}
// //                         />
// //                       </td>
// //                       <td className="cd-td-num">{i + 1}</td>
// //                       <td>{user.userId}</td>
// //                       <td className="cd-td-blue">{user.username}</td>
// //                       <td>
// //                         <div className="cd-name-cell">
// //                           <div className="cd-avatar">
// //                             {getInitials(`${user.firstName || ""} ${user.lastName || ""}`)}
// //                           </div>
// //                           <span className="cd-co-name">
// //                             {user.firstName} {user.middleName || ""} {user.lastName}
// //                           </span>
// //                         </div>
// //                       </td>
// //                       <td>{user.gender || "—"}</td>
// //                       <td>
// //                         {user.dob
// //                           ? `${user.dob[2]}-${user.dob[1]}-${user.dob[0]}`
// //                           : "—"}
// //                       </td>
// //                       <td>{user.departmentName || "—"}</td>
// //                       <td>{user.designationName || "—"}</td>
// //                       <td>{user.skillName || "—"}</td>
// //                       <td>{user.yearsOfExperience} yrs</td>
// //                       <td>{user.nationality || "—"}</td>
// //                       <td>{user.maritalStatus || "—"}</td>
// //                       <td>{user.bloodGroup || "—"}</td>
// //                       <td className="cd-td-wrap">{user.address1 || "—"}</td>
// //                       <td className="cd-td-wrap">{user.skillDescription || "—"}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         ) : showSearch && !isSearching && searchKeyword && (
// //           <div className="cd-empty">
// //             <div className="cd-empty-icon">🔍</div>
// //             <div className="cd-empty-title">No results found</div>
// //             <div className="cd-empty-sub">Try a different skill or experience level</div>
// //           </div>
// //         )}

// //       </div>
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
//   { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",         icon: "🏢", required: true },
//   { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru",      icon: "📍" },
//   { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",        icon: "📝", full: true },
//   { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",        icon: "🌐" },
//   { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
//   { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",               icon: "📞" },
//   { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",               icon: "📞" },
//   { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",                icon: "✉️" },
//   { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",                  icon: "✉️" },
//   { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",                   icon: "👤" },
//   { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",                icon: "📱" },
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
//   const [companies,     setCompanies]     = useState([]);
//   const [form,          setForm]          = useState(EMPTY_FORM);
//   const [editId,        setEditId]        = useState(null);
//   const [loading,       setLoading]       = useState(true);
//   const [saving,        setSaving]        = useState(false);
//   const [toast,         setToast]         = useState(null);
//   const [showForm,      setShowForm]      = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchExp,     setSearchExp]     = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching,   setIsSearching]   = useState(false);
//   const [showSearch,    setShowSearch]    = useState(false);
//   const [showTable,     setShowTable]     = useState(false);
  
//   // State for selected user for resume creation
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [creatingResume, setCreatingResume] = useState(false);

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

//   /* ── ALL ORIGINAL HANDLERS ── */

//   const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
//       setShowTable(false);
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
//     setShowTable(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleCancel = () => {
//     setForm(EMPTY_FORM);
//     setEditId(null);
//     setShowForm(false);
//   };

//   const handleSearch = async () => {
//     setIsSearching(true);
//     setSelectedUser(null);
//     try {
//       const res = await axios.get("/api/skill/search", {
//         params: { keyWord: searchKeyword, yrOfExp: searchExp }
//       });
//       setSearchResults(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//       showToast("Search failed", "error");
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Handle user selection from search results
//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//     showToast(`Selected: ${user.firstName} ${user.lastName}`, "success");
//   };

//   // Generate resume HTML with company details
//   const generateResumeHTML = (user, companyData) => {
//     const formatDate = (dob) => {
//       if (!dob) return "Not specified";
//       if (Array.isArray(dob)) {
//         return `${dob[2]}-${dob[1]}-${dob[0]}`;
//       }
//       return dob;
//     };

//     // Get the first company (assuming there's only one)
//     const company = companyData && companyData.length > 0 ? companyData[0] : null;

//     return `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${user.firstName} ${user.lastName} - Resume</title>
//         <style>
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }
          
//           body {
//             font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             padding: 40px 20px;
//             line-height: 1.6;
//           }
          
//           .resume-container {
//             max-width: 1000px;
//             margin: 0 auto;
//             background: white;
//             border-radius: 20px;
//             box-shadow: 0 20px 60px rgba(0,0,0,0.3);
//             overflow: hidden;
//             animation: slideUp 0.5s ease;
//           }
          
//           @keyframes slideUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           .resume-header {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             padding: 40px;
//             text-align: center;
//           }
          
//           .resume-header h1 {
//             font-size: 2.5rem;
//             margin-bottom: 10px;
//             font-weight: 700;
//           }
          
//           .resume-header .title {
//             font-size: 1.2rem;
//             opacity: 0.95;
//             margin-bottom: 20px;
//           }
          
//           .contact-info {
//             display: flex;
//             justify-content: center;
//             gap: 30px;
//             flex-wrap: wrap;
//             margin-top: 20px;
//             font-size: 0.9rem;
//           }
          
//           .contact-info span {
//             display: inline-flex;
//             align-items: center;
//             gap: 8px;
//           }
          
//           .resume-body {
//             padding: 40px;
//           }
          
//           .section {
//             margin-bottom: 30px;
//             break-inside: avoid;
//           }
          
//           .section-title {
//             font-size: 1.5rem;
//             color: #667eea;
//             border-bottom: 3px solid #667eea;
//             padding-bottom: 8px;
//             margin-bottom: 20px;
//             display: inline-block;
//           }
          
//           .company-card {
//             background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
//             padding: 25px;
//             border-radius: 12px;
//             margin-bottom: 25px;
//             border-left: 4px solid #667eea;
//           }
          
//           .company-name {
//             font-size: 1.3rem;
//             font-weight: 700;
//             color: #667eea;
//             margin-bottom: 15px;
//           }
          
//           .company-details {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 15px;
//             margin-top: 15px;
//           }
          
//           .info-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//             gap: 15px;
//             margin-top: 15px;
//           }
          
//           .info-item {
//             padding: 10px;
//             background: #f8f9fa;
//             border-radius: 8px;
//             border-left: 4px solid #667eea;
//           }
          
//           .info-label {
//             font-weight: 600;
//             color: #555;
//             font-size: 0.85rem;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//             margin-bottom: 5px;
//           }
          
//           .info-value {
//             color: #333;
//             font-size: 1rem;
//             font-weight: 500;
//           }
          
//           .skill-card {
//             background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
//             padding: 20px;
//             border-radius: 12px;
//             margin-bottom: 15px;
//             border: 1px solid #dee2e6;
//           }
          
//           .skill-name {
//             font-size: 1.2rem;
//             font-weight: 700;
//             color: #667eea;
//             margin-bottom: 10px;
//           }
          
//           .skill-exp {
//             display: inline-block;
//             background: #667eea;
//             color: white;
//             padding: 4px 12px;
//             border-radius: 20px;
//             font-size: 0.85rem;
//             margin-bottom: 10px;
//           }
          
//           .skill-desc {
//             color: #555;
//             margin-top: 10px;
//             line-height: 1.5;
//           }
          
//           .badge {
//             display: inline-block;
//             background: #e9ecef;
//             padding: 4px 12px;
//             border-radius: 20px;
//             font-size: 0.85rem;
//             margin: 5px 5px 0 0;
//           }
          
//           .company-logo {
//             width: 80px;
//             height: 80px;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 2rem;
//             margin-bottom: 15px;
//           }
          
//           .hr-contact {
//             background: #f8f9fa;
//             padding: 15px;
//             border-radius: 8px;
//             margin-top: 10px;
//           }
          
//           @media print {
//             body {
//               background: white;
//               padding: 0;
//             }
//             .resume-container {
//               box-shadow: none;
//               max-width: 100%;
//             }
//             .section {
//               break-inside: avoid;
//             }
//           }
          
//           .download-btn {
//             position: fixed;
//             bottom: 30px;
//             right: 30px;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             border: none;
//             padding: 12px 24px;
//             border-radius: 50px;
//             font-size: 1rem;
//             font-weight: 600;
//             cursor: pointer;
//             box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//             transition: transform 0.2s;
//             z-index: 1000;
//           }
          
//           .download-btn:hover {
//             transform: translateY(-2px);
//           }
          
//           .link {
//             color: #667eea;
//             text-decoration: none;
//             border-bottom: 1px solid #667eea;
//           }
          
//           .link:hover {
//             color: #764ba2;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="resume-container">
//           <div class="resume-header">
//             <h1>${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}</h1>
//             <div class="title">${user.designationName || 'Professional'}</div>
//             <div class="contact-info">
//               <span>📧 ${user.email || user.primaryEmail || 'Not specified'}</span>
//               <span>📱 ${user.phoneNumber || user.primaryPhoneNumber || 'Not specified'}</span>
//               <span>📍 ${user.address1 || user.address || 'Not specified'}</span>
//             </div>
//           </div>
          
//           <div class="resume-body">
//             ${company ? `
//             <!-- Company Information -->
//             <div class="section">
//               <h2 class="section-title">🏢 Company Information</h2>
//               <div class="company-card">
//                 <div class="company-name">${company.companyName || 'Not specified'}</div>
//                 ${company.companyDescription ? `<p style="color: #555; margin-bottom: 15px;">${company.companyDescription}</p>` : ''}
//                 <div class="company-details">
//                   ${company.address ? `
//                   <div class="info-item">
//                     <div class="info-label">📍 Address</div>
//                     <div class="info-value">${company.address}</div>
//                   </div>
//                   ` : ''}
//                   ${company.websiteUrl ? `
//                   <div class="info-item">
//                     <div class="info-label">🌐 Website</div>
//                     <div class="info-value"><a href="${company.websiteUrl}" target="_blank" class="link">${company.websiteUrl}</a></div>
//                   </div>
//                   ` : ''}
//                   ${company.linkedinUrl ? `
//                   <div class="info-item">
//                     <div class="info-label">🔗 LinkedIn</div>
//                     <div class="info-value"><a href="${company.linkedinUrl}" target="_blank" class="link">Company Profile</a></div>
//                   </div>
//                   ` : ''}
//                   ${company.primaryEmail ? `
//                   <div class="info-item">
//                     <div class="info-label">✉️ Company Email</div>
//                     <div class="info-value">${company.primaryEmail}</div>
//                   </div>
//                   ` : ''}
//                   ${company.primaryPhoneNumber ? `
//                   <div class="info-item">
//                     <div class="info-label">📞 Company Phone</div>
//                     <div class="info-value">${company.primaryPhoneNumber}</div>
//                   </div>
//                   ` : ''}
//                 </div>
//                 ${(company.hrName || company.hrContactNumber) ? `
//                 <div class="hr-contact">
//                   <div class="info-label" style="margin-bottom: 10px;">👥 HR Contact Information</div>
//                   ${company.hrName ? `<div><strong>Name:</strong> ${company.hrName}</div>` : ''}
//                   ${company.hrContactNumber ? `<div><strong>Contact:</strong> ${company.hrContactNumber}</div>` : ''}
//                 </div>
//                 ` : ''}
//               </div>
//             </div>
//             ` : ''}
            
//             <!-- Personal Information -->
//             <div class="section">
//               <h2 class="section-title">👤 Personal Information</h2>
//               <div class="info-grid">
//                 <div class="info-item">
//                   <div class="info-label">Date of Birth</div>
//                   <div class="info-value">${formatDate(user.dob)}</div>
//                 </div>
//                 <div class="info-item">
//                   <div class="info-label">Gender</div>
//                   <div class="info-value">${user.gender || 'Not specified'}</div>
//                 </div>
//                 <div class="info-item">
//                   <div class="info-label">Nationality</div>
//                   <div class="info-value">${user.nationality || 'Not specified'}</div>
//                 </div>
//                 <div class="info-item">
//                   <div class="info-label">Marital Status</div>
//                   <div class="info-value">${user.maritalStatus || 'Not specified'}</div>
//                 </div>
//                 <div class="info-item">
//                   <div class="info-label">Blood Group</div>
//                   <div class="info-value">${user.bloodGroup || 'Not specified'}</div>
//                 </div>
//                 <div class="info-item">
//                   <div class="info-label">Username</div>
//                   <div class="info-value">${user.username || 'Not specified'}</div>
//                 </div>
//               </div>
//             </div>
            
//             <!-- Professional Information -->
//             <div class="section">
//               <h2 class="section-title">💼 Professional Information</h2>
//               <div class="info-grid">
//                 <div class="info-item">
//                   <div class="info-label">Department</div>
//                   <div class="info-value">${user.departmentName || 'Not specified'}</div>
//                 </div>
//                 <div class="info-item">
//                   <div class="info-label">Designation</div>
//                   <div class="info-value">${user.designationName || 'Not specified'}</div>
//                 </div>
//                 <div class="info-item">
//                   <div class="info-label">User ID</div>
//                   <div class="info-value">${user.userId || 'Not specified'}</div>
//                 </div>
//               </div>
//             </div>
            
//             <!-- Skills -->
//             <div class="section">
//               <h2 class="section-title">⚡ Skills & Expertise</h2>
//               <div class="skill-card">
//                 <div class="skill-name">${user.skillName || 'Not specified'}</div>
//                 <div class="skill-exp">${user.yearsOfExperience || 0} years of experience</div>
//                 <div class="skill-desc">${user.skillDescription || 'No description available'}</div>
//               </div>
//             </div>
            
//             <!-- Additional Information -->
//             ${(user.address2 || user.city || user.state || user.pincode) ? `
//             <div class="section">
//               <h2 class="section-title">🏠 Address Details</h2>
//               <div class="info-grid">
//                 ${user.address2 ? `<div class="info-item"><div class="info-label">Address Line 2</div><div class="info-value">${user.address2}</div></div>` : ''}
//                 ${user.city ? `<div class="info-item"><div class="info-label">City</div><div class="info-value">${user.city}</div></div>` : ''}
//                 ${user.state ? `<div class="info-item"><div class="info-label">State</div><div class="info-value">${user.state}</div></div>` : ''}
//                 ${user.pincode ? `<div class="info-item"><div class="info-label">Pincode</div><div class="info-value">${user.pincode}</div></div>` : ''}
//               </div>
//             </div>
//             ` : ''}
//           </div>
//         </div>
//         <button class="download-btn" onclick="window.print()">📄 Download as PDF / Print</button>
//       </body>
//       </html>
//     `;
//   };

//   const handleCreateResume = () => {
//     if (!selectedUser) {
//       showToast("Please select a user from search results first", "error");
//       return;
//     }

//     setCreatingResume(true);
    
//     try {
//       // Get company details from the companies state
//       const companyData = companies;
      
//       // Generate resume HTML with company details
//       const resumeHTML = generateResumeHTML(selectedUser, companyData);
      
//       // Create a blob and download
//       const blob = new Blob([resumeHTML], { type: 'text/html' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       const fileName = `${selectedUser.firstName}_${selectedUser.lastName}_Resume.html`;
      
//       link.href = url;
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
      
//       // Also open in new window for preview
//       const newWindow = window.open();
//       newWindow.document.write(resumeHTML);
//       newWindow.document.close();
      
//       showToast(`Resume created successfully for ${selectedUser.firstName} ${selectedUser.lastName}!`, "success");
      
//     } catch (err) {
//       console.error("Error creating resume:", err);
//       showToast("Failed to create resume", "error");
//     } finally {
//       setCreatingResume(false);
//     }
//   };

//   const getInitials = (name = "") =>
//     name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

//   const companyExists = companies.length > 0;

//   const handleAddClick = () => {
//     if (companyExists) {
//       showToast("A company already exists. You can only edit it.", "error");
//       return;
//     }
//     setShowForm(true);
//     setShowSearch(false);
//     setShowTable(false);
//   };

//   return (
//     <div className="cd-root">

//       {/* Toast */}
//       {toast && (
//         <div className={`cd-toast cd-toast--${toast.type}`}>
//           <span className="cd-toast-dot" />
//           {toast.msg}
//         </div>
//       )}

//       {/* Hero */}
//       <div className="cd-hero">
//         <div className="cd-hero-content">
//           <h1 className="cd-hero-title">Company Management</h1>
//           <p className="cd-hero-sub">
//             Manage your organisation's profile, contact details, and HR information
//           </p>

//           <div className="cd-hero-actions">

//             {/* Add Company */}
//             {!showForm ? (
//               <button
//                 className={`cd-btn ${companyExists ? "cd-btn--ghost-white cd-btn--disabled" : "cd-btn--primary"}`}
//                 onClick={handleAddClick}
//                 title={companyExists ? "A company already exists. Edit it instead." : ""}
//               >
//                 + Add Company
//               </button>
//             ) : (
//               <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>
//                 ✕ Cancel
//               </button>
//             )}

//             {/* Edit Company */}
//             <button
//               className="cd-btn cd-btn--ghost-white"
//               onClick={() => {
//                 setShowTable((prev) => !prev);
//                 setShowSearch(false);
//                 setShowForm(false);
//                 setForm(EMPTY_FORM);
//                 setEditId(null);
//               }}
//             >
//               {showTable ? "✕ Close" : "✏️ Edit Company"}
//             </button>

//             {/* Search */}
//             <button
//               className="cd-btn cd-btn--ghost-white"
//               onClick={() => { 
//                 setShowSearch((prev) => !prev); 
//                 setShowTable(false);
//                 setSelectedUser(null);
//               }}
//             >
//               {showSearch ? "✕ Close Search" : "🔍 Search"}
//             </button>

//             {/* Create Resume button - only shows when a user is selected */}
//             {selectedUser && (
//               <button
//                 className="cd-btn cd-btn--primary"
//                 onClick={handleCreateResume}
//                 disabled={creatingResume}
//               >
//                 {creatingResume ? (
//                   <><span className="cd-spinner" /> Creating...</>
//                 ) : (
//                   "📄 Create Resume"
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="cd-body">

//         {/* Add / Edit Form */}
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
//                 <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Search bar */}
//         {showSearch && (
//           <div className="cd-search-bar">
//             <input
//               type="text"
//               placeholder="Search by skill (e.g. Python)"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//               className="cd-input"
//             />
//             <input
//               type="number"
//               placeholder="Years of Experience"
//               value={searchExp}
//               onChange={(e) => setSearchExp(e.target.value)}
//               className="cd-input"
//             />
//             <button className="cd-btn cd-btn--blue" onClick={handleSearch}>
//               🔍 Search
//             </button>
//           </div>
//         )}

//         {/* Companies table */}
//         {showTable && (
//           <>
//             <div className="cd-section-header">
//               <span className="cd-section-title">Select a Company to Edit</span>
//             </div>

//             {loading ? (
//               <div className="cd-loading">
//                 <div className="cd-loading-ring" />
//                 <span>Loading companies…</span>
//               </div>
//             ) : companies.length === 0 ? (
//               <div className="cd-empty">
//                 <div className="cd-empty-icon">🏢</div>
//                 <div className="cd-empty-title">No companies yet</div>
//                 <div className="cd-empty-sub">Click "Add Company" to create your first entry</div>
//               </div>
//             ) : (
//               <div className="cd-table-wrap">
//                 <table className="cd-table">
//                   <thead>
//                     <tr>
//                       <th>Id</th>
//                       <th>Company</th>
//                       <th>Email</th>
//                       <th>Phone</th>
//                       <th>HR Name</th>
//                       <th>Website</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {companies.map((c, i) => (
//                       <tr key={c.id || i} className="cd-tr">
//                         <td className="cd-td-num">{i + 1}</td>
//                         <td>
//                           <div className="cd-name-cell">
//                             <div className="cd-avatar">{getInitials(c.companyName)}</div>
//                             <div>
//                               <div className="cd-co-name">{c.companyName}</div>
//                               <div className="cd-co-desc">{c.companyDescription || "—"}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="cd-td-blue">{c.primaryEmail || "—"}</td>
//                         <td>{c.primaryPhoneNumber || "—"}</td>
//                         <td>
//                           <div className="cd-hr-cell">
//                             <span className="cd-hr-name">{c.hrName || "—"}</span>
//                             {c.hrContactNumber && (
//                               <span className="cd-hr-num">{c.hrContactNumber}</span>
//                             )}
//                           </div>
//                         </td>
//                         <td>
//                           {c.websiteUrl
//                             ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
//                             : "—"}
//                         </td>
//                         <td>
//                           <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
//                             ✏️ Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}

//         {/* Search results with select option */}
//         {isSearching ? (
//           <div className="cd-loading">
//             <div className="cd-loading-ring" />
//             <span>Searching…</span>
//           </div>
//         ) : searchResults.length > 0 ? (
//           <>
//             <div className="cd-section-header">
//               <span className="cd-section-title">Search Results</span>
//               <span className="cd-count-badge">{searchResults.length} found</span>
//               {selectedUser && (
//                 <span className="cd-selected-badge">
//                   ✓ Selected: {selectedUser.firstName} {selectedUser.lastName}
//                 </span>
//               )}
//             </div>
//             <div className="cd-table-wrap">
//               <table className="cd-table cd-table--wide">
//                 <thead>
//                   <tr>
//                     <th>Select</th>
//                     <th>#</th>
//                     <th>User ID</th>
//                     <th>Username</th>
//                     <th>Full Name</th>
//                     <th>Gender</th>
//                     <th>DOB</th>
//                     <th>Department</th>
//                     <th>Designation</th>
//                     <th>Skill</th>
//                     <th>Experience</th>
//                     <th>Nationality</th>
//                     <th>Marital Status</th>
//                     <th>Blood Group</th>
//                     <th>Address</th>
//                     <th>Skill Description</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {searchResults.map((user, i) => (
//                     <tr 
//                       key={i} 
//                       className={`cd-tr ${selectedUser?.userId === user.userId ? 'cd-tr--selected' : ''}`}
//                       onClick={() => handleSelectUser(user)}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <td>
//                         <input
//                           type="radio"
//                           name="selectedUser"
//                           checked={selectedUser?.userId === user.userId}
//                           onChange={() => handleSelectUser(user)}
//                           onClick={(e) => e.stopPropagation()}
//                         />
//                       </td>
//                       <td className="cd-td-num">{i + 1}</td>
//                       <td>{user.userId}</td>
//                       <td className="cd-td-blue">{user.username}</td>
//                       <td>
//                         <div className="cd-name-cell">
//                           <div className="cd-avatar">
//                             {getInitials(`${user.firstName || ""} ${user.lastName || ""}`)}
//                           </div>
//                           <span className="cd-co-name">
//                             {user.firstName} {user.middleName || ""} {user.lastName}
//                           </span>
//                         </div>
//                       </td>
//                       <td>{user.gender || "—"}</td>
//                       <td>
//                         {user.dob
//                           ? `${user.dob[2]}-${user.dob[1]}-${user.dob[0]}`
//                           : "—"}
//                       </td>
//                       <td>{user.departmentName || "—"}</td>
//                       <td>{user.designationName || "—"}</td>
//                       <td>{user.skillName || "—"}</td>
//                       <td>{user.yearsOfExperience} yrs</td>
//                       <td>{user.nationality || "—"}</td>
//                       <td>{user.maritalStatus || "—"}</td>
//                       <td>{user.bloodGroup || "—"}</td>
//                       <td className="cd-td-wrap">{user.address1 || "—"}</td>
//                       <td className="cd-td-wrap">{user.skillDescription || "—"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         ) : showSearch && !isSearching && searchKeyword && (
//           <div className="cd-empty">
//             <div className="cd-empty-icon">🔍</div>
//             <div className="cd-empty-title">No results found</div>
//             <div className="cd-empty-sub">Try a different skill or experience level</div>
//           </div>
//         )}

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
  { name: "companyName",          label: "Company Name",     placeholder: "HR Nexus Technologies",         icon: "🏢", required: true },
  { name: "address",              label: "Address",          placeholder: "100, Tech Park, Bengaluru",      icon: "📍" },
  { name: "companyDescription",   label: "Description",      placeholder: "Brief company overview…",        icon: "📝", full: true },
  { name: "websiteUrl",           label: "Website URL",      placeholder: "https://yourcompany.com",        icon: "🌐" },
  { name: "linkedinUrl",          label: "LinkedIn URL",     placeholder: "https://linkedin.com/company/…", icon: "🔗" },
  { name: "primaryPhoneNumber",   label: "Primary Phone",    placeholder: "+91 80 2345 6789",               icon: "📞" },
  { name: "secondaryPhoneNumber", label: "Secondary Phone",  placeholder: "+91 80 2345 6790",               icon: "📞" },
  { name: "primaryEmail",         label: "Primary Email",    placeholder: "info@company.in",                icon: "✉️" },
  { name: "secondaryEmail",       label: "Secondary Email",  placeholder: "hr@company.in",                  icon: "✉️" },
  { name: "hrName",               label: "HR Name",          placeholder: "Priya Sharma",                   icon: "👤" },
  { name: "hrContactNumber",      label: "HR Contact",       placeholder: "+91 98765 43210",                icon: "📱" },
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

/* ─────────────────────────────────────────────────────────────────
   ATS-FRIENDLY RESUME GENERATOR
   Clean black-and-white, single-column, highly parseable layout
───────────────────────────────────────────────────────────────── */
const generateATSResume = (user, companyData) => {
  const company = companyData?.[0] || null;

  const formatDate = (dob) => {
    if (!dob) return "";
    if (Array.isArray(dob)) return `${String(dob[2]).padStart(2,"0")}/${String(dob[1]).padStart(2,"0")}/${dob[0]}`;
    return dob;
  };

  const fullName = [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ");
  const dob      = formatDate(user.dob);
  const email    = user.email || user.primaryEmail || "";
  const phone    = user.phoneNumber || user.primaryPhoneNumber || "";
  const address  = user.address1 || user.address || "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${fullName} — Resume</title>
  <style>
    /* ── ATS-safe: no fancy CSS, just clean print-friendly layout ── */
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Source Sans 3', 'Calibri', 'Arial', sans-serif;
      font-size: 10.5pt;
      line-height: 1.55;
      color: #111;
      background: #e8e8e8;
      padding: 32px 20px 60px;
    }

    /* ── Sheet ── */
    .page {
      max-width: 760px;
      margin: 0 auto;
      background: #fff;
      padding: 44px 52px 48px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.18);
    }

    /* ── Header ── */
    .resume-name {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 28pt;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #000;
      line-height: 1.1;
      text-transform: uppercase;
    }
    .resume-title {
      font-size: 11pt;
      font-weight: 600;
      color: #444;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .resume-contacts {
      margin-top: 10px;
      font-size: 9.5pt;
      color: #333;
      display: flex;
      flex-wrap: wrap;
      gap: 0 18px;
      border-top: 2px solid #000;
      border-bottom: 1px solid #ccc;
      padding: 7px 0;
      margin-top: 12px;
    }
    .resume-contacts span { white-space: nowrap; }

    /* ── Section ── */
    .section { margin-top: 22px; }
    .section-title {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 12.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #000;
      border-bottom: 1.5px solid #000;
      padding-bottom: 3px;
      margin-bottom: 12px;
    }

    /* ── Two-column info grid ── */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 24px;
    }
    .info-row { display: flex; gap: 6px; font-size: 10pt; }
    .info-label { font-weight: 700; color: #000; min-width: 130px; flex-shrink: 0; }
    .info-value { color: #222; }

    /* ── Skill block ── */
    .skill-block {
      border-left: 3px solid #000;
      padding-left: 14px;
      margin-bottom: 14px;
    }
    .skill-name { font-weight: 700; font-size: 11pt; color: #000; }
    .skill-meta {
      font-size: 9.5pt;
      color: #555;
      margin: 2px 0 5px;
      font-weight: 600;
    }
    .skill-desc { font-size: 10pt; color: #333; line-height: 1.5; }

    /* ── Company block ── */
    .company-block { margin-bottom: 6px; }
    .company-block-name {
      font-weight: 700;
      font-size: 11.5pt;
      color: #000;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .company-desc { font-size: 10pt; color: #444; margin: 5px 0 10px; font-style: italic; }
    .company-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 24px;
      margin-top: 8px;
    }
    .company-meta-item { font-size: 9.5pt; color: #333; }
    .company-meta-item strong { color: #000; font-weight: 700; }
    .company-meta-item a { color: #000; text-decoration: underline; }

    /* ── HR section ── */
    .hr-row {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px dashed #bbb;
      display: flex;
      gap: 24px;
      font-size: 9.5pt;
    }
    .hr-row strong { font-weight: 700; color: #000; }

    /* ── Divider ── */
    .divider { border: none; border-top: 1px solid #ddd; margin: 18px 0; }

    /* ── Print actions ── */
    .print-bar {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: #111;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      padding: 12px;
      font-family: 'Source Sans 3', sans-serif;
      font-size: 13px;
      z-index: 999;
    }
    .print-bar button {
      background: #fff;
      color: #111;
      border: none;
      padding: 8px 22px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 4px;
      cursor: pointer;
      letter-spacing: 0.5px;
    }
    .print-bar button:hover { background: #e0e0e0; }

    @media print {
      body { background: #fff; padding: 0; }
      .page { box-shadow: none; padding: 20px 28px; max-width: 100%; }
      .print-bar { display: none; }
    }
  </style>
</head>
<body>

<div class="page">

  <!-- ── NAME & CONTACT ── -->
  <div>
    <div class="resume-name">${fullName || "Candidate Name"}</div>
    <div class="resume-title">${user.designationName || "Professional"} &nbsp;·&nbsp; ${user.departmentName || "Department"}</div>
  </div>
  <div class="resume-contacts">
    ${email    ? `<span>✉ ${email}</span>`   : ""}
    ${phone    ? `<span>✆ ${phone}</span>`   : ""}
    ${address  ? `<span>⌂ ${address}</span>` : ""}
    ${user.nationality ? `<span>🌐 ${user.nationality}</span>` : ""}
  </div>

  <!-- ── PROFESSIONAL SUMMARY ── -->
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p style="font-size:10.5pt; color:#222; line-height:1.65;">
      ${user.designationName || "Dedicated professional"} in ${user.departmentName || "the industry"} with
      ${user.yearsOfExperience || "several"} year${user.yearsOfExperience === 1 ? "" : "s"} of hands-on experience
      in <strong>${user.skillName || "core technologies"}</strong>.
      ${user.skillDescription
        ? `Demonstrated expertise in ${user.skillDescription.slice(0, 140)}${user.skillDescription.length > 140 ? "…" : ""}`
        : "Committed to delivering high-quality results and contributing to organisational growth."}
    </p>
  </div>

  <!-- ── SKILLS & EXPERTISE ── -->
  <div class="section">
    <div class="section-title">Skills &amp; Expertise</div>
    <div class="skill-block">
      <div class="skill-name">${user.skillName || "—"}</div>
      <div class="skill-meta">${user.yearsOfExperience || 0} Year${user.yearsOfExperience === 1 ? "" : "s"} of Experience &nbsp;|&nbsp; ${user.designationName || "Role"}</div>
      ${user.skillDescription ? `<div class="skill-desc">${user.skillDescription}</div>` : ""}
    </div>
  </div>

  <!-- ── WORK EXPERIENCE ── -->
  ${company ? `
  <div class="section">
    <div class="section-title">Work Experience</div>
    <div class="company-block">
      <div class="company-block-name">${company.companyName || "Company"}</div>
      <div style="font-size:10pt; color:#555; margin: 2px 0 0; font-weight:600;">
        ${user.designationName || "Professional"} &nbsp;·&nbsp; ${user.departmentName || "Department"}
      </div>
      ${company.companyDescription ? `<div class="company-desc">${company.companyDescription}</div>` : ""}

      <div class="company-meta-grid">
        ${company.address          ? `<div class="company-meta-item"><strong>Address:</strong> ${company.address}</div>` : ""}
        ${company.primaryEmail     ? `<div class="company-meta-item"><strong>Email:</strong> ${company.primaryEmail}</div>` : ""}
        ${company.primaryPhoneNumber ? `<div class="company-meta-item"><strong>Phone:</strong> ${company.primaryPhoneNumber}</div>` : ""}
        ${company.websiteUrl       ? `<div class="company-meta-item"><strong>Website:</strong> <a href="${company.websiteUrl}">${company.websiteUrl}</a></div>` : ""}
        ${company.linkedinUrl      ? `<div class="company-meta-item"><strong>LinkedIn:</strong> <a href="${company.linkedinUrl}">View Profile</a></div>` : ""}
        ${company.secondaryEmail   ? `<div class="company-meta-item"><strong>Alt Email:</strong> ${company.secondaryEmail}</div>` : ""}
      </div>

      ${(company.hrName || company.hrContactNumber) ? `
      <div class="hr-row">
        <span><strong>HR Contact:</strong> ${company.hrName || "—"}</span>
        ${company.hrContactNumber ? `<span><strong>HR Phone:</strong> ${company.hrContactNumber}</span>` : ""}
      </div>` : ""}
    </div>
  </div>` : ""}

  <!-- ── PERSONAL DETAILS ── -->
  <div class="section">
    <div class="section-title">Personal Details</div>
    <div class="info-grid">
      ${user.userId        ? `<div class="info-row"><span class="info-label">Employee ID</span><span class="info-value">${user.userId}</span></div>` : ""}
      ${user.username      ? `<div class="info-row"><span class="info-label">Username</span><span class="info-value">${user.username}</span></div>` : ""}
      ${dob                ? `<div class="info-row"><span class="info-label">Date of Birth</span><span class="info-value">${dob}</span></div>` : ""}
      ${user.gender        ? `<div class="info-row"><span class="info-label">Gender</span><span class="info-value">${user.gender}</span></div>` : ""}
      ${user.nationality   ? `<div class="info-row"><span class="info-label">Nationality</span><span class="info-value">${user.nationality}</span></div>` : ""}
      ${user.maritalStatus ? `<div class="info-row"><span class="info-label">Marital Status</span><span class="info-value">${user.maritalStatus}</span></div>` : ""}
      ${user.bloodGroup    ? `<div class="info-row"><span class="info-label">Blood Group</span><span class="info-value">${user.bloodGroup}</span></div>` : ""}
      ${address            ? `<div class="info-row"><span class="info-label">Address</span><span class="info-value">${address}</span></div>` : ""}
    </div>
  </div>

  <!-- ── DECLARATION ── -->
  <div class="section">
    <div class="section-title">Declaration</div>
    <p style="font-size:10pt; color:#333; line-height:1.65;">
      I hereby declare that the information furnished above is true and correct to the best of my knowledge and belief.
    </p>
    <div style="margin-top: 28px; display:flex; justify-content:space-between; font-size:10pt; color:#333;">
      <span>Date: _________________</span>
      <span>Signature: _________________</span>
    </div>
  </div>

</div><!-- /page -->

<div class="print-bar">
  <span>📄 &nbsp; ${fullName}</span>
  <button onclick="window.print()">Print / Save as PDF</button>
  <button onclick="window.close()">Close</button>
</div>

</body>
</html>`;
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function CompanyDetails() {
  const [companies,     setCompanies]     = useState([]);
  const [form,          setForm]          = useState(EMPTY_FORM);
  const [editId,        setEditId]        = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [saving,        setSaving]        = useState(false);
  const [toast,         setToast]         = useState(null);
  const [showForm,      setShowForm]      = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchExp,     setSearchExp]     = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching,   setIsSearching]   = useState(false);
  const [showSearch,    setShowSearch]    = useState(false);
  const [showTable,     setShowTable]     = useState(false);
  const [selectedUser,  setSelectedUser]  = useState(null);
  const [creatingResume,setCreatingResume]= useState(false);

  /* ── GET ── */
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setCompanies(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
    } catch { setCompanies([]); }
    finally  { setLoading(false); }
  };

  useEffect(() => { fetchCompanies(); }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
      setForm(EMPTY_FORM); setEditId(null); setShowForm(false); setShowTable(false);
      fetchCompanies();
    } catch (err) {
      console.error(err.response?.data);
      showToast(err.response?.data?.message || "Something went wrong.", "error");
    } finally { setSaving(false); }
  };

  const handleEdit = (company) => {
    setForm(cleanPayload(company));
    setEditId(company.id);
    setShowForm(true);
    setShowTable(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(false); };

  const handleSearch = async () => {
    setIsSearching(true);
    setSelectedUser(null);
    try {
      const res = await axios.get("/api/skill/search", {
        params: { keyWord: searchKeyword, yrOfExp: searchExp }
      });
      setSearchResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      showToast("Search failed", "error");
    } finally { setIsSearching(false); }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    showToast(`Selected: ${user.firstName} ${user.lastName}`, "success");
  };

  const handleCreateResume = () => {
    if (!selectedUser) { showToast("Please select a user first", "error"); return; }
    setCreatingResume(true);
    try {
      const html = generateATSResume(selectedUser, companies);
      /* Download */
      const blob = new Blob([html], { type: "text/html" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `${selectedUser.firstName}_${selectedUser.lastName}_Resume.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      /* Preview */
      const win = window.open("", "_blank");
      win.document.write(html);
      win.document.close();
      showToast(`Resume created for ${selectedUser.firstName} ${selectedUser.lastName}!`);
    } catch (err) {
      console.error(err);
      showToast("Failed to create resume", "error");
    } finally { setCreatingResume(false); }
  };

  const getInitials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

  const companyExists = companies.length > 0;

  const handleAddClick = () => {
    if (companyExists) { showToast("A company already exists. Edit it instead.", "error"); return; }
    setShowForm(true); setShowSearch(false); setShowTable(false);
  };

  /* ─────────────────────────────────────────────── RENDER ── */
  return (
    <div className="cd-root">

      {/* Toast */}
      {toast && (
        <div className={`cd-toast cd-toast--${toast.type}`}>
          <span className="cd-toast-dot" />{toast.msg}
        </div>
      )}

      {/* Hero */}
      <div className="cd-hero">
        <div className="cd-hero-circle3" />
        <div className="cd-hero-content">
          <h1 className="cd-hero-title">Company Management</h1>
          <p className="cd-hero-sub">
            Manage your organisation's profile, contact details, and HR information
          </p>
          <div className="cd-hero-actions">

            {!showForm ? (
              <button
                className={`cd-btn ${companyExists ? "cd-btn--ghost-white cd-btn--disabled" : "cd-btn--primary"}`}
                onClick={handleAddClick}
                title={companyExists ? "A company already exists. Edit it instead." : ""}
              >
                + Add Company
              </button>
            ) : (
              <button className="cd-btn cd-btn--ghost-white" onClick={handleCancel}>✕ Cancel</button>
            )}

            <button
              className="cd-btn cd-btn--ghost-white"
              onClick={() => {
                setShowTable((p) => !p);
                setShowSearch(false); setShowForm(false);
                setForm(EMPTY_FORM); setEditId(null);
              }}
            >
              {showTable ? "✕ Close" : "✏️ Edit Company"}
            </button>

            <button
              className="cd-btn cd-btn--ghost-white"
              onClick={() => { setShowSearch((p) => !p); setShowTable(false); setSelectedUser(null); }}
            >
              {showSearch ? "✕ Close Search" : "🔍 Search"}
            </button>

            {selectedUser && (
              <button
                className="cd-btn cd-btn--primary"
                onClick={handleCreateResume}
                disabled={creatingResume}
              >
                {creatingResume ? <><span className="cd-spinner" /> Creating…</> : "📄 Create Resume"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="cd-body">

        {/* Add / Edit Form */}
        {showForm && (
          <div className="cd-form-card">
            <div className="cd-form-header">
              <div>
                <div className="cd-form-header-title">{editId ? "Edit Company" : "New Company"}</div>
                <div className="cd-form-header-sub">{editId ? `Updating record ${editId}` : "Fill in the company details below"}</div>
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
                    <textarea name={f.name} className="cd-input cd-textarea"
                      placeholder={f.placeholder} value={form[f.name]}
                      onChange={handleChange} rows={2} />
                  ) : (
                    <input name={f.name} className="cd-input"
                      placeholder={f.placeholder} value={form[f.name]}
                      onChange={handleChange} required={f.required} />
                  )}
                </div>
              ))}
              <div className="cd-form-actions">
                <button type="submit" className="cd-btn cd-btn--blue cd-btn--lg" disabled={saving}>
                  {saving ? <><span className="cd-spinner" /> Saving…</> : editId ? "💾  Update Company" : "✓  Create Company"}
                </button>
                <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Search bar */}
        {showSearch && (
          <div className="cd-search-bar">
            <input type="text" placeholder="Search by skill (e.g. Python)"
              value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}
              className="cd-input" />
            <input type="number" placeholder="Min. Years of Experience"
              value={searchExp} onChange={(e) => setSearchExp(e.target.value)}
              className="cd-input" style={{ maxWidth: 200 }} />
            <button className="cd-btn cd-btn--blue" onClick={handleSearch}>🔍 Search</button>
          </div>
        )}

        {/* Companies table (Edit mode) */}
        {showTable && (
          <>
            <div className="cd-section-header">
              <span className="cd-section-title">Select a Company to Edit</span>
              <span className="cd-count-badge">{companies.length}</span>
            </div>
            {loading ? (
              <div className="cd-loading"><div className="cd-loading-ring" /><span>Loading companies…</span></div>
            ) : companies.length === 0 ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">🏢</div>
                <div className="cd-empty-title">No companies yet</div>
                <div className="cd-empty-sub">Click "Add Company" to create your first entry</div>
              </div>
            ) : (
              <div className="cd-table-wrap">
                <table className="cd-table">
                  <colgroup>
                    <col style={{ width: 44 }} />
                    <col style={{ width: 220 }} />
                    <col style={{ width: 180 }} />
                    <col style={{ width: 140 }} />
                    <col style={{ width: 160 }} />
                    <col style={{ width: 100 }} />
                    <col style={{ width: 90 }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>HR Contact</th>
                      <th>Website</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c, i) => (
                      <tr key={c.id || i} className="cd-tr">
                        <td className="cd-td-num cd-td-nowrap">{i + 1}</td>
                        <td>
                          <div className="cd-name-cell">
                            <div className="cd-avatar">{getInitials(c.companyName)}</div>
                            <div>
                              <div className="cd-co-name">{c.companyName}</div>
                              {c.companyDescription && (
                                <div className="cd-co-desc"
                                  style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                  title={c.companyDescription}>
                                  {c.companyDescription}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="cd-td-blue cd-td-nowrap">{c.primaryEmail || "—"}</td>
                        <td className="cd-td-nowrap">{c.primaryPhoneNumber || "—"}</td>
                        <td>
                          <div className="cd-hr-cell">
                            <span className="cd-hr-name">{c.hrName || "—"}</span>
                            {c.hrContactNumber && <span className="cd-hr-num">{c.hrContactNumber}</span>}
                          </div>
                        </td>
                        <td className="cd-td-nowrap">
                          {c.websiteUrl
                            ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
                            : "—"}
                        </td>
                        <td className="cd-td-nowrap">
                          <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>✏️ Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Search results */}
        {isSearching ? (
          <div className="cd-loading"><div className="cd-loading-ring" /><span>Searching…</span></div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="cd-section-header" style={{ marginTop: 24 }}>
              <span className="cd-section-title">Search Results</span>
              <span className="cd-count-badge">{searchResults.length} found</span>
              {selectedUser && (
                <span className="cd-selected-badge">
                  ✓ {selectedUser.firstName} {selectedUser.lastName} selected
                </span>
              )}
            </div>

            {/* Inline hint */}
            {!selectedUser && (
              <p style={{ fontSize: 12.5, color: "var(--tx-3)", marginBottom: 10 }}>
                Click a row to select a candidate, then click <strong>📄 Create Resume</strong> in the header.
              </p>
            )}

            <div className="cd-table-wrap">
              <table className="cd-table cd-table--wide">
                <colgroup>
                  <col style={{ width: 44 }} />   {/* # */}
                  <col style={{ width: 36 }} />   {/* radio */}
                  <col style={{ width: 70 }} />   {/* UID */}
                  <col style={{ width: 90 }} />   {/* username */}
                  <col style={{ width: 180 }} />  {/* full name */}
                  <col style={{ width: 70 }} />   {/* gender */}
                  <col style={{ width: 96 }} />   {/* DOB */}
                  <col style={{ width: 120 }} />  {/* dept */}
                  <col style={{ width: 120 }} />  {/* desig */}
                  <col style={{ width: 110 }} />  {/* skill */}
                  <col style={{ width: 80 }} />   {/* exp */}
                  <col style={{ width: 90 }} />   {/* nationality */}
                  <col style={{ width: 100 }} />  {/* marital */}
                  <col style={{ width: 80 }} />   {/* blood */}
                  <col style={{ width: 160 }} />  {/* address */}
                  <col style={{ width: 200 }} />  {/* skill desc */}
                </colgroup>
                <thead>
                  <tr>
                    <th>#</th>
                    <th title="Select">✓</th>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Skill</th>
                    <th>Exp.</th>
                    <th>Nationality</th>
                    <th>Marital</th>
                    <th>Blood</th>
                    <th>Address</th>
                    <th>Skill Description</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((user, i) => {
                    const isSelected = selectedUser?.userId === user.userId;
                    return (
                      <tr
                        key={i}
                        className={`cd-tr${isSelected ? " cd-tr--selected" : ""}`}
                        onClick={() => handleSelectUser(user)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="cd-td-num cd-td-nowrap">{i + 1}</td>
                        <td className="cd-td-nowrap" style={{ textAlign: "center" }}>
                          <input
                            type="radio"
                            name="selectedUser"
                            checked={isSelected}
                            onChange={() => handleSelectUser(user)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="cd-td-nowrap">{user.userId}</td>
                        <td className="cd-td-blue cd-td-nowrap">{user.username}</td>
                        <td>
                          <div className="cd-name-cell">
                            <div className="cd-avatar cd-avatar--sm">
                              {getInitials(`${user.firstName || ""} ${user.lastName || ""}`)}
                            </div>
                            <span className="cd-co-name" style={{ fontSize: 13 }}>
                              {user.firstName} {user.middleName || ""} {user.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="cd-td-nowrap">{user.gender || "—"}</td>
                        <td className="cd-td-nowrap">
                          {user.dob
                            ? `${String(user.dob[2]).padStart(2,"0")}/${String(user.dob[1]).padStart(2,"0")}/${user.dob[0]}`
                            : "—"}
                        </td>
                        <td>{user.departmentName || "—"}</td>
                        <td>{user.designationName || "—"}</td>
                        <td>
                          {user.skillName
                            ? <span className="cd-skill-tag">{user.skillName}</span>
                            : "—"}
                        </td>
                        <td className="cd-td-nowrap">
                          {user.yearsOfExperience != null
                            ? <span className="cd-exp-badge">{user.yearsOfExperience} yr{user.yearsOfExperience !== 1 ? "s" : ""}</span>
                            : "—"}
                        </td>
                        <td>{user.nationality || "—"}</td>
                        <td>{user.maritalStatus || "—"}</td>
                        <td className="cd-td-nowrap">{user.bloodGroup || "—"}</td>
                        <td style={{ maxWidth: 160, whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.45 }}>
                          {user.address1 || "—"}
                        </td>
                        <td style={{ maxWidth: 200, whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.45, fontSize: 12.5 }}>
                          {user.skillDescription || "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : showSearch && !isSearching && searchKeyword && (
          <div className="cd-empty">
            <div className="cd-empty-icon">🔍</div>
            <div className="cd-empty-title">No results found</div>
            <div className="cd-empty-sub">Try a different skill or experience level</div>
          </div>
        )}

      </div>{/* /body */}
    </div>
  );
}
