// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./HolidayCalendar.css";

// export default function HolidayCalendar() {
//   const [types, setTypes] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [holidays, setHolidays] = useState([]);

//   // Date filter state
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   // Editing state
//   const [editingId, setEditingId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // New type/location inputs
//   const [newType, setNewType] = useState("");
//   const [newLocation, setNewLocation] = useState("");

//   // Form state
//   const [form, setForm] = useState({
//     holidayName: "",
//     holidayDate: "",
//     holidayTypeId: "",
//     holidayLocationId: ""
//   });

//   const [toast, setToast] = useState({ message: "", type: "" });

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast({ message: "", type: "" }), 3600);
//   };

//   // Load all data on mount
//   useEffect(() => {
//     loadAllData();
//   }, []);

//   const loadAllData = async () => {
//     try {
//       const typeRes = await axios.get(`/api/hr/holidaymaster`, {
//         withCredentials: true
//       });
//       const locRes = await axios.get(`/api/hr/holidaylocation`, {
//         withCredentials: true
//       });
//       const holidayRes = await axios.get(`/api/hr/holiday`, {
//         withCredentials: true
//       });

//       setTypes(Array.isArray(typeRes.data) ? typeRes.data : []);
//       setLocations(Array.isArray(locRes.data) ? locRes.data : []);
//       setHolidays(Array.isArray(holidayRes.data) ? holidayRes.data : []);
//     } catch (err) {
//       console.error("Data load error:", err);
//       setTypes([]);
//       setLocations([]);
//       setHolidays([]);
//     }
//   };

//   // ----- Date helpers (handle YYYYMMDD number or string) -----
//   const parseHolidayDate = (rawDate) => {
//     if (!rawDate) return null;
//     if (!isNaN(rawDate) && rawDate.toString().length === 8) {
//       const str = rawDate.toString();
//       return new Date(`${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`);
//     }
//     return new Date(rawDate);
//   };

//   const formatDate = (rawDate) => {
//     const date = parseHolidayDate(rawDate);
//     if (!date || isNaN(date)) return "Invalid";
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   // ----- Frontend filtering -----
//   const getFilteredHolidays = () => {
//     if (!fromDate || !toDate) return holidays;
//     const from = new Date(fromDate);
//     const to = new Date(toDate);
//     return holidays.filter(h => {
//       const holidayDate = parseHolidayDate(h.holidayDate || h.date);
//       return holidayDate && holidayDate >= from && holidayDate <= to;
//     });
//   };

//   // ----- Add new type -----
//   const addNewType = async () => {
//     if (!newType.trim()) return;
//     try {
//       const res = await axios.post(
//         `/api/hr/holidaymaster`,
//         { holidayType: newType },
//         { withCredentials: true }
//       );
//       if (res.data?.htId) {
//         setForm({ ...form, holidayTypeId: res.data.htId.toString() });
//       }
//       setNewType("");
//       loadAllData();
//     } catch (error) {
//       console.error("Error adding type:", error);
//     }
//   };

//   // ----- Add new location -----
//   const addNewLocation = async () => {
//     if (!newLocation.trim()) return;
//     try {
//       const res = await axios.post(
//         `/api/hr/holidaylocation`,
//         { locationName: newLocation },
//         { withCredentials: true }
//       );
//       if (res.data?.hlId) {
//         setForm({ ...form, holidayLocationId: res.data.hlId.toString() });
//       }
//       setNewLocation("");
//       loadAllData();
//     } catch (error) {
//       console.error("Error adding location:", error);
//     }
//   };

//   // ----- Save holiday (create or update) -----
//   const saveHoliday = async () => {
//     if (!form.holidayName || !form.holidayDate) {
//       showToast("Enter name & date", "error");
//       return;
//     }
//     if (!form.holidayTypeId || !form.holidayLocationId) {
//       showToast("Select type & location", "error");
//       return;
//     }

