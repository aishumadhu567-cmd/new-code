// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);

//   const [newDepartment, setNewDepartment] = useState("");
//   const [newDesignation, setNewDesignation] = useState("");
//   const [deptError, setDeptError] = useState("");
//   const [desgError, setDesgError] = useState("");

//   const [deptFilter, setDeptFilter] = useState("");
//   const [desgFilter, setDesgFilter] = useState("");

//   const [editingDept, setEditingDept] = useState(null);
//   const [editingDesg, setEditingDesg] = useState(null);
//   const [editDeptName, setEditDeptName] = useState("");
//   const [editDesgName, setEditDesgName] = useState("");

//   const [loadingDept, setLoadingDept] = useState(false);
//   const [loadingDesg, setLoadingDesg] = useState(false);

//   const fetchDepartments = async () => {
//     try {
//       const res = await axios.get(`/api/departments`, { withCredentials: true });
//       setDepartments(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Unable to fetch departments");
//     }
//   };

//   const fetchDesignations = async () => {
//     try {
//       const res = await axios.get(`/api/designations`, { withCredentials: true });
//       const cleaned = res.data.filter((d) => d.designationName !== null);
//       setDesignations(cleaned);
//     } catch (error) {
//       console.error(error);
//       alert("Unable to fetch designations");
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchDesignations();
//   }, []);

//   const addDepartment = async () => {
//     const deptVal = newDepartment.trim();
//     if (!deptVal) { setDeptError("Department name is required"); return; }
//     if (!/^[A-Za-z ]{2,30}$/.test(deptVal)) { setDeptError("Only letters allowed, 2-30 chars"); return; }
//     setDeptError("");
//     try {
//       setLoadingDept(true);
//       await axios.post(`/api/departments`, { departmentName: newDepartment }, { withCredentials: true });
//       alert("Department created successfully");
//       setNewDepartment("");
//       fetchDepartments();
//     } catch (error) {
//       alert(error.response?.data?.message || "Create failed");
//     } finally { setLoadingDept(false); }
//   };

//   const addDesignation = async () => {
//     const desgVal = newDesignation.trim();
//     if (!desgVal) { setDesgError("Designation name is required"); return; }
//     if (!/^[A-Za-z ]{2,30}$/.test(desgVal)) { setDesgError("Only letters allowed, 2-30 chars"); return; }
//     setDesgError("");
//     try {
//       setLoadingDesg(true);
//       await axios.post(`/api/dept/hr/DesignationName`, { designationName: newDesignation }, { withCredentials: true });
//       alert("Designation created successfully");
//       setNewDesignation("");
//       fetchDesignations();
//     } catch (error) {
//       alert(error.response?.data?.message || "Create failed");
//     } finally { setLoadingDesg(false); }
//   };

//   const updateDepartment = async (id) => {
//     const trimmed = editDeptName.trim();
//     if (!trimmed) { setDeptError("Department name is required"); return; }
//     if (!/^[A-Za-z ]{1,30}$/.test(trimmed)) { setDeptError("Only letters allowed, 1-30 chars"); return; }

//     try {
//       await axios.put(`/api/departments/department-upate?departmentId=${id}`, { departmentName: trimmed }, { withCredentials: true });
//       alert("Department updated successfully");
//       setEditingDept(null); setEditDeptName(""); setDeptError(""); fetchDepartments();
//     } catch (error) {
//       alert(error.response?.data?.message || "Update failed");
//     }
//   };

//   const updateDesignation = async (id) => {
//     const trimmed = editDesgName.trim();
//     if (!trimmed) { setDesgError("Designation name is required"); return; }
//     if (!/^[A-Za-z ]{1,30}$/.test(trimmed)) { setDesgError("Only letters allowed, 1-30 chars"); return; }

//     try {
//       await axios.put(`/api/designations/designation-update?designationId=${id}`, { designationName: trimmed }, { withCredentials: true });
//       alert("Designation updated successfully");
//       setEditingDesg(null); setEditDesgName(""); setDesgError(""); fetchDesignations();
//     } catch (error) {
//       alert(error.response?.data?.message || "Update failed");
//     }
//   };

