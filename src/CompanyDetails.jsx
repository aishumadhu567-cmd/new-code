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

/* ─────────────────────────────────────────────────────────────
   ATS RESUME — A4, black & white, PDF-first
   Layout: screen shows a centred A4 card preview.
   Print/Save-as-PDF uses @page A4 so it maps 1:1.
───────────────────────────────────────────────────────────── */
const generateATSResume = (user, companyData) => {
  const company = companyData?.[0] || null;
  const fmt = (dob) => {
    if (!dob) return "";
    if (Array.isArray(dob)) return `${String(dob[2]).padStart(2,"0")}/${String(dob[1]).padStart(2,"0")}/${dob[0]}`;
    return dob;
  };
  const fullName = [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ");
  const email    = user.email || user.primaryEmail || "";
  const phone    = user.phoneNumber || user.primaryPhoneNumber || "";
  const address  = user.address1 || user.address || "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${fullName} — Resume</title>
<style>
/* ── Google Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ══════════════════════════════════════════
   SCREEN STYLES  — preview shell
══════════════════════════════════════════ */
html {
  background: #c8c8c8;
  min-height: 100%;
}
body {
  font-family: 'Source Sans 3', 'Calibri', 'Arial', sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  color: #111;
  /* centre the A4 card on screen */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px 100px;
  min-height: 100vh;
}

/* ── A4 page card (screen) ── */
.page {
  width: 210mm;           /* exact A4 width */
  min-height: 297mm;      /* exact A4 height */
  background: #fff;
  padding: 18mm 20mm 18mm 20mm;   /* top right bottom left margins */
  box-shadow: 0 6px 40px rgba(0,0,0,.28);
  position: relative;
}

/* ── Typography ── */
.name {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 26pt;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: #000;
  text-transform: uppercase;
  line-height: 1.1;
}
.role-line {
  font-size: 10.5pt;
  font-weight: 600;
  color: #444;
  letter-spacing: 2.2px;
  text-transform: uppercase;
  margin-top: 5px;
}

/* ── Contact strip ── */
.contacts {
  display: flex;
  flex-wrap: wrap;
  gap: 0 22px;
  border-top: 2px solid #000;
  border-bottom: 1px solid #bbb;
  padding: 6px 0;
  margin-top: 11px;
  font-size: 9pt;
  color: #333;
}
.contacts span { white-space: nowrap; }

/* ── Sections ── */
.sec { margin-top: 18px; page-break-inside: avoid; }
.sec-h {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 11.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  border-bottom: 1.5px solid #000;
  padding-bottom: 3px;
  margin-bottom: 10px;
}

/* ── Summary paragraph ── */
.summary { font-size: 10pt; color: #222; line-height: 1.65; }

/* ── Skill block ── */
.skblk { border-left: 3px solid #000; padding-left: 13px; margin-bottom: 10px; }
.sk-name { font-weight: 700; font-size: 10.5pt; }
.sk-meta { font-size: 9pt; color: #555; margin: 2px 0 4px; font-weight: 600; }
.sk-desc { font-size: 9.5pt; color: #333; line-height: 1.5; }

/* ── Work experience ── */
.co-name  { font-weight: 700; font-size: 11pt; text-transform: uppercase; letter-spacing: .5px; }
.co-role  { font-size: 9.5pt; color: #555; margin: 2px 0; font-weight: 600; }
.co-desc  { font-size: 9.5pt; color: #444; font-style: italic; margin: 5px 0 8px; }
.co-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 24px; margin-top: 7px; }
.ci       { font-size: 9pt; color: #333; }
.ci strong{ font-weight: 700; color: #000; }
.ci a     { color: #000; text-decoration: underline; }
.hr-line  { margin-top: 8px; padding-top: 7px; border-top: 1px dashed #bbb;
            display: flex; gap: 22px; font-size: 9pt; }
.hr-line strong { font-weight: 700; }

/* ── Personal details grid ── */
.two  { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 24px; }
.row  { display: flex; gap: 6px; font-size: 9.5pt; }
.lbl  { font-weight: 700; min-width: 120px; flex-shrink: 0; }
.val  { color: #222; }

/* ── Declaration ── */
.decl-p  { font-size: 9.5pt; color: #333; line-height: 1.65; }
.sign    { margin-top: 24px; display: flex; justify-content: space-between; font-size: 9.5pt; color: #444; }

/* ══════════════════════════════════════════
   ACTION BAR  (screen only — hidden on print)
══════════════════════════════════════════ */
.bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 28px;
  height: 56px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 13px;
  z-index: 999;
  border-top: 1px solid #333;
}
.bar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}
.bar-icon { font-size: 18px; flex-shrink: 0; }
.bar-label {
  font-size: 13px;
  font-weight: 500;
  opacity: .75;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.bar-sep {
  width: 1px;
  height: 28px;
  background: #444;
}
.bar button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: none;
  padding: 0 20px;
  height: 36px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 13px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  letter-spacing: .3px;
  transition: all .15s ease;
  white-space: nowrap;
}
/* Download PDF — solid red/primary */
.btn-pdf {
  background: #e53e3e;
  color: #fff;
}
.btn-pdf:hover { background: #c53030; transform: translateY(-1px); }
/* Print — outlined */
.btn-print {
  background: transparent;
  color: #fff;
  border: 1.5px solid rgba(255,255,255,.45) !important;
}
.btn-print:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.8) !important; }
/* Close — ghost */
.btn-close {
  background: transparent;
  color: rgba(255,255,255,.5);
  font-weight: 500;
  padding: 0 12px !important;
  font-size: 12px !important;
}
.btn-close:hover { color: #fff; }

/* ══════════════════════════════════════════
   PRINT / PDF  — maps page exactly to A4
══════════════════════════════════════════ */
@page {
  size: A4 portrait;
  margin: 0;          /* we control margins via .page padding */
}

@media print {
  html { background: #fff; }
  body {
    display: block;
    padding: 0;
    margin: 0;
    background: #fff;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 16mm 18mm;
    box-shadow: none;
    margin: 0;
  }
  .bar { display: none; }
}
</style>
</head>
<body>

<div class="page">

  <!-- ── Header ── -->
  <div class="name">${fullName || "Candidate Name"}</div>
  <div class="role-line">${user.designationName || "Professional"}&nbsp;&nbsp;·&nbsp;&nbsp;${user.departmentName || "Department"}</div>
  <div class="contacts">
    ${email   ? `<span>&#9993; ${email}</span>`   : ""}
    ${phone   ? `<span>&#9990; ${phone}</span>`   : ""}
    ${address ? `<span>&#8962; ${address}</span>` : ""}
    ${user.nationality ? `<span>&#127760; ${user.nationality}</span>` : ""}
  </div>

  <!-- ── Professional Summary ── -->
  <div class="sec">
    <div class="sec-h">Professional Summary</div>
    <p class="summary">
      ${user.designationName || "Dedicated professional"} in ${user.departmentName || "the industry"} with
      ${user.yearsOfExperience || "several"} year${user.yearsOfExperience === 1 ? "" : "s"} of hands-on experience
      in <strong>${user.skillName || "core technologies"}</strong>.
      ${user.skillDescription
        ? `Demonstrated expertise in ${user.skillDescription.slice(0, 160)}${user.skillDescription.length > 160 ? "&hellip;" : ""}`
        : "Committed to delivering high-quality results and contributing to organisational growth."}
    </p>
  </div>

  <!-- ── Skills & Expertise ── -->
  <div class="sec">
    <div class="sec-h">Skills &amp; Expertise</div>
    <div class="skblk">
      <div class="sk-name">${user.skillName || "&mdash;"}</div>
      <div class="sk-meta">${user.yearsOfExperience || 0} Year${user.yearsOfExperience === 1 ? "" : "s"} of Experience&nbsp;&nbsp;|&nbsp;&nbsp;${user.designationName || "Role"}</div>
      ${user.skillDescription ? `<div class="sk-desc">${user.skillDescription}</div>` : ""}
    </div>
  </div>

  <!-- ── Work Experience ── -->
  ${company ? `
  <div class="sec">
    <div class="sec-h">Work Experience</div>
    <div class="co-name">${company.companyName || "Company"}</div>
    <div class="co-role">${user.designationName || "Professional"}&nbsp;&nbsp;·&nbsp;&nbsp;${user.departmentName || "Department"}</div>
    ${company.companyDescription ? `<div class="co-desc">${company.companyDescription}</div>` : ""}
    <div class="co-grid">
      ${company.address           ? `<div class="ci"><strong>Address:</strong> ${company.address}</div>` : ""}
      ${company.primaryEmail      ? `<div class="ci"><strong>Email:</strong> ${company.primaryEmail}</div>` : ""}
      ${company.primaryPhoneNumber? `<div class="ci"><strong>Phone:</strong> ${company.primaryPhoneNumber}</div>` : ""}
      ${company.websiteUrl        ? `<div class="ci"><strong>Website:</strong> <a href="${company.websiteUrl}">${company.websiteUrl}</a></div>` : ""}
      ${company.linkedinUrl       ? `<div class="ci"><strong>LinkedIn:</strong> <a href="${company.linkedinUrl}">View Profile</a></div>` : ""}
      ${company.secondaryEmail    ? `<div class="ci"><strong>Alt Email:</strong> ${company.secondaryEmail}</div>` : ""}
    </div>
    ${(company.hrName || company.hrContactNumber) ? `
    <div class="hr-line">
      <span><strong>HR Contact:</strong> ${company.hrName || "&mdash;"}</span>
      ${company.hrContactNumber ? `<span><strong>HR Phone:</strong> ${company.hrContactNumber}</span>` : ""}
    </div>` : ""}
  </div>` : ""}

  <!-- ── Personal Details ── -->
  <div class="sec">
    <div class="sec-h">Personal Details</div>
    <div class="two">
      ${user.userId        ? `<div class="row"><span class="lbl">Employee ID</span><span class="val">${user.userId}</span></div>` : ""}
      ${user.username      ? `<div class="row"><span class="lbl">Username</span><span class="val">${user.username}</span></div>` : ""}
      ${fmt(user.dob)      ? `<div class="row"><span class="lbl">Date of Birth</span><span class="val">${fmt(user.dob)}</span></div>` : ""}
      ${user.gender        ? `<div class="row"><span class="lbl">Gender</span><span class="val">${user.gender}</span></div>` : ""}
      ${user.nationality   ? `<div class="row"><span class="lbl">Nationality</span><span class="val">${user.nationality}</span></div>` : ""}
      ${user.maritalStatus ? `<div class="row"><span class="lbl">Marital Status</span><span class="val">${user.maritalStatus}</span></div>` : ""}
      ${user.bloodGroup    ? `<div class="row"><span class="lbl">Blood Group</span><span class="val">${user.bloodGroup}</span></div>` : ""}
      ${address            ? `<div class="row"><span class="lbl">Address</span><span class="val">${address}</span></div>` : ""}
    </div>
  </div>

  <!-- ── Declaration ── -->
  <div class="sec">
    <div class="sec-h">Declaration</div>
    <p class="decl-p">I hereby declare that the information furnished above is true and correct to the best of my knowledge and belief.</p>
    <div class="sign">
      <span>Date: &nbsp;_____________________</span>
      <span>Signature: &nbsp;_____________________</span>
    </div>
  </div>

</div><!-- /page -->

<!-- ── Action bar (hidden on print) ── -->
<div class="bar">
  <div class="bar-left">
    <span class="bar-icon">&#128196;</span>
    <span class="bar-label">${fullName} &mdash; </span>
  </div>
  <div class="bar-actions">
    <button class="btn-pdf" onclick="downloadPDF()">&#11123; Download PDF</button>
    <div class="bar-sep"></div>
    <button class="btn-print" onclick="window.print()">&#128424; Print</button>
    <div class="bar-sep"></div>
    <button class="btn-close" onclick="window.close()">&#10005; Close</button>
  </div>
</div>

<script>
function downloadPDF() {
  /* In modern browsers, Ctrl+P → Save as PDF is the standard path.
     We trigger print with a small beforeprint hook to set the title
     so the default filename becomes the candidate name. */
  var orig = document.title;
  document.title = "${fullName.replace(/"/g, "\\\"")}_Resume";
  window.print();
  document.title = orig;
}
</script>

</body>
</html>`;
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   activePanel: null | "add" | "edit" | "search"
   Only ONE panel is visible at a time.
═══════════════════════════════════════════════════════ */
export default function CompanyDetails() {
  const [companies,      setCompanies]      = useState([]);
  const [form,           setForm]           = useState(EMPTY_FORM);
  const [editId,         setEditId]         = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [saving,         setSaving]         = useState(false);
  const [toast,          setToast]          = useState(null);
  const [activePanel,    setActivePanel]    = useState(null);
  const [searchKeyword,  setSearchKeyword]  = useState("");
  const [searchExp,      setSearchExp]      = useState("");
  const [searchResults,  setSearchResults]  = useState([]);
  const [isSearching,    setIsSearching]    = useState(false);
  const [selectedUser,   setSelectedUser]   = useState(null);
  const [creatingResume, setCreatingResume] = useState(false);

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
    e.preventDefault(); setSaving(true);
    try {
      const payload = cleanPayload(form);
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, payload);
        showToast("Company updated successfully!");
      } else {
        await axios.post(API_BASE, payload);
        showToast("Company created successfully!");
      }
      setForm(EMPTY_FORM); setEditId(null); setActivePanel(null);
      fetchCompanies();
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong.", "error");
    } finally { setSaving(false); }
  };

  /* Called from the Edit picker table */
  const handleEdit = (company) => {
    setForm(cleanPayload(company));
    setEditId(company.id);
    setActivePanel("add"); /* switch to the form panel */
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM); setEditId(null); setActivePanel(null);
  };

  /* Toggle exactly ONE panel; switching away resets relevant state */
  const togglePanel = (panel) => {
    if (activePanel === panel) {
      /* close */
      setActivePanel(null);
      if (panel === "add")    { setForm(EMPTY_FORM); setEditId(null); }
      if (panel === "search") { setSelectedUser(null); }
    } else {
      /* open this panel, close others */
      setActivePanel(panel);
      if (panel !== "add")    { setForm(EMPTY_FORM); setEditId(null); }
      if (panel !== "search") { setSelectedUser(null); }
    }
  };

  const handleSearch = async () => {
    setIsSearching(true); setSelectedUser(null);
    try {
      const res = await axios.get("/api/skill/search", {
        params: { keyWord: searchKeyword, yrOfExp: searchExp },
      });
      setSearchResults(Array.isArray(res.data) ? res.data : []);
    } catch { showToast("Search failed", "error"); }
    finally { setIsSearching(false); }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    showToast(`Selected: ${user.firstName} ${user.lastName}`);
  };

  const handleCreateResume = () => {
    if (!selectedUser) { showToast("Please select a user first", "error"); return; }
    setCreatingResume(true);
    try {
      const html = generateATSResume(selectedUser, companies);
      const blob = new Blob([html], { type: "text/html" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url;
      // a.download = `${selectedUser.firstName}_${selectedUser.lastName}_Resume.html`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
      const win = window.open("", "_blank");
      win.document.write(html); win.document.close();
      showToast(`Resume created for ${selectedUser.firstName} ${selectedUser.lastName}!`);
    } catch { showToast("Failed to create resume", "error"); }
    finally { setCreatingResume(false); }
  };

  const getInitials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "CO";

  const companyExists = companies.length > 0;

  /* ─────────────── RENDER ─────────────── */
  return (
    <div className="cd-root">

      {toast && (
        <div className={`cd-toast cd-toast--${toast.type}`}>
          <span className="cd-toast-dot" />{toast.msg}
        </div>
      )}

      {/* ── Hero ── */}
      <div className="cd-hero">
        <div className="cd-hero-circle3" />
        <div className="cd-hero-content">
          <h1 className="cd-hero-title">Company Management</h1>
          <p className="cd-hero-sub">
            Manage your organisation's profile, contact details, and HR information
          </p>

          <div className="cd-hero-actions">

            {/* ─ Add Company ─ */}
            <button
              className={`cd-btn ${
                activePanel === "add"
                  ? "cd-btn--ghost-white"
                  : companyExists
                  ? "cd-btn--ghost-white cd-btn--disabled"
                  : "cd-btn--primary"
              }`}
              onClick={() => {
                if (activePanel === "add") { handleCancel(); return; }
                if (companyExists) { showToast("A company already exists. Edit it instead.", "error"); return; }
                togglePanel("add");
              }}
              title={companyExists && activePanel !== "add" ? "A company already exists. Edit it instead." : ""}
            >
              {activePanel === "add" ? "✕ Cancel" : "+ Add Company"}
            </button>

            {/* ─ Edit Company ─ */}
            <button
              className={`cd-btn ${activePanel === "edit" ? "cd-btn--primary" : "cd-btn--ghost-white"}`}
              onClick={() => togglePanel("edit")}
            >
              {activePanel === "edit" ? "✕ Close Edit" : "✏️ Edit Company"}
            </button>

            {/* ─ Search ─ */}
            <button
              className={`cd-btn ${activePanel === "search" ? "cd-btn--primary" : "cd-btn--ghost-white"}`}
              onClick={() => togglePanel("search")}
            >
              {activePanel === "search" ? "✕ Close Search" : "🔍 Search"}
            </button>

            {/* ─ Create Resume (only when candidate selected in search panel) ─ */}
            {selectedUser && activePanel === "search" && (
              <button
                className="cd-btn cd-btn--primary"
                onClick={handleCreateResume}
                disabled={creatingResume}
              >
                {creatingResume
                  ? <><span className="cd-spinner" /> Creating…</>
                  : "📄 Create Resume"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="cd-body">

        {/* ══════════════ PANEL: ADD / EDIT FORM ══════════════ */}
        {activePanel === "add" && (
          <div className="cd-form-card">
            <div className="cd-form-header">
              <div>
                <div className="cd-form-header-title">{editId ? "Edit Company" : "New Company"}</div>
                <div className="cd-form-header-sub">
                  {editId ? `Updating record ${editId}` : "Fill in the company details below"}
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
                  {f.full
                    ? <textarea name={f.name} className="cd-input cd-textarea"
                        placeholder={f.placeholder} value={form[f.name]}
                        onChange={handleChange} rows={2} />
                    : <input name={f.name} className="cd-input"
                        placeholder={f.placeholder} value={form[f.name]}
                        onChange={handleChange} required={f.required} />}
                </div>
              ))}
              <div className="cd-form-actions">
                <button type="submit" className="cd-btn cd-btn--blue cd-btn--lg" disabled={saving}>
                  {saving
                    ? <><span className="cd-spinner" /> Saving…</>
                    : editId ? "💾  Update Company" : "✓  Create Company"}
                </button>
                <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════════ PANEL: EDIT PICKER TABLE ══════════════
            Shows ALL company fields so nothing is hidden.
            Horizontal scroll is enabled via cd-table-wrap.
        ═══════════════════════════════════════════════════════ */}
        {activePanel === "edit" && (
          <>
            <div className="cd-section-header">
              <span className="cd-section-title">Select a Company to Edit</span>
              <span className="cd-count-badge">{companies.length}</span>
              <span style={{ fontSize: 12, color: "var(--tx-3)", marginLeft: 8 }}>
                Scroll right to see all columns →
              </span>
            </div>

            {loading ? (
              <div className="cd-loading">
                <div className="cd-loading-ring" /><span>Loading companies…</span>
              </div>
            ) : companies.length === 0 ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">🏢</div>
                <div className="cd-empty-title">No companies yet</div>
                <div className="cd-empty-sub">Click "Add Company" to create your first entry</div>
              </div>
            ) : (
              <div className="cd-table-wrap">
                {/* cd-table--full renders all 12 columns with horizontal scroll */}
                <table className="cd-table cd-table--full">
                  <colgroup>
                    <col style={{ width: 44 }} />   {/* # */}
                    <col style={{ width: 180 }} />  {/* company */}
                    <col style={{ width: 200 }} />  {/* description */}
                    <col style={{ width: 200 }} />  {/* address */}
                    <col style={{ width: 175 }} />  {/* primary email */}
                    <col style={{ width: 175 }} />  {/* secondary email */}
                    <col style={{ width: 140 }} />  {/* primary phone */}
                    <col style={{ width: 140 }} />  {/* secondary phone */}
                    <col style={{ width: 150 }} />  {/* website */}
                    <col style={{ width: 150 }} />  {/* linkedin */}
                    <col style={{ width: 130 }} />  {/* hr name */}
                    <col style={{ width: 130 }} />  {/* hr contact */}
                    <col style={{ width: 90 }} />   {/* action */}
                  </colgroup>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Company</th>
                      <th>Description</th>
                      <th>Address</th>
                      <th>Primary Email</th>
                      <th>Secondary Email</th>
                      <th>Primary Phone</th>
                      <th>Secondary Phone</th>
                      <th>Website</th>
                      <th>LinkedIn</th>
                      <th>HR Name</th>
                      <th>HR Contact</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((c, i) => (
                      <tr key={c.id || i} className="cd-tr">
                        <td className="cd-td-num">{i + 1}</td>

                        {/* Company with avatar */}
                        <td>
                          <div className="cd-name-cell">
                            <div className="cd-avatar">{getInitials(c.companyName)}</div>
                            <span className="cd-co-name">{c.companyName || "—"}</span>
                          </div>
                        </td>

                        {/* Description — wraps, capped width */}
                        <td style={{ whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.45, maxWidth: 200 }}>
                          {c.companyDescription || "—"}
                        </td>

                        {/* Address */}
                        <td style={{ whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.45, maxWidth: 200 }}>
                          {c.address || "—"}
                        </td>

                        <td className="cd-td-blue cd-td-nowrap">{c.primaryEmail || "—"}</td>
                        <td className="cd-td-nowrap">{c.secondaryEmail || "—"}</td>
                        <td className="cd-td-nowrap">{c.primaryPhoneNumber || "—"}</td>
                        <td className="cd-td-nowrap">{c.secondaryPhoneNumber || "—"}</td>

                        {/* Website */}
                        <td className="cd-td-nowrap">
                          {c.websiteUrl
                            ? <a href={c.websiteUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Visit</a>
                            : "—"}
                        </td>

                        {/* LinkedIn */}
                        <td className="cd-td-nowrap">
                          {c.linkedinUrl
                            ? <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className="cd-link">↗ Profile</a>
                            : "—"}
                        </td>

                        {/* HR */}
                        <td className="cd-hr-name cd-td-nowrap">{c.hrName || "—"}</td>
                        <td className="cd-td-nowrap">{c.hrContactNumber || "—"}</td>

                        {/* Action */}
                        <td className="cd-td-nowrap">
                          <button className="cd-btn cd-btn--edit" onClick={() => handleEdit(c)}>
                            ✏️ Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ══════════════ PANEL: SEARCH ══════════════ */}
        {activePanel === "search" && (
          <>
            {/* Search bar */}
            <div className="cd-search-bar">
              <input
                type="text"
                placeholder="Search by skill (e.g. Python)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="cd-input"
              />
              <input
                type="number"
                placeholder="Min. Years of Experience"
                value={searchExp}
                onChange={(e) => setSearchExp(e.target.value)}
                className="cd-input"
                style={{ maxWidth: 210 }}
              />
              <button className="cd-btn cd-btn--blue" onClick={handleSearch}>
                🔍 Search
              </button>
            </div>

            {/* Results */}
            {isSearching ? (
              <div className="cd-loading"><div className="cd-loading-ring" /><span>Searching…</span></div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="cd-section-header">
                  <span className="cd-section-title">Search Results</span>
                  <span className="cd-count-badge">{searchResults.length} found</span>
                  {selectedUser && (
                    <span className="cd-selected-badge">
                      ✓ {selectedUser.firstName} {selectedUser.lastName} selected
                    </span>
                  )}
                </div>

                {!selectedUser && (
                  <p style={{ fontSize: 12.5, color: "var(--tx-3)", marginBottom: 10 }}>
                    Click a row to select a candidate, then click <strong>📄 Create Resume</strong> above.
                  </p>
                )}

                <div className="cd-table-wrap">
                  <table className="cd-table cd-table--wide">
                    <colgroup>
                      <col style={{ width: 44 }} />
                      <col style={{ width: 38 }} />
                      <col style={{ width: 72 }} />
                      <col style={{ width: 100 }} />
                      <col style={{ width: 180 }} />
                      <col style={{ width: 72 }} />
                      <col style={{ width: 96 }} />
                      <col style={{ width: 130 }} />
                      <col style={{ width: 130 }} />
                      <col style={{ width: 120 }} />
                      <col style={{ width: 78 }} />
                      <col style={{ width: 96 }} />
                      <col style={{ width: 100 }} />
                      <col style={{ width: 76 }} />
                      <col style={{ width: 160 }} />
                      <col style={{ width: 200 }} />
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
                        const isSel = selectedUser?.userId === user.userId;
                        return (
                          <tr
                            key={i}
                            className={`cd-tr${isSel ? " cd-tr--selected" : ""}`}
                            onClick={() => handleSelectUser(user)}
                            style={{ cursor: "pointer" }}
                          >
                            <td className="cd-td-num">{i + 1}</td>
                            <td style={{ textAlign: "center", padding: "14px 8px" }}>
                              <input
                                type="radio"
                                name="selectedUser"
                                checked={isSel}
                                onChange={() => handleSelectUser(user)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </td>
                            <td className="cd-td-nowrap">{user.userId}</td>
                            <td className="cd-td-blue cd-td-nowrap">{user.username}</td>
                            <td>
                              <div className="cd-name-cell">
                                <div className="cd-avatar cd-avatar--sm">
                                  {getInitials(`${user.firstName||""} ${user.lastName||""}`)}
                                </div>
                                <span className="cd-co-name" style={{ fontSize: 13 }}>
                                  {user.firstName} {user.middleName||""} {user.lastName}
                                </span>
                              </div>
                            </td>
                            <td className="cd-td-nowrap">{user.gender||"—"}</td>
                            <td className="cd-td-nowrap">
                              {user.dob
                                ? `${String(user.dob[2]).padStart(2,"0")}/${String(user.dob[1]).padStart(2,"0")}/${user.dob[0]}`
                                : "—"}
                            </td>
                            <td style={{ whiteSpace: "normal", wordBreak: "break-word", maxWidth: 130 }}>
                              {user.departmentName||"—"}
                            </td>
                            <td style={{ whiteSpace: "normal", wordBreak: "break-word", maxWidth: 130 }}>
                              {user.designationName||"—"}
                            </td>
                            <td>
                              {user.skillName
                                ? <span className="cd-skill-tag">{user.skillName}</span>
                                : "—"}
                            </td>
                            <td className="cd-td-nowrap">
                              {user.yearsOfExperience != null
                                ? <span className="cd-exp-badge">{user.yearsOfExperience} yr{user.yearsOfExperience!==1?"s":""}</span>
                                : "—"}
                            </td>
                            <td className="cd-td-nowrap">{user.nationality||"—"}</td>
                            <td className="cd-td-nowrap">{user.maritalStatus||"—"}</td>
                            <td className="cd-td-nowrap">{user.bloodGroup||"—"}</td>
                            <td style={{ whiteSpace: "normal", wordBreak: "break-word", minWidth: 140, lineHeight: 1.4 }}>
                              {user.address1||"—"}
                            </td>
                            <td style={{ whiteSpace: "normal", wordBreak: "break-word", minWidth: 180, fontSize: 12.5, lineHeight: 1.4 }}>
                              {user.skillDescription||"—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : searchKeyword && !isSearching ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">🔍</div>
                <div className="cd-empty-title">No results found</div>
                <div className="cd-empty-sub">Try a different skill or experience level</div>
              </div>
            ) : null}
          </>
        )}

      </div>{/* /body */}
    </div>
  );
}