//     try {
//       if (isEditing && editingId) {
//         await axios.put(
//           `/api/hr/holiday/${editingId}`,
//           {
//             holidayName: form.holidayName,
//             holidayDate: form.holidayDate,
//             holidayTypeId: Number(form.holidayTypeId),
//             holidayLocationId: Number(form.holidayLocationId)
//           },
//           { withCredentials: true }
//         );
//         showToast("✅ Holiday Updated", "success");
//       } else {
//         await axios.post(
//           `/api/hr/holiday`,
//           {
//             holidayName: form.holidayName,
//             holidayDate: form.holidayDate,
//             holidayTypeId: Number(form.holidayTypeId),
//             holidayLocationId: Number(form.holidayLocationId)
//           },
//           { withCredentials: true }
//         );
//         showToast("✅ Holiday Added", "success");
//       }
//       resetForm();
//       loadAllData();
//     } catch (error) {
//       console.error("Error saving holiday:", error);
//       showToast("Error saving holiday", "error");
//     }
//   };

//   // ----- Edit holiday -----
//   const editHoliday = (holiday) => {
//     const holidayId = holiday.id || holiday.holidayId || holiday.hId;
//     if (!holidayId) {
//       alert("Cannot edit: Holiday ID not found");
//       return;
//     }
//     setForm({
//       holidayName: holiday.holidayName || "",
//       holidayDate: holiday.holidayDate || "",
//       holidayTypeId: holiday.holidayTypeId ? holiday.holidayTypeId.toString() : "",
//       holidayLocationId: holiday.holidayLocationId ? holiday.holidayLocationId.toString() : ""
//     });
//     setEditingId(holidayId);
//     setIsEditing(true);
//   };

//   // ----- Delete holiday -----
//   const deleteHoliday = async (holiday) => {
//     if (!window.confirm("Are you sure you want to delete this holiday?")) return;
//     const holidayId = holiday.id || holiday.holidayId || holiday.hId;
//     if (!holidayId) {
//       alert("Cannot delete: Holiday ID not found");
//       return;
//     }
//     try {
//       await axios.delete(`/api/hr/holiday/${holidayId}`, { withCredentials: true });
//       alert("✅ Holiday Deleted");
//       loadAllData();
//     } catch (error) {
//       console.error("Error deleting holiday:", error);
//       alert("Error deleting holiday");
//     }
//   };

//   // ----- Reset form -----
//   const resetForm = () => {
//     setForm({
//       holidayName: "",
//       holidayDate: "",
//       holidayTypeId: "",
//       holidayLocationId: ""
//     });
//     setEditingId(null);
//     setIsEditing(false);
//   };

//   // ----- Lookup helpers -----
//   const getTypeName = (typeId) => {
//     const type = types.find(t => t.htId == typeId || t.id == typeId);
//     return type ? type.holidayType || type.type : "Unknown";
//   };

//   const getLocationName = (locationId) => {
//     const location = locations.find(l => l.hlId == locationId || l.id == locationId);
//     return location ? location.locationName || location.name : "Unknown";
//   };

//   const filteredHolidays = getFilteredHolidays();

//   return (
//     <div className="holiday-container">
//       {/* Date Filter Row */}
      

//       {/* Add/Edit Holiday Card */}
//       <div className="holiday-card">
//         {toast.message && (
//           <div className={`toast ${toast.type === "error" ? "error" : "success"}`}>
//             {toast.message}
//           </div>
//         )}
//         <div className="row">
//           <input
//             placeholder="Holiday Name"
//             value={form.holidayName}
//             onChange={e => setForm({ ...form, holidayName: e.target.value })}
//           />
//           <input
//             type="date"
//             value={form.holidayDate}
//             onChange={e => setForm({ ...form, holidayDate: e.target.value })}
//           />
//         </div>

//         {/* Holiday Type */}
//         <div className="row">
//           <select
//             value={form.holidayTypeId}
//             onChange={e => setForm({ ...form, holidayTypeId: e.target.value })}
//           >
//             <option value="">Select Type</option>
//             {types.map(t => (
//               <option key={t.htId || t.id} value={t.htId || t.id}>
//                 {t.holidayType || t.type}
//               </option>
//             ))}
//           </select>