//   const startEditDept = (dept) => { setEditingDept(dept.id); setEditDeptName(dept.departmentName); };
//   const startEditDesg = (desg) => { setEditingDesg(desg.id); setEditDesgName(desg.designationName); };
//   const cancelEdit = () => { setEditingDept(null); setEditingDesg(null); setEditDeptName(""); setEditDesgName(""); };

//   return (
//     <div style={styles.page}>

//       {/* ── Dark Navy → Blue Banner ── */}
//       <div style={styles.banner}>
//         <div style={styles.bannerCircle1} />
//         <div style={styles.bannerCircle2} />
//         <h1 style={styles.bannerTitle}>Department & Designation Management</h1>
//         <p style={styles.bannerSubtitle}>Manage your organizational structure — add, edit departments and designations</p>
//       </div>

//       <div style={styles.gridContainer}>

//         {/* DEPARTMENTS CARD */}
//         <div style={styles.card}>
//           <div style={styles.cardHeader}>
//             <h3 style={styles.cardTitle}>Departments</h3>
//             <span style={styles.badge}>{departments.length} Total</span>
//           </div>

//           <div style={styles.inputGroup}>
//             <input
//               type="text"
//               placeholder="Enter department name..."
//               value={newDepartment}
//               onChange={(e) => {
//                 const rawVal = e.target.value;
//                 if (/[^A-Za-z ]/.test(rawVal)) setDeptError("Numbers and special characters are not allowed");
//                 else setDeptError("");
//                 setNewDepartment(rawVal.replace(/[^A-Za-z ]/g, ""));
//               }}
//               style={styles.input}
//               onKeyPress={(e) => e.key === "Enter" && addDepartment()}
//               maxLength={30}
//             />
//             <button onClick={addDepartment} disabled={loadingDept} style={styles.addButton}>
//               {loadingDept ? "Adding..." : "+ Add"}
//             </button>
//           </div>
//           {deptError && <div style={styles.errorText}>{deptError}</div>}

//           <div style={styles.listContainer}>
//             {departments.length === 0 ? (
//               <div style={styles.emptyState}><p>No departments yet. Add your first department above.</p></div>
//             ) : (
//               departments
//                 .filter(dept => dept.departmentName.toLowerCase().includes(deptFilter.toLowerCase()))
//                 .map((dept) => (
//                   <div key={dept.id} style={styles.listItem}>
//                     {editingDept === dept.id ? (
//                       <div style={styles.editContainer}>
//                         <input
//                           type="text"
//                           value={editDeptName}
//                           onChange={(e) => {
//                             const rawVal = e.target.value;
//                             if (/[^A-Za-z ]/.test(rawVal)) setDeptError("Numbers and special characters are not allowed");
//                             else if (rawVal.trim().length > 30) setDeptError("Must be 30 characters or less");
//                             else setDeptError("");
//                             setEditDeptName(rawVal.replace(/[^A-Za-z ]/g, ""));
//                           }}
//                           style={styles.editInput}
//                           autoFocus
//                         />
//                         {deptError && <div style={styles.errorText}>{deptError}</div>}
//                         <div style={styles.editActions}>
//                           <button onClick={() => updateDepartment(dept.id)} style={styles.saveButton} title="Save">✓</button>
//                           <button onClick={cancelEdit} style={styles.cancelButton} title="Cancel">✕</button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <span style={styles.itemText}>{dept.departmentName}</span>
//                         <div style={styles.actions}>
//                           <button onClick={() => startEditDept(dept)} style={styles.editButton} title="Edit"> Edit</button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))
//             )}
//           </div>
//         </div>

//         {/* DESIGNATIONS CARD */}
//         <div style={styles.card}>
//           <div style={styles.cardHeader}>
//             <h3 style={styles.cardTitle}>Designations</h3>
//             <span style={styles.badge}>{designations.length} Total</span>
//           </div>