//           <input
//             placeholder="Add new type"
//             value={newType}
//             onChange={e => setNewType(e.target.value)}
//           />
//           <button onClick={addNewType}>Add</button>
//         </div>

//         {/* Location */}
//         <div className="row">
//           <select
//             value={form.holidayLocationId}
//             onChange={e => setForm({ ...form, holidayLocationId: e.target.value })}
//           >
//             <option value="">Select Location</option>
//             {locations.map(l => (
//               <option key={l.hlId || l.id} value={l.hlId || l.id}>
//                 {l.locationName || l.name}
//               </option>
//             ))}
//           </select>

//           <input
//             placeholder="Add new location"
//             value={newLocation}
//             onChange={e => setNewLocation(e.target.value)}
//           />
//           <button onClick={addNewLocation}>Add</button>
//         </div>

//         <div className="button-row">
//           <button onClick={saveHoliday} className="save-btn">
//             {isEditing ? "Update Holiday" : "Save Holiday"}
//           </button>
//           {isEditing && (
//             <button onClick={resetForm} className="cancel-btn">
//               Cancel Edit
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Holiday List */}
//       <div className="holiday-list">
//         <h2>Holiday List</h2>
//         {filteredHolidays.length === 0 ? (
//           <p>No holidays found</p>
//         ) : (
//           <table className="holiday-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Type</th>
//                 <th>Location</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredHolidays.map((holiday, index) => {
//                 const holidayId = holiday.id || holiday.holidayId || holiday.hId || index;
//                 return (
//                   <tr key={holidayId}>
//                     <td>{holiday.holidayName || holiday.name}</td>
//                     <td>{formatDate(holiday.holidayDate || holiday.date)}</td>
//                     <td>{getTypeName(holiday.holidayTypeId || holiday.typeId)}</td>
//                     <td>{getLocationName(holiday.holidayLocationId || holiday.locationId)}</td>
//                     <td>
//                       <button onClick={() => editHoliday(holiday)} className="edit-btn">
//                         Edit
//                       </button>
                     
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hc-page {
    font-family: 'Nunito', sans-serif;
    background: #f1f5f9;
    min-height: 100vh;
    padding: 0 0 40px 0;
  }

  /* ── Header Banner ── */
  .hc-header {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e40af 100%);
    padding: 28px 36px 26px;
    border-radius: 0 0 20px 20px;
    margin-bottom: 28px;
    box-shadow: 0 4px 24px rgba(30,64,175,0.18);
  }
  .hc-header h1 {
    color: #fff;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
  }
  .hc-header p {
    color: #94a3b8;
    font-size: 14px;
    font-weight: 500;
  }

  /* ── Body wrapper ── */
  .hc-body {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── Card ── */
  .hc-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    padding: 28px 32px;
    margin-bottom: 24px;
  }
  .hc-card-title {
    font-size: 16px;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hc-card-title span.dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #2563eb;
    display: inline-block;
  }

  /* ── Form grid ── */
  .hc-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 24px;
  }
  .hc-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .hc-field label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #64748b;
  }
  .hc-field input,
  .hc-field select {
    padding: 10px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #1e293b;
    background: #f8fafc;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .hc-field input:focus,
  .hc-field select:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
    background: #fff;
  }
  .hc-field input::placeholder { color: #cbd5e1; }

  /* inline add-new row */
  .hc-inline {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .hc-inline input {
    flex: 1;
    padding: 10px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    color: #1e293b;
    background: #f8fafc;
    outline: none;
  }
  .hc-inline input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
    background: #fff;
  }
  .hc-btn-add {
    padding: 10px 16px;
    background: #eff6ff;
    color: #2563eb;
    border: 1.5px solid #bfdbfe;
    border-radius: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }
  .hc-btn-add:hover { background: #dbeafe; }

  /* ── Action buttons ── */
  .hc-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }
  .hc-btn-save {
    padding: 11px 28px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    border: none;
    border-radius: 9px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(37,99,235,0.3);
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .hc-btn-save:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(37,99,235,0.35);
  }
  .hc-btn-cancel {
    padding: 11px 22px;
    background: #fff;
    color: #64748b;
    border: 1.5px solid #e2e8f0;
    border-radius: 9px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .hc-btn-cancel:hover { border-color: #94a3b8; color: #1e293b; }

  /* ── Date Filter Row ── */
  .hc-filter-row {
    display: flex;
    gap: 16px;
    align-items: flex-end;
    margin-bottom: 0;
  }
  .hc-filter-row .hc-field { flex: 1; }
  .hc-btn-filter {
    padding: 10px 20px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    height: 42px;
  }
  .hc-btn-filter:hover { background: #1d4ed8; }
  .hc-btn-reset {
    padding: 10px 16px;
    background: #f1f5f9;
    color: #64748b;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    height: 42px;
    transition: all 0.2s;
  }
  .hc-btn-reset:hover { border-color: #94a3b8; }

  /* ── Toast ── */
  .hc-toast {
    padding: 12px 16px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideIn 0.3s ease;
  }
  .hc-toast.success { background: #d1fae5; color: #065f46; border: 1.5px solid #6ee7b7; }
  .hc-toast.error   { background: #fee2e2; color: #991b1b; border: 1.5px solid #fca5a5; }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Table ── */
  .hc-table-wrap { overflow-x: auto; }
  .hc-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .hc-table thead tr {
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    color: #fff;
  }
  .hc-table th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .hc-table td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #334155;
    font-weight: 500;
  }
  .hc-table tbody tr:hover { background: #f8fafc; }
  .hc-table tbody tr:last-child td { border-bottom: none; }

  .hc-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
  }
  .hc-badge-type { background: #eff6ff; color: #2563eb; }
  .hc-badge-loc  { background: #f0fdf4; color: #15803d; }

  .hc-btn-edit {
    padding: 6px 14px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    margin-right: 6px;
    transition: all 0.2s;
  }
  .hc-btn-edit:hover { background: #1d4ed8; }
  .hc-btn-del {
    padding: 6px 14px;
    background: #fff;
    color: #ef4444;
    border: 1.5px solid #fca5a5;
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .hc-btn-del:hover { background: #fee2e2; }

  .hc-empty {
    text-align: center;
    padding: 40px;
    color: #94a3b8;
    font-size: 15px;
    font-weight: 600;
  }

  .hc-section-label {
    font-size: 12px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .hc-divider { border: none; border-top: 1px solid #f1f5f9; margin: 20px 0; }
`;

export default function HolidayCalendar() {
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newType, setNewType] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [form, setForm] = useState({ holidayName: "", holidayDate: "", holidayTypeId: "", holidayLocationId: "" });
  const [toast, setToast] = useState({ message: "", type: "" });
  const formRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3600);
  };

  useEffect(() => { loadAllData(); }, []);

  const loadAllData = async () => {
    try {
      const [typeRes, locRes, holidayRes] = await Promise.all([
        axios.get(`/api/hr/holidaymaster`, { withCredentials: true }),
        axios.get(`/api/hr/holidaylocation`, { withCredentials: true }),
        axios.get(`/api/hr/holiday`, { withCredentials: true }),
      ]);
      setTypes(Array.isArray(typeRes.data) ? typeRes.data : []);
      setLocations(Array.isArray(locRes.data) ? locRes.data : []);
      setHolidays(Array.isArray(holidayRes.data) ? holidayRes.data : []);
    } catch (err) {
      console.error("Data load error:", err);
      setTypes([]); setLocations([]); setHolidays([]);
    }
  };

  const parseHolidayDate = (rawDate) => {
    if (!rawDate) return null;
    if (!isNaN(rawDate) && rawDate.toString().length === 8) {
      const s = rawDate.toString();
      return new Date(`${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6,8)}`);
    }
    return new Date(rawDate);
  };

  const formatDate = (rawDate) => {
    const date = parseHolidayDate(rawDate);
    if (!date || isNaN(date)) return "—";
    return `${String(date.getDate()).padStart(2,"0")}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getFullYear()}`;
  };

  const getFilteredHolidays = () => {
    if (!fromDate || !toDate) return holidays;
    const from = new Date(fromDate), to = new Date(toDate);
    return holidays.filter(h => {
      const d = parseHolidayDate(h.holidayDate || h.date);
      return d && d >= from && d <= to;
    });
  };

  const addNewType = async () => {
    if (!newType.trim()) return;
    try {
      const res = await axios.post(`/api/hr/holidaymaster`, { holidayType: newType }, { withCredentials: true });
      if (res.data?.htId) setForm(f => ({ ...f, holidayTypeId: res.data.htId.toString() }));
      setNewType(""); loadAllData();
    } catch (e) { console.error(e); }
  };

  const addNewLocation = async () => {
    if (!newLocation.trim()) return;
    try {
      const res = await axios.post(`/api/hr/holidaylocation`, { locationName: newLocation }, { withCredentials: true });
      if (res.data?.hlId) setForm(f => ({ ...f, holidayLocationId: res.data.hlId.toString() }));
      setNewLocation(""); loadAllData();
    } catch (e) { console.error(e); }
  };

  const saveHoliday = async () => {
    if (!form.holidayName || !form.holidayDate) { showToast("Enter name & date", "error"); return; }
    if (!form.holidayTypeId || !form.holidayLocationId) { showToast("Select type & location", "error"); return; }
    try {
      const payload = {
        holidayName: form.holidayName,
        holidayDate: form.holidayDate,
        holidayTypeId: Number(form.holidayTypeId),
        holidayLocationId: Number(form.holidayLocationId)
      };
      if (isEditing && editingId) {
        await axios.put(`/api/hr/holiday/${editingId}`, payload, { withCredentials: true });
        showToast("✅ Holiday Updated", "success");
      } else {
        await axios.post(`/api/hr/holiday`, payload, { withCredentials: true });
        showToast("✅ Holiday Added", "success");
      }
      resetForm(); loadAllData();
    } catch (e) { console.error(e); showToast("Error saving holiday", "error"); }
  };

  const editHoliday = (h) => {
    const id = h.id || h.holidayId || h.hId;
    if (!id) { alert("Cannot edit: ID not found"); return; }
    setForm({ holidayName: h.holidayName || "", holidayDate: h.holidayDate || "", holidayTypeId: h.holidayTypeId?.toString() || "", holidayLocationId: h.holidayLocationId?.toString() || "" });
    setEditingId(id);
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isEditing]);

  const deleteHoliday = async (h) => {
    if (!window.confirm("Delete this holiday?")) return;
    const id = h.id || h.holidayId || h.hId;
    if (!id) { alert("Cannot delete: ID not found"); return; }
    try {
      await axios.delete(`/api/hr/holiday/${id}`, { withCredentials: true });
      showToast("✅ Holiday Deleted", "success"); loadAllData();
    } catch (e) { console.error(e); showToast("Error deleting holiday", "error"); }
  };

  const resetForm = () => {
    setForm({ holidayName: "", holidayDate: "", holidayTypeId: "", holidayLocationId: "" });
    setEditingId(null); setIsEditing(false);
  };

  const getTypeName = (id) => {
    const t = types.find(t => t.htId == id || t.id == id);
    return t ? (t.holidayType || t.type) : "—";
  };
  const getLocationName = (id) => {
    const l = locations.find(l => l.hlId == id || l.id == id);
    return l ? (l.locationName || l.name) : "—";
  };

  const filtered = getFilteredHolidays();

  return (
    <>
      <style>{styles}</style>
      <div className="hc-page">

        {/* Header */}
        <div className="hc-header">
          <h1>Holiday Calendar</h1>
          <p>Manage company holidays — add, edit, and filter by date range</p>
        </div>

        <div className="hc-body">

  

          {/* Add / Edit Card */}
          <div className="hc-card" ref={formRef}>
            <div className="hc-card-title">
              
              {isEditing ? "✏️ Edit Holiday" : "Add New Holiday"}
            </div>

            {toast.message && (
              <div className={`hc-toast ${toast.type}`}>{toast.message}</div>
            )}

            <div className="hc-form-grid">
              <div className="hc-field">
                <label>Holiday Name</label>
                <input placeholder="e.g., Republic Day" value={form.holidayName} onChange={e => setForm({ ...form, holidayName: e.target.value })} />
              </div>
              <div className="hc-field">
                <label>Holiday Date</label>
                <input type="date" value={form.holidayDate} onChange={e => setForm({ ...form, holidayDate: e.target.value })} />
              </div>
            </div>

            <hr className="hc-divider" />

            <div className="hc-section-label">Holiday Type</div>
            <div className="hc-form-grid" style={{ marginBottom: 18 }}>
              <div className="hc-field">
                <label>Select Type</label>
                <select value={form.holidayTypeId} onChange={e => setForm({ ...form, holidayTypeId: e.target.value })}>
                  <option value="">— Select Holiday Type —</option>
                  {types.map(t => (
                    <option key={t.htId || t.id} value={t.htId || t.id}>{t.holidayType || t.type}</option>
                  ))}
                </select>
              </div>
              <div className="hc-field">
                <label>Add New Type</label>
                <div className="hc-inline">
                  <input placeholder="Type name (e.g., National)" value={newType} onChange={e => setNewType(e.target.value)} />
                  <button className="hc-btn-add" onClick={addNewType}>+ Add</button>
                </div>
              </div>
            </div>

            <div className="hc-section-label">Holiday Location</div>
            <div className="hc-form-grid">
              <div className="hc-field">
                <label>Select Location</label>
                <select value={form.holidayLocationId} onChange={e => setForm({ ...form, holidayLocationId: e.target.value })}>
                  <option value="">— Select Location —</option>
                  {locations.map(l => (
                    <option key={l.hlId || l.id} value={l.hlId || l.id}>{l.locationName || l.name}</option>
                  ))}
                </select>
              </div>
              <div className="hc-field">
                <label>Add New Location</label>
                <div className="hc-inline">
                  <input placeholder="Location (e.g., Mumbai)" value={newLocation} onChange={e => setNewLocation(e.target.value)} />
                  <button className="hc-btn-add" onClick={addNewLocation}>+ Add</button>
                </div>
              </div>
            </div>

            <div className="hc-actions">
              <button className="hc-btn-save" onClick={saveHoliday}>
                {isEditing ? "Update Holiday" : "Save Holiday"}
              </button>
              {isEditing && (
                <button className="hc-btn-cancel" onClick={resetForm}>✕ Cancel Edit</button>
              )}
            </div>
          </div>

          {/* Holiday List */}
          <div className="hc-card">
            <div className="hc-card-title"><span className></span>Holiday List </div>
            {filtered.length === 0 ? (
              <div className="hc-empty">No holidays found.</div>
            ) : (
              <div className="hc-table-wrap">
                <table className="hc-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Holiday Name</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((h, i) => {
                      const id = h.id || h.holidayId || h.hId || i;
                      return (
                        <tr key={id}>
                          <td style={{ color: "#94a3b8", fontWeight: 700 }}>{i + 1}</td>
                          <td style={{ fontWeight: 700, color: "#1e293b" }}>{h.holidayName || h.name}</td>
                          <td>{formatDate(h.holidayDate || h.date)}</td>
                          <td><span className="hc-badge hc-badge-type">{getTypeName(h.holidayTypeId || h.typeId)}</span></td>
                          <td><span className="hc-badge hc-badge-loc">{getLocationName(h.holidayLocationId || h.locationId)}</span></td>
                          <td>
                            <button className="hc-btn-edit" onClick={() => editHoliday(h)}> Edit</button>
                            
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