//           <div style={styles.inputGroup}>
//             <input
//               type="text"
//               placeholder="Enter designation name..."
//               value={newDesignation}
//               onChange={(e) => {
//                 const rawVal = e.target.value;
//                 if (/[^A-Za-z ]/.test(rawVal)) setDesgError("Numbers and special characters are not allowed");
//                 else setDesgError("");
//                 setNewDesignation(rawVal.replace(/[^A-Za-z ]/g, ""));
//               }}
//               style={styles.input}
//               onKeyPress={(e) => e.key === "Enter" && addDesignation()}
//               maxLength={30}
//             />
//             <button onClick={addDesignation} disabled={loadingDesg} style={styles.addButton}>
//               {loadingDesg ? "Adding..." : "+ Add"}
//             </button>
//           </div>
//           {desgError && <div style={styles.errorText}>{desgError}</div>}

//           <div style={styles.listContainer}>
//             {designations.length === 0 ? (
//               <div style={styles.emptyState}><p>No designations yet. Add your first designation above.</p></div>
//             ) : (
//               designations
//                 .filter(desg => desg.designationName.toLowerCase().includes(desgFilter.toLowerCase()))
//                 .map((desg) => (
//                   <div key={desg.id} style={styles.listItem}>
//                     {editingDesg === desg.id ? (
//                       <div style={styles.editContainer}>
//                         <input
//                           type="text"
//                           value={editDesgName}
//                           onChange={(e) => {
//                             const rawVal = e.target.value;
//                             if (/[^A-Za-z ]/.test(rawVal)) setDesgError("Numbers and special characters are not allowed");
//                             else if (rawVal.trim().length > 30) setDesgError("Must be 30 characters or less");
//                             else setDesgError("");
//                             setEditDesgName(rawVal.replace(/[^A-Za-z ]/g, ""));
//                           }}
//                           style={styles.editInput}
//                           autoFocus
//                         />
//                         {desgError && <div style={styles.errorText}>{desgError}</div>}
//                         <div style={styles.editActions}>
//                           <button onClick={() => updateDesignation(desg.id)} style={styles.saveButton} title="Save">✓</button>
//                           <button onClick={cancelEdit} style={styles.cancelButton} title="Cancel">✕</button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <span style={styles.itemText}>{desg.designationName}</span>
//                         <div style={styles.actions}>
//                           <button onClick={() => startEditDesg(desg)} style={styles.editButton} title="Edit"> Edit</button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* ======================
//    STYLES — Blue + Black/White Theme
//    ====================== */
// const styles = {
//   page: {
//     backgroundColor: "#f0f4ff",
//     minHeight: "100vh",
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//   },

//   /* ── Banner ── */
//   banner: {
//     position: "relative",
//     overflow: "hidden",
//     background: "linear-gradient(118deg, #0f172a 0%, #1e3a5f 45%, #2563EB 100%)",
//     borderRadius: "0 0 20px 20px",
//     padding: "36px 36px 32px",
//     marginBottom: "32px",
//     boxShadow: "0 4px 24px rgba(37,99,235,0.22)",
//   },
//   bannerCircle1: {
//     position: "absolute",
//     top: "-60px", right: "120px",
//     width: "260px", height: "260px",
//     borderRadius: "50%",
//     background: "rgba(255,255,255,0.08)",
//     pointerEvents: "none",
//   },
//   bannerCircle2: {
//     position: "absolute",
//     top: "20px", right: "-40px",
//     width: "180px", height: "180px",
//     borderRadius: "50%",
//     background: "rgba(255,255,255,0.06)",
//     pointerEvents: "none",
//   },
//   bannerTitle: {
//     fontSize: "28px",
//     fontWeight: "800",
//     color: "#ffffff",
//     margin: "0 0 8px",
//     letterSpacing: "-0.01em",
//     position: "relative",
//     zIndex: 1,
//   },
//   bannerSubtitle: {
//     fontSize: "15px",
//     color: "rgba(255,255,255,0.72)",
//     fontWeight: "400",
//     margin: 0,
//     position: "relative",
//     zIndex: 1,
//   },

//   gridContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: "20px",
//     maxWidth: "1200px",
//     margin: "0 auto",
//     padding: "0 20px 40px",
//   },

//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: "16px",
//     padding: "24px",
//     boxShadow: "0 4px 16px rgba(37,99,235,0.09)",
//     border: "1px solid #e0e8ff",
//     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//   },

//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px",
//     paddingBottom: "16px",
//     borderBottom: "2px solid #e0e8ff",
//   },

//   cardTitle: {
//     fontSize: "20px",
//     fontWeight: "700",
//     color: "#0f172a",
//     margin: 0,
//   },

//   badge: {
//     backgroundColor: "#dbeafe",
//     color: "#1D4ED8",
//     padding: "5px 14px",
//     borderRadius: "20px",
//     fontSize: "13px",
//     fontWeight: "700",
//     border: "1px solid #bfdbfe",
//   },

//   inputGroup: {
//     display: "flex",
//     gap: "12px",
//     marginBottom: "8px",
//   },

//   input: {
//     flex: 1,
//     padding: "10px 14px",
//     borderRadius: "10px",
//     border: "1.5px solid #d1d5db",
//     fontSize: "14px",
//     outline: "none",
//     backgroundColor: "#fff",
//     fontFamily: "inherit",
//     color: "#111827",
//     transition: "border-color 0.2s",
//   },

//   addButton: {
//     padding: "10px 22px",
//     borderRadius: "10px",
//     border: "none",
//     background: "linear-gradient(135deg, #0f172a 0%, #2563EB 100%)",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "700",
//     whiteSpace: "nowrap",
//     boxShadow: "0 2px 10px rgba(37,99,235,0.28)",
//     transition: "all 0.2s ease",
//   },

//   errorText: {
//     color: "#ef4444",
//     fontSize: "13px",
//     marginBottom: "10px",
//     marginTop: "2px",
//   },

//   listContainer: {
//     maxHeight: "450px",
//     overflowY: "auto",
//     paddingRight: "4px",
//     marginTop: "12px",
//   },

//   listItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "13px 16px",
//     marginBottom: "8px",
//     borderRadius: "10px",
//     backgroundColor: "#f8faff",
//     border: "1px solid #e0e8ff",
//     transition: "all 0.2s ease",
//   },

//   itemText: {
//     fontSize: "15px",
//     color: "#374151",
//     fontWeight: "500",
//     flex: 1,
//   },

//   actions: {
//     display: "flex",
//     gap: "8px",
//   },

//   editButton: {
//     padding: "7px 16px",
//     borderRadius: "8px",
//     border: "none",
//     background: "linear-gradient(135deg, #0f172a 0%, #2563EB 100%)",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontSize: "13px",
//     fontWeight: "600",
//     boxShadow: "0 2px 8px rgba(37,99,235,0.22)",
//     transition: "all 0.2s ease",
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//   },

//   editContainer: {
//     display: "flex",
//     gap: "10px",
//     width: "100%",
//     alignItems: "center",
//   },

//   editInput: {
//     flex: 1,
//     padding: "9px 14px",
//     borderRadius: "8px",
//     border: "2px solid #2563EB",
//     fontSize: "14px",
//     outline: "none",
//     backgroundColor: "#ffffff",
//     fontFamily: "inherit",
//     color: "#111827",
//   },

//   editActions: {
//     display: "flex",
//     gap: "8px",
//   },

//   saveButton: {
//     padding: "8px 16px",
//     borderRadius: "8px",
//     border: "none",
//     background: "linear-gradient(135deg, #0f172a 0%, #2563EB 100%)",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontSize: "18px",
//     fontWeight: "bold",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
//     transition: "all 0.2s ease",
//   },

//   cancelButton: {
//     padding: "8px 16px",
//     borderRadius: "8px",
//     border: "none",
//     background: "linear-gradient(135deg, #1e293b, #475569)",
//     color: "#ffffff",
//     cursor: "pointer",
//     fontSize: "18px",
//     fontWeight: "bold",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "all 0.2s ease",
//   },

//   emptyState: {
//     textAlign: "center",
//     padding: "40px 20px",
//     color: "#94a3b8",
//     fontSize: "15px",
//     background: "#f0f4ff",
//     borderRadius: "10px",
//     border: "1px dashed #c7d8f8",
//   },
// };
import { useState, useEffect } from "react";
import axios from "axios";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [newDepartment, setNewDepartment] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [deptError, setDeptError] = useState("");
  const [desgError, setDesgError] = useState("");

  const [editingDept, setEditingDept] = useState(null);
  const [editingDesg, setEditingDesg] = useState(null);
  const [editDeptName, setEditDeptName] = useState("");
  const [editDesgName, setEditDesgName] = useState("");

  const [loadingDept, setLoadingDept] = useState(false);
  const [loadingDesg, setLoadingDesg] = useState(false);

  // New state to track if add form is active
  const [addingDept, setAddingDept] = useState(false);
  const [addingDesg, setAddingDesg] = useState(false);

  // Show a warning only after user attempts to add while editing
  const [showDeptEditWarning, setShowDeptEditWarning] = useState(false);
  const [showDesgEditWarning, setShowDesgEditWarning] = useState(false);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(`/api/departments`, { withCredentials: true });
      setDepartments(res.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch departments");
    }
  };

  const fetchDesignations = async () => {
    try {
      const res = await axios.get(`/api/designations`, { withCredentials: true });
      const cleaned = res.data.filter((d) => d.designationName !== null);
      setDesignations(cleaned);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch designations");
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, []);

  // Check if any edit operation is active
  const isAnyEditActive = editingDept !== null || editingDesg !== null;

  // Check if any add operation is active
  const isAnyAddActive = addingDept || addingDesg;

  const addDepartment = async () => {
    // Prevent add if edit is active
    if (isAnyEditActive) {
      setDeptError("❌ Please finish editing first");
      setShowDeptEditWarning(true);
      return;
    }
    setShowDeptEditWarning(false);

    const deptVal = newDepartment.trim();
    if (!deptVal) { 
      setDeptError("Department name is required"); 
      return; 
    }
    if (!/^[A-Za-z ]{2,30}$/.test(deptVal)) { 
      setDeptError("Only letters allowed, 2-30 chars"); 
      return; 
    }
    setDeptError("");
    try {
      setLoadingDept(true);
      await axios.post(`/api/departments`, { departmentName: newDepartment }, { withCredentials: true });
      alert("Department created successfully");
      setNewDepartment("");
      setAddingDept(false); // Reset add mode
      fetchDepartments();
    } catch (error) {
      alert(error.response?.data?.message || "Create failed");
    } finally { setLoadingDept(false); }
  };

  const addDesignation = async () => {
    // Prevent add if edit is active
    if (isAnyEditActive) {
      setDesgError("❌ Please finish editing first");
      setShowDesgEditWarning(true);
      return;
    }
    setShowDesgEditWarning(false);

    const desgVal = newDesignation.trim();
    if (!desgVal) { 
      setDesgError("Designation name is required"); 
      return; 
    }
    if (!/^[A-Za-z ]{2,30}$/.test(desgVal)) { 
      setDesgError("Only letters allowed, 2-30 chars"); 
      return; 
    }
    setDesgError("");
    try {
      setLoadingDesg(true);
      await axios.post(`/api/dept/hr/DesignationName`, { designationName: newDesignation }, { withCredentials: true });
      alert("Designation created successfully");
      setNewDesignation("");
      setAddingDesg(false); // Reset add mode
      fetchDesignations();
    } catch (error) {
      alert(error.response?.data?.message || "Create failed");
    } finally { setLoadingDesg(false); }
  };

  const updateDepartment = async (id) => {
    const trimmed = editDeptName.trim();
    if (!trimmed) { 
      setDeptError("Department name is required"); 
      return; 
    }
    if (!/^[A-Za-z ]{1,30}$/.test(trimmed)) { 
      setDeptError("Only letters allowed, 1-30 chars"); 
      return; 
    }

    try {
      await axios.put(`/api/departments/department-upate?departmentId=${id}`, { departmentName: trimmed }, { withCredentials: true });
      alert("Department updated successfully");
      setEditingDept(null); 
      setEditDeptName(""); 
      setDeptError(""); 
      fetchDepartments();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const updateDesignation = async (id) => {
    const trimmed = editDesgName.trim();
    if (!trimmed) { 
      setDesgError("Designation name is required"); 
      return; 
    }
    if (!/^[A-Za-z ]{1,30}$/.test(trimmed)) { 
      setDesgError("Only letters allowed, 1-30 chars"); 
      return; 
    }

    try {
      await axios.put(`/api/designations/designation-update?designationId=${id}`, { designationName: trimmed }, { withCredentials: true });
      alert("Designation updated successfully");
      setEditingDesg(null); 
      setEditDesgName(""); 
      setDesgError(""); 
      fetchDesignations();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const startEditDept = (dept) => { 
    // Prevent edit if any add is active
    if (isAnyAddActive) {
      setDeptError("❌ Please finish adding first");
      return;
    }
    // Clear previous validation messages when starting a new edit session
    setDeptError("");
    setShowDeptEditWarning(false);
    setEditingDept(dept.id); 
    setEditDeptName(dept.departmentName); 
  };
  
  const startEditDesg = (desg) => { 
    // Prevent edit if any add is active
    if (isAnyAddActive) {
      setDesgError("❌ Please finish adding first");
      return;
    }
    // Clear previous validation messages when starting a new edit session
    setDesgError("");
    setShowDesgEditWarning(false);
    setEditingDesg(desg.id); 
    setEditDesgName(desg.designationName); 
  };
  
  const cancelEdit = () => { 
    setEditingDept(null); 
    setEditingDesg(null); 
    setEditDeptName(""); 
    setEditDesgName(""); 
    setShowDeptEditWarning(false);
    setShowDesgEditWarning(false);
  };

  const handleDeptInputFocus = () => {
    setAddingDept(true);
    // Clear any previous errors
    if (deptError) setDeptError("");
  };

  const handleDesgInputFocus = () => {
    setAddingDesg(true);
    // Clear any previous errors
    if (desgError) setDesgError("");
  };

  const handleDeptInputBlur = () => {
    // Only reset if input is empty and not in edit mode
    if (!newDepartment.trim() && !editingDept) {
      setAddingDept(false);
    }
  };

  const handleDesgInputBlur = () => {
    // Only reset if input is empty and not in edit mode
    if (!newDesignation.trim() && !editingDesg) {
      setAddingDesg(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* ── Dark Navy → Blue Banner ── */}
      <div style={styles.banner}>
        <div style={styles.bannerCircle1} />
        <div style={styles.bannerCircle2} />
        <h1 style={styles.bannerTitle}>Department & Designation Management</h1>
        <p style={styles.bannerSubtitle}>Manage your organizational structure — add, edit departments and designations</p>
      </div>

      <div style={styles.gridContainer}>

        {/* DEPARTMENTS CARD */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Departments</h3>
            <span style={styles.badge}>{departments.length} Total</span>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter department name..."
              value={newDepartment}
              onFocus={handleDeptInputFocus}
              onBlur={handleDeptInputBlur}
              onChange={(e) => {
                const rawVal = e.target.value;
                if (/[^A-Za-z ]/.test(rawVal)) setDeptError("Numbers and special characters are not allowed");
                else setDeptError("");
                setNewDepartment(rawVal.replace(/[^A-Za-z ]/g, ""));
              }}
              style={{
                ...styles.input,
                ...(isAnyEditActive && newDepartment ? styles.inputDisabled : {})
              }}
              onKeyPress={(e) => e.key === "Enter" && addDepartment()}
              maxLength={30}
              disabled={isAnyEditActive && !addingDept}
            />
            <button 
              onClick={addDepartment} 
              disabled={loadingDept || (isAnyEditActive && !addingDept)} 
              style={{
                ...styles.addButton,
                ...((isAnyEditActive && !addingDept) ? styles.buttonDisabled : {})
              }}
            >
              {loadingDept ? "Adding..." : "+ Add"}
            </button>
          </div>
          
          {/* Error message with proper spacing */}
          {deptError && (
            <div style={styles.errorContainer}>
              <span style={styles.errorText}>{deptError}</span>
            </div>
          )}

          {/* Warning message when the user tried to add while editing */}
          {showDeptEditWarning && !deptError && (
            <div style={styles.warningContainer}>
              <span style={styles.warningText}>⚠️ Complete editing before adding new department</span>
            </div>
          )}

          <div style={styles.listContainer}>
            {departments.length === 0 ? (
              <div style={styles.emptyState}><p>No departments yet. Add your first department above.</p></div>
            ) : (
              departments
                .map((dept) => (
                  <div key={dept.id} style={styles.listItem}>
                    {editingDept === dept.id ? (
                      <div style={styles.editContainer}>
                        <input
                          type="text"
                          value={editDeptName}
                          onChange={(e) => {
                            const rawVal = e.target.value;
                            setEditDeptName(rawVal.replace(/[^A-Za-z ]/g, ""));
                          }}
                          style={styles.editInput}
                          autoFocus
                        />
                        {deptError && editingDept === dept.id && (
                          <div style={styles.editErrorText}>{deptError}</div>
                        )}
                        <div style={styles.editActions}>
                          <button onClick={() => updateDepartment(dept.id)} style={styles.saveButton} title="Save">✓</button>
                          <button onClick={cancelEdit} style={styles.cancelButton} title="Cancel">✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span style={styles.itemText}>{dept.departmentName}</span>
                        <div style={styles.actions}>
                          <button 
                            onClick={() => startEditDept(dept)} 
                            style={{
                              ...styles.editButton,
                              ...(isAnyAddActive ? styles.buttonDisabled : {})
                            }}
                            disabled={isAnyAddActive}
                            title={isAnyAddActive ? "Finish adding first" : "Edit"}
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>

        {/* DESIGNATIONS CARD */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Designations</h3>
            <span style={styles.badge}>{designations.length} Total</span>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter designation name..."
              value={newDesignation}
              onFocus={handleDesgInputFocus}
              onBlur={handleDesgInputBlur}
              onChange={(e) => {
                const rawVal = e.target.value;
                if (/[^A-Za-z ]/.test(rawVal)) setDesgError("Numbers and special characters are not allowed");
                else setDesgError("");
                setNewDesignation(rawVal.replace(/[^A-Za-z ]/g, ""));
              }}
              style={{
                ...styles.input,
                ...(isAnyEditActive && newDesignation ? styles.inputDisabled : {})
              }}
              onKeyPress={(e) => e.key === "Enter" && addDesignation()}
              maxLength={30}
              disabled={isAnyEditActive && !addingDesg}
            />
            <button 
              onClick={addDesignation} 
              disabled={loadingDesg || (isAnyEditActive && !addingDesg)} 
              style={{
                ...styles.addButton,
                ...((isAnyEditActive && !addingDesg) ? styles.buttonDisabled : {})
              }}
            >
              {loadingDesg ? "Adding..." : "+ Add"}
            </button>
          </div>
          
          {/* Error message with proper spacing */}
          {desgError && (
            <div style={styles.errorContainer}>
              <span style={styles.errorText}>{desgError}</span>
            </div>
          )}

          {/* Warning message when the user tried to add while editing */}
          {showDesgEditWarning && !desgError && (
            <div style={styles.warningContainer}>
              <span style={styles.warningText}>⚠️ Complete editing before adding new designation</span>
            </div>
          )}

          <div style={styles.listContainer}>
            {designations.length === 0 ? (
              <div style={styles.emptyState}><p>No designations yet. Add your first designation above.</p></div>
            ) : (
              designations
                .map((desg) => (
                  <div key={desg.id} style={styles.listItem}>
                    {editingDesg === desg.id ? (
                      <div style={styles.editContainer}>
                        <input
                          type="text"
                          value={editDesgName}
                          onChange={(e) => {
                            const rawVal = e.target.value;
                            setEditDesgName(rawVal.replace(/[^A-Za-z ]/g, ""));
                          }}
                          style={styles.editInput}
                          autoFocus
                        />
                        {desgError && editingDesg === desg.id && (
                          <div style={styles.editErrorText}>{desgError}</div>
                        )}
                        <div style={styles.editActions}>
                          <button onClick={() => updateDesignation(desg.id)} style={styles.saveButton} title="Save">✓</button>
                          <button onClick={cancelEdit} style={styles.cancelButton} title="Cancel">✕</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span style={styles.itemText}>{desg.designationName}</span>
                        <div style={styles.actions}>
                          <button 
                            onClick={() => startEditDesg(desg)} 
                            style={{
                              ...styles.editButton,
                              ...(isAnyAddActive ? styles.buttonDisabled : {})
                            }}
                            disabled={isAnyAddActive}
                            title={isAnyAddActive ? "Finish adding first" : "Edit"}
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ======================
   STYLES — Blue + Black/White Theme
   ====================== */
const styles = {
  page: {
    backgroundColor: "#f0f4ff",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  /* ── Banner ── */
  banner: {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(118deg, #0f172a 0%, #1e3a5f 45%, #2563EB 100%)",
    borderRadius: "0 0 20px 20px",
    padding: "36px 36px 32px",
    marginBottom: "32px",
    boxShadow: "0 4px 24px rgba(37,99,235,0.22)",
  },
  bannerCircle1: {
    position: "absolute",
    top: "-60px", right: "120px",
    width: "260px", height: "260px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    pointerEvents: "none",
  },
  bannerCircle2: {
    position: "absolute",
    top: "20px", right: "-40px",
    width: "180px", height: "180px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    pointerEvents: "none",
  },
  bannerTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#ffffff",
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
    position: "relative",
    zIndex: 1,
  },
  bannerSubtitle: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.72)",
    fontWeight: "400",
    margin: 0,
    position: "relative",
    zIndex: 1,
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px 40px",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(37,99,235,0.09)",
    border: "1px solid #e0e8ff",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "2px solid #e0e8ff",
  },

  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },

  badge: {
    backgroundColor: "#dbeafe",
    color: "#1D4ED8",
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "700",
    border: "1px solid #bfdbfe",
  },

  inputGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "8px",
  },

  input: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1.5px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#fff",
    fontFamily: "inherit",
    color: "#111827",
    transition: "border-color 0.2s",
  },

  inputDisabled: {
    backgroundColor: "#f3f4f6",
    cursor: "not-allowed",
    opacity: 0.7,
  },

  addButton: {
    padding: "10px 22px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #0f172a 0%, #2563EB 100%)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 10px rgba(37,99,235,0.28)",
    transition: "all 0.2s ease",
  },

  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
  },

  errorContainer: {
    marginTop: "8px",
    marginBottom: "12px",
    padding: "8px 12px",
    backgroundColor: "#fef2f2",
    borderRadius: "8px",
    border: "1px solid #fee2e2",
  },

  errorText: {
    color: "#dc2626",
    fontSize: "13px",
    fontWeight: "500",
    display: "block",
  },

  editErrorText: {
    color: "#dc2626",
    fontSize: "12px",
    marginTop: "4px",
    marginBottom: "4px",
  },

  warningContainer: {
    marginTop: "8px",
    marginBottom: "12px",
    padding: "8px 12px",
    backgroundColor: "#fffbeb",
    borderRadius: "8px",
    border: "1px solid #fef3c7",
  },

  warningText: {
    color: "#b45309",
    fontSize: "13px",
    fontWeight: "500",
    display: "block",
  },

  listContainer: {
    maxHeight: "450px",
    overflowY: "auto",
    paddingRight: "4px",
    marginTop: "12px",
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 16px",
    marginBottom: "8px",
    borderRadius: "10px",
    backgroundColor: "#f8faff",
    border: "1px solid #e0e8ff",
    transition: "all 0.2s ease",
  },

  itemText: {
    fontSize: "15px",
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  editButton: {
    padding: "7px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #0f172a 0%, #2563EB 100%)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    boxShadow: "0 2px 8px rgba(37,99,235,0.22)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  editContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },

  editInput: {
    width: "100%",
    padding: "9px 14px",
    borderRadius: "8px",
    border: "2px solid #2563EB",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#ffffff",
    fontFamily: "inherit",
    color: "#111827",
  },

  editActions: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },

  saveButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #0f172a 0%, #2563EB 100%)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
    transition: "all 0.2s ease",
  },

  cancelButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #1e293b, #475569)",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },

  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#94a3b8",
    fontSize: "15px",
    background: "#f0f4ff",
    borderRadius: "10px",
    border: "1px dashed #c7d8f8",
  },
};
