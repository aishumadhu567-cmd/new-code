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
  { name: "companyName",          label: "Company Name",    placeholder: "HR Nexus Technologies",         icon: "🏢", required: true },
  { name: "websiteUrl",           label: "Website URL",     placeholder: "https://yourcompany.com",        icon: "🌐" },
  { name: "address",              label: "Address",         placeholder: "100, Tech Park, Bengaluru",      icon: "📍" },
  { name: "linkedinUrl",          label: "LinkedIn URL",    placeholder: "https://linkedin.com/company/…", icon: "🔗" },
  { name: "primaryEmail",         label: "Primary Email",   placeholder: "info@company.in",                icon: "✉️" },
  { name: "secondaryEmail",       label: "Secondary Email", placeholder: "hr@company.in",                  icon: "✉️" },
  { name: "primaryPhoneNumber",   label: "Primary Phone",   placeholder: "+91 80 2345 6789",               icon: "📞" },
  { name: "secondaryPhoneNumber", label: "Secondary Phone", placeholder: "+91 80 2345 6790",               icon: "📞" },
  { name: "hrName",               label: "HR Name",         placeholder: "Priya Sharma",                   icon: "👤" },
  { name: "hrContactNumber",      label: "HR Contact",      placeholder: "+91 98765 43210",                icon: "📱" },
  { name: "companyDescription",   label: "Description",     placeholder: "Brief company overview…",        icon: "📝", full: true },
];

const cleanPayload = (d) => ({
  companyName:          d.companyName          || "",
  address:              d.address              || "",
  companyDescription:   d.companyDescription   || "",
  linkedinUrl:          d.linkedinUrl          || "",
  websiteUrl:           d.websiteUrl           || "",
  primaryPhoneNumber:   d.primaryPhoneNumber   || "",
  secondaryPhoneNumber: d.secondaryPhoneNumber || "",
  primaryEmail:         d.primaryEmail         || "",
  secondaryEmail:       d.secondaryEmail       || "",
  hrName:               d.hrName               || "",
  hrContactNumber:      d.hrContactNumber      || "",
});

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUrl = (url) => {
  if (!url) return true; // optional
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validatePhone = (phone) => {
  if (!phone) return true; // optional
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // simple international phone regex
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateForm = (form) => {
  const errors = {};

  // Company Name
  if (!form.companyName.trim()) {
    errors.companyName = "Company Name is required.";
  } else if (form.companyName.length < 3) {
    errors.companyName = "Company Name must be at least 3 characters.";
  } else if (form.companyName.length > 100) {
    errors.companyName = "Company Name must be at most 100 characters.";
  }

  // Address
  if (!form.address.trim()) {
    errors.address = "Address is required.";
  } else if (form.address.length < 5) {
    errors.address = "Address must be at least 5 characters.";
  } else if (form.address.length > 200) {
    errors.address = "Address must be at most 200 characters.";
  }

  // Website URL
  if (form.websiteUrl && form.websiteUrl.length > 200) {
    errors.websiteUrl = "Website URL must be at most 200 characters.";
  } else if (form.websiteUrl && !validateUrl(form.websiteUrl)) {
    errors.websiteUrl = "Please enter a valid URL.";
  }

  // LinkedIn URL
  if (form.linkedinUrl && form.linkedinUrl.length > 200) {
    errors.linkedinUrl = "LinkedIn URL must be at most 200 characters.";
  } else if (form.linkedinUrl && !validateUrl(form.linkedinUrl)) {
    errors.linkedinUrl = "Please enter a valid URL.";
  }

  // Primary Email
  if (!form.primaryEmail.trim()) {
    errors.primaryEmail = "Primary Email is required.";
  } else if (form.primaryEmail.length > 100) {
    errors.primaryEmail = "Primary Email must be at most 100 characters.";
  } else if (!validateEmail(form.primaryEmail)) {
    errors.primaryEmail = "Please enter a valid email address.";
  }

  // Secondary Email
  if (form.secondaryEmail && form.secondaryEmail.length > 100) {
    errors.secondaryEmail = "Secondary Email must be at most 100 characters.";
  } else if (form.secondaryEmail && !validateEmail(form.secondaryEmail)) {
    errors.secondaryEmail = "Please enter a valid email address.";
  }

  // Primary Phone
  const primaryDigits = form.primaryPhoneNumber.replace(/\D/g, '');
  if (!form.primaryPhoneNumber.trim()) {
    errors.primaryPhoneNumber = "Primary Phone is required.";
  } else if (primaryDigits.length !== 10) {
    errors.primaryPhoneNumber = "Primary Phone must be exactly 10 digits.";
  } else if (!validatePhone(form.primaryPhoneNumber)) {
    errors.primaryPhoneNumber = "Please enter a valid phone number.";
  }

  // Secondary Phone
  const secondaryDigits = form.secondaryPhoneNumber.replace(/\D/g, '');
  if (form.secondaryPhoneNumber && (secondaryDigits.length < 10 || secondaryDigits.length > 15)) {
    errors.secondaryPhoneNumber = "Secondary Phone must be between 10 and 15 digits.";
  } else if (form.secondaryPhoneNumber && !validatePhone(form.secondaryPhoneNumber)) {
    errors.secondaryPhoneNumber = "Please enter a valid phone number.";
  }

  // HR Name
  if (!form.hrName.trim()) {
    errors.hrName = "HR Name is required.";
  } else if (form.hrName.length < 3) {
    errors.hrName = "HR Name must be at least 3 characters.";
  } else if (form.hrName.length > 50) {
    errors.hrName = "HR Name must be at most 50 characters.";
  }

  // HR Contact
  const hrDigits = form.hrContactNumber.replace(/\D/g, '');
  if (!form.hrContactNumber.trim()) {
    errors.hrContactNumber = "HR Contact is required.";
  } else if (hrDigits.length !== 10) {
    errors.hrContactNumber = "HR Contact must be exactly 10 digits.";
  } else if (!validatePhone(form.hrContactNumber)) {
    errors.hrContactNumber = "Please enter a valid phone number.";
  }

  // Description
  if (!form.companyDescription.trim()) {
    errors.companyDescription = "Description is required.";
  } else if (form.companyDescription.length < 10) {
    errors.companyDescription = "Description must be at least 10 characters.";
  } else if (form.companyDescription.length > 500) {
    errors.companyDescription = "Description must be at most 500 characters.";
  }

  return errors;
};

const validateField = (fieldName, value) => {
  let error = "";
  switch (fieldName) {
    case 'companyName':
      if (!value.trim()) error = "Company Name is required.";
      else if (value.length < 3) error = "Company Name must be at least 3 characters.";
      else if (value.length > 100) error = "Company Name must be at most 100 characters.";
      break;
    case 'address':
      if (!value.trim()) error = "Address is required.";
      else if (value.length < 5) error = "Address must be at least 5 characters.";
      else if (value.length > 200) error = "Address must be at most 200 characters.";
      break;
    case 'websiteUrl':
      if (value && value.length > 200) error = "Website URL must be at most 200 characters.";
      else if (value && !validateUrl(value)) error = "Please enter a valid URL.";
      break;
    case 'linkedinUrl':
      if (value && value.length > 200) error = "LinkedIn URL must be at most 200 characters.";
      else if (value && !validateUrl(value)) error = "Please enter a valid URL.";
      break;
    case 'primaryEmail':
      if (!value.trim()) error = "Primary Email is required.";
      else if (value.length > 100) error = "Primary Email must be at most 100 characters.";
      else if (!validateEmail(value)) error = "Please enter a valid email address.";
      break;
    case 'secondaryEmail':
      if (value && value.length > 100) error = "Secondary Email must be at most 100 characters.";
      else if (value && !validateEmail(value)) error = "Please enter a valid email address.";
      break;
    case 'primaryPhoneNumber':
      const pDigits = value.replace(/\D/g, '');
      if (!value.trim()) error = "Primary Phone is required.";
      else if (pDigits.length !== 10) error = "Primary Phone must be exactly 10 digits.";
      else if (!validatePhone(value)) error = "Please enter a valid phone number.";
      break;
    case 'secondaryPhoneNumber':
      const sDigits = value.replace(/\D/g, '');
      if (value && (sDigits.length < 10 || sDigits.length > 15)) error = "Secondary Phone must be between 10 and 15 digits.";
      else if (value && !validatePhone(value)) error = "Please enter a valid phone number.";
      break;
    case 'hrName':
      if (!value.trim()) error = "HR Name is required.";
      else if (value.length < 3) error = "HR Name must be at least 3 characters.";
      else if (value.length > 50) error = "HR Name must be at most 50 characters.";
      break;
    case 'hrContactNumber':
      const hDigits = value.replace(/\D/g, '');
      if (!value.trim()) error = "HR Contact is required.";
      else if (hDigits.length !== 10) error = "HR Contact must be exactly 10 digits.";
      else if (!validatePhone(value)) error = "Please enter a valid phone number.";
      break;
    case 'companyDescription':
      if (!value.trim()) error = "Description is required.";
      else if (value.length < 10) error = "Description must be at least 10 characters.";
      else if (value.length > 500) error = "Description must be at most 500 characters.";
      break;
  }
  return error;
};

const fmtDob = (dob) => {
  if (!dob) return "—";
  if (Array.isArray(dob))
    return `${String(dob[2]).padStart(2,"0")}/${String(dob[1]).padStart(2,"0")}/${dob[0]}`;
  return String(dob);
};

const getInitials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "??";

/* ── ATS Resume generator ───────────────────────────────── */
const generateATSResume = (user, companyData) => {
  const company  = companyData?.[0] || null;
  const fullName = [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ");
  const email    = user.email || user.primaryEmail || "";
  const phone    = user.phoneNumber || user.primaryPhoneNumber || "";
  const address  = user.address1 || user.address || "";

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>${fullName} — Resume</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&family=Source+Sans+3:wght@300;400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}html{background:#c8c8c8;min-height:100%}
body{font-family:'Source Sans 3','Calibri',sans-serif;font-size:11pt;line-height:1.6;color:#111;display:flex;flex-direction:column;align-items:center;padding:32px 16px 100px;min-height:100vh}
.page{width:210mm;min-height:297mm;background:#fff;padding:18mm 20mm;box-shadow:0 6px 40px rgba(0,0,0,.28)}
.name{font-family:'EB Garamond',Georgia,serif;font-size:26pt;font-weight:700;text-transform:uppercase;line-height:1.1}
.role{font-size:10.5pt;font-weight:600;color:#444;letter-spacing:2.2px;text-transform:uppercase;margin-top:5px}
.contacts{display:flex;flex-wrap:wrap;gap:0 22px;border-top:2px solid #000;border-bottom:1px solid #bbb;padding:6px 0;margin-top:11px;font-size:9pt;color:#333}
.sec{margin-top:18px}.sec-h{font-family:'EB Garamond',Georgia,serif;font-size:11.5pt;font-weight:700;text-transform:uppercase;letter-spacing:2.5px;border-bottom:1.5px solid #000;padding-bottom:3px;margin-bottom:10px}
.summary{font-size:10pt;color:#222;line-height:1.65}
.skblk{border-left:3px solid #000;padding-left:13px;margin-bottom:10px}.sk-name{font-weight:700;font-size:10.5pt}.sk-meta{font-size:9pt;color:#555;margin:2px 0 4px;font-weight:600}.sk-desc{font-size:9.5pt;color:#333;line-height:1.5}
.co-name{font-weight:700;font-size:11pt;text-transform:uppercase}.co-role{font-size:9.5pt;color:#555;margin:2px 0;font-weight:600}.co-desc{font-size:9.5pt;color:#444;font-style:italic;margin:5px 0 8px}
.co-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;margin-top:7px}.ci{font-size:9pt;color:#333}.ci strong{font-weight:700;color:#000}
.hr-line{margin-top:8px;padding-top:7px;border-top:1px dashed #bbb;display:flex;gap:22px;font-size:9pt}.hr-line strong{font-weight:700}
.two{display:grid;grid-template-columns:1fr 1fr;gap:5px 24px}.row{display:flex;gap:6px;font-size:9.5pt}.lbl{font-weight:700;min-width:120px;flex-shrink:0}.val{color:#222}
.decl-p{font-size:9.5pt;color:#333;line-height:1.65}.sign{margin-top:24px;display:flex;justify-content:space-between;font-size:9.5pt;color:#444}
.bar{position:fixed;bottom:0;left:0;right:0;background:#1a1a1a;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:56px;font-size:13px;z-index:999;border-top:1px solid #333}
.bar button{display:inline-flex;align-items:center;gap:7px;border:none;padding:0 20px;height:36px;font-size:13px;font-weight:700;border-radius:6px;cursor:pointer}
.btn-pdf{background:#e53e3e;color:#fff}.btn-print{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.45)!important}.btn-close{background:transparent;color:rgba(255,255,255,.5);padding:0 12px!important}
@page{size:A4 portrait;margin:0}@media print{html,body{background:#fff;display:block;padding:0;margin:0}.page{box-shadow:none;margin:0}.bar{display:none}}
</style></head><body>
<div class="page">
<div class="name">${fullName||"Candidate"}</div>
<div class="role">${user.designationName||"Professional"} · ${user.departmentName||"Department"}</div>
<div class="contacts">${email?`<span>✉ ${email}</span>`:""}${phone?`<span>☎ ${phone}</span>`:""}${address?`<span>⌂ ${address}</span>`:""}${user.nationality?`<span>🌐 ${user.nationality}</span>`:""}</div>
<div class="sec"><div class="sec-h">Professional Summary</div><p class="summary">${user.designationName||"Dedicated professional"} in ${user.departmentName||"the industry"} with ${user.yearsOfExperience||"several"} year(s) of experience in <strong>${user.skillName||"core technologies"}</strong>. ${user.skillDescription?user.skillDescription.slice(0,200):"Committed to delivering high-quality results."}</p></div>
<div class="sec"><div class="sec-h">Skills &amp; Expertise</div><div class="skblk"><div class="sk-name">${user.skillName||"—"}</div><div class="sk-meta">${user.yearsOfExperience||0} Year(s) | ${user.designationName||"Role"}</div>${user.skillDescription?`<div class="sk-desc">${user.skillDescription}</div>`:""}</div></div>
${company?`<div class="sec"><div class="sec-h">Work Experience</div><div class="co-name">${company.companyName||"Company"}</div><div class="co-role">${user.designationName||"Professional"} · ${user.departmentName||"Department"}</div>${company.companyDescription?`<div class="co-desc">${company.companyDescription}</div>`:""}<div class="co-grid">${company.address?`<div class="ci"><strong>Address:</strong> ${company.address}</div>`:""}${company.primaryEmail?`<div class="ci"><strong>Email:</strong> ${company.primaryEmail}</div>`:""}${company.primaryPhoneNumber?`<div class="ci"><strong>Phone:</strong> ${company.primaryPhoneNumber}</div>`:""}${company.websiteUrl?`<div class="ci"><strong>Website:</strong> ${company.websiteUrl}</div>`:""}</div>${company.hrName?`<div class="hr-line"><span><strong>HR:</strong> ${company.hrName}</span>${company.hrContactNumber?`<span><strong>HR Phone:</strong> ${company.hrContactNumber}</span>`:""}</div>`:""}</div>`:""}
<div class="sec"><div class="sec-h">Personal Details</div><div class="two">${user.username?`<div class="row"><span class="lbl">Employee ID</span><span class="val">${user.username}</span></div>`:""}${fmtDob(user.dob)!=="—"?`<div class="row"><span class="lbl">Date of Birth</span><span class="val">${fmtDob(user.dob)}</span></div>`:""}${user.gender?`<div class="row"><span class="lbl">Gender</span><span class="val">${user.gender}</span></div>`:""}${user.nationality?`<div class="row"><span class="lbl">Nationality</span><span class="val">${user.nationality}</span></div>`:""}${user.maritalStatus?`<div class="row"><span class="lbl">Marital Status</span><span class="val">${user.maritalStatus}</span></div>`:""}${user.bloodGroup?`<div class="row"><span class="lbl">Blood Group</span><span class="val">${user.bloodGroup}</span></div>`:""}${address?`<div class="row"><span class="lbl">Address</span><span class="val">${address}</span></div>`:""}</div></div>
<div class="sec"><div class="sec-h">Declaration</div><p class="decl-p">I hereby declare that the information furnished above is true and correct to the best of my knowledge and belief.</p><div class="sign"><span>Date: _____________________</span><span>Signature: _____________________</span></div></div>
</div>
<div class="bar"><span style="opacity:.7">📄 ${fullName} — Resume</span><div style="display:flex;gap:10px;align-items:center"><button class="btn-pdf" onclick="window.print()">⬇ Download PDF</button><button class="btn-print" onclick="window.print()">🖨 Print</button><button class="btn-close" onclick="window.close()">✕ Close</button></div></div>
</body></html>`;
};

/* ══════════════════════════════════════════════════════════
   COMPANY CARD COMPONENT
══════════════════════════════════════════════════════════ */
function CompanyCard({ company, onEdit }) {
  return (
    <div className="cd-company-card">
      <div className="cd-card-stripe" />

      {/* Head */}
      <div className="cd-card-head">
        <div className="cd-card-avatar">{getInitials(company.companyName)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="cd-card-title">{company.companyName || "—"}</div>
          {company.companyDescription && (
            <div className="cd-card-desc">
              {company.companyDescription.length > 90
                ? company.companyDescription.slice(0, 90) + "…"
                : company.companyDescription}
            </div>
          )}
        </div>
      </div>

      {/* Fields grid */}
      <div className="cd-card-fields">
        {company.primaryEmail && (
          <div className="cd-field-item">
            <div className="cd-field-label">Primary Email</div>
            <div className="cd-field-value cd-field-value--blue">{company.primaryEmail}</div>
          </div>
        )}
        {company.secondaryEmail && (
          <div className="cd-field-item">
            <div className="cd-field-label">Secondary Email</div>
            <div className="cd-field-value">{company.secondaryEmail}</div>
          </div>
        )}
        {company.primaryPhoneNumber && (
          <div className="cd-field-item">
            <div className="cd-field-label">Primary Phone</div>
            <div className="cd-field-value">{company.primaryPhoneNumber}</div>
          </div>
        )}
        {company.secondaryPhoneNumber && (
          <div className="cd-field-item">
            <div className="cd-field-label">Secondary Phone</div>
            <div className="cd-field-value">{company.secondaryPhoneNumber}</div>
          </div>
        )}
        {company.address && (
          <div className="cd-field-item cd-field-item--full">
            <div className="cd-field-label">📍 Address</div>
            <div className="cd-field-value" style={{ whiteSpace: "normal" }}>{company.address}</div>
          </div>
        )}
        {company.websiteUrl && (
          <div className="cd-field-item">
            <div className="cd-field-label">🌐 Website</div>
            <div className="cd-field-value">
              <a href={company.websiteUrl} target="_blank" rel="noreferrer">
                Visit ↗
              </a>
            </div>
          </div>
        )}
        {company.linkedinUrl && (
          <div className="cd-field-item">
            <div className="cd-field-label">🔗 LinkedIn</div>
            <div className="cd-field-value">
              <a href={company.linkedinUrl} target="_blank" rel="noreferrer">
                View Profile ↗
              </a>
            </div>
          </div>
        )}
      </div>

      {/* HR strip */}
      {(company.hrName || company.hrContactNumber) && (
        <div className="cd-card-hr-strip">
          <div className="cd-card-hr-icon">👤</div>
          <div className="cd-card-hr-info">
            <div className="cd-card-hr-name">{company.hrName || "—"}</div>
            {company.hrContactNumber && (
              <div className="cd-card-hr-phone">{company.hrContactNumber}</div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="cd-card-foot">
        <button className="cd-edit-btn" onClick={() => onEdit(company)}>
          ✏️ Edit Company
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CANDIDATE PROFILE CARD COMPONENT
══════════════════════════════════════════════════════════ */
function ProfileCard({ user, onCreateResume }) {
  const fullName = [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ");

  return (
    <div className="cd-profile-card">
      <div className="cd-profile-stripe" style={{ opacity: 1 }} />

      {/* Head */}
      <div className="cd-profile-head">
        <div className="cd-profile-avatar">{getInitials(fullName)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="cd-profile-name">{fullName || "—"}</div>
          <div className="cd-profile-role">
            {[user.designationName, user.departmentName].filter(Boolean).join(" · ") || "—"}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="cd-tag-row">
        {user.skillName && (
          <span className="cd-tag cd-tag--skill">⚡ {user.skillName}</span>
        )}
        {user.yearsOfExperience != null && (
          <span className="cd-tag cd-tag--exp">
            ⏱ {user.yearsOfExperience} yr{user.yearsOfExperience !== 1 ? "s" : ""}
          </span>
        )}
        {user.departmentName && (
          <span className="cd-tag cd-tag--dept">{user.departmentName}</span>
        )}
      </div>

      {/* Info grid */}
      <div className="cd-profile-info-grid">
        <div className="cd-info-row">
          <div className="cd-info-label">Username</div>
          <div className="cd-info-value cd-info-value--blue">{user.username || "—"}</div>
        </div>
        <div className="cd-info-row">
          <div className="cd-info-label">Gender</div>
          <div className="cd-info-value">{user.gender || "—"}</div>
        </div>
        <div className="cd-info-row">
          <div className="cd-info-label">Date of Birth</div>
          <div className="cd-info-value">{fmtDob(user.dob)}</div>
        </div>
        <div className="cd-info-row">
          <div className="cd-info-label">Blood Group</div>
          <div className="cd-info-value">{user.bloodGroup || "—"}</div>
        </div>
        <div className="cd-info-row">
          <div className="cd-info-label">Nationality</div>
          <div className="cd-info-value">{user.nationality || "—"}</div>
        </div>
        <div className="cd-info-row">
          <div className="cd-info-label">Marital Status</div>
          <div className="cd-info-value">{user.maritalStatus || "—"}</div>
        </div>
        {user.address1 && (
          <div className="cd-info-row cd-info-row--full">
            <div className="cd-info-label">📍 Address</div>
            <div className="cd-info-value" style={{ whiteSpace: "normal" }}>{user.address1}</div>
          </div>
        )}
        {user.skillDescription && (
          <div className="cd-info-row cd-info-row--full">
            <div className="cd-info-label">Skill Description</div>
            <div className="cd-info-value" style={{ whiteSpace: "normal", fontSize: 11.5, color: "var(--muted)", lineHeight: 1.5 }}>
              {user.skillDescription.length > 110
                ? user.skillDescription.slice(0, 110) + "…"
                : user.skillDescription}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="cd-profile-foot">
        <span className="cd-profile-id">ID: {user.userId}</span>
        <button
          className="cd-resume-btn"
          onClick={(e) => { e.stopPropagation(); onCreateResume(user); }}
        >
          📄 Create Resume
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function CompanyDetails() {
  const [companies,      setCompanies]      = useState([]);
  const [form,           setForm]           = useState(EMPTY_FORM);
  const [editId,         setEditId]         = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [saving,         setSaving]         = useState(false);
  const [toast,          setToast]          = useState(null);
  const [activePanel,    setActivePanel]    = useState(null);
  const [errors,         setErrors]         = useState({});

  const [searchKeyword,  setSearchKeyword]  = useState("");
  const [searchExp,      setSearchExp]      = useState("");
  const [searchResults,  setSearchResults]  = useState([]);
  const [isSearching,    setIsSearching]    = useState(false);
  const [selectedUser,   setSelectedUser]   = useState(null);
  const [creatingResume, setCreatingResume] = useState(false);

  /* fetch */
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

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleBlur = (fieldName) => {
    const error = validateField(fieldName, form[fieldName]);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
      setForm(EMPTY_FORM); setEditId(null); setActivePanel(null);
      fetchCompanies();
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong.", "error");
    } finally { setSaving(false); }
  };

  const handleEdit = (company) => {
    setForm(cleanPayload(company)); setEditId(company.id);
    setActivePanel("add");
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM); setEditId(null); setActivePanel(null);
    setErrors({});
  };

  const togglePanel = (panel) => {
    if (activePanel === panel) {
      setActivePanel(null);
      if (panel === "add")    { setForm(EMPTY_FORM); setEditId(null); }
      if (panel === "search") { setSelectedUser(null); }
    } else {
      setActivePanel(panel);
      if (panel !== "add")    { setForm(EMPTY_FORM); setEditId(null); }
      if (panel !== "search") { setSelectedUser(null); }
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) { showToast("Enter a skill keyword to search", "error"); return; }
    setIsSearching(true); setSelectedUser(null); setSearchResults([]);
    try {
      const res = await axios.get("/api/skill/search", {
        params: { keyWord: searchKeyword.trim(), yrOfExp: searchExp || undefined },
      });
      setSearchResults(Array.isArray(res.data) ? res.data : []);
    } catch { showToast("Search failed. Please try again.", "error"); }
    finally  { setIsSearching(false); }
  };

  const handleSelectUser = (user) => {
    setSelectedUser((prev) => prev?.userId === user.userId ? null : user);
  };

  const handleCreateResume = (user) => {
    if (!user) { showToast("No candidate selected", "error"); return; }
    setCreatingResume(true);
    try {
      const html = generateATSResume(user, companies);
      const win  = window.open("", "_blank");
      if (win) { win.document.write(html); win.document.close(); }
      showToast(`Resume created for ${user.firstName} ${user.lastName}!`);
    } catch { showToast("Failed to create resume", "error"); }
    finally  { setCreatingResume(false); }
  };

  const companyExists = companies.length > 0;

  /* ══ RENDER ══ */
  return (
    <div className="cd-root">

      {toast && (
        <div className={`cd-toast cd-toast--${toast.type}`}>
          <span className="cd-toast-dot" />{toast.msg}
        </div>
      )}

      {/* ── Hero — matches portal Salary Configuration banner ── */}
      <div className="cd-hero">
        <div className="cd-hero-circle1" />
        <div className="cd-hero-circle2" />
        <div className="cd-hero-circle3" />
        <div className="cd-hero-content">
          <h1 className="cd-hero-title">Company Management</h1>
          <p className="cd-hero-sub">
            Manage your organisation's profile, contact details, and HR information
          </p>
          <div className="cd-hero-actions">

            {/* Add Company */}
            <button
              className={`cd-btn ${
                activePanel === "add" ? "cd-btn--blue"
                  : companyExists ? "cd-btn--white cd-btn--disabled"
                  : "cd-btn--white"}`}
              onClick={() => {
                if (activePanel === "add") { handleCancel(); return; }
                if (companyExists) { showToast("A company already exists. Edit it instead.", "error"); return; }
                togglePanel("add");
              }}
            >
              {activePanel === "add" ? "✕ Cancel" : "+ Add Company"}
            </button>

            {/* Edit Company */}
            <button
              className={`cd-btn ${activePanel === "edit" ? "cd-btn--blue" : "cd-btn--white"}`}
              onClick={() => togglePanel("edit")}
            >
              {activePanel === "edit" ? "✕ Close" : "✏️ Edit Company"}
            </button>

            {/* Search */}
            <button
              className={`cd-btn ${activePanel === "search" ? "cd-btn--blue" : "cd-btn--white"}`}
              onClick={() => togglePanel("search")}
            >
              {activePanel === "search" ? "✕ Close" : "🔍 Search Candidates"}
            </button>
          </div>
        </div>
      </div>

      <div className="cd-body">

        {/* ══ ADD / EDIT FORM ══ */}
        {activePanel === "add" && (
          <div className="cd-form-card">
            <div className="cd-form-header">
              <div className="cd-form-header-icon">
                {editId ? "✏️" : "🏢"}
              </div>
              <div>
                <div className="cd-form-header-title">
                  {editId ? "Edit Company" : "New Company"}
                </div>
                <div className="cd-form-header-sub">
                  {editId ? `Updating record ID: ${editId}` : "Fill in the details below to register your company"}
                </div>
              </div>
              <button className="cd-close-btn" onClick={handleCancel}>✕</button>
            </div>

            <form className="cd-form" onSubmit={handleSubmit}>
              {FIELDS.map((f) => (
                <div key={f.name} className={`cd-field${f.full ? " cd-field--full" : ""}`}>
                  <label className="cd-label" htmlFor={`f-${f.name}`}>
                    <span className="cd-label-icon">{f.icon}</span>
                    {f.label}
                    {f.required && <span className="cd-required"> *</span>}
                  </label>
                  {f.full
                    ? <textarea id={`f-${f.name}`} name={f.name} className="cd-input cd-textarea"
                        placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} rows={3}
                        onFocus={() => setErrors((prev) => ({ ...prev, [f.name]: "" }))}
                        onBlur={() => handleBlur(f.name)} />
                    : <input id={`f-${f.name}`} name={f.name} className="cd-input"
                        placeholder={f.placeholder} value={form[f.name]} onChange={handleChange}
                        required={f.required}
                        onFocus={() => setErrors((prev) => ({ ...prev, [f.name]: "" }))}
                        onBlur={() => handleBlur(f.name)} />}
                  {errors[f.name] && <div className="cd-error">{errors[f.name]}</div>}
                </div>
              ))}
              <div className="cd-form-actions">
                <button type="submit" className="cd-btn cd-btn--navy cd-btn--lg" disabled={saving}>
                  {saving
                    ? <><span className="cd-spinner" /> Saving…</>
                    : editId ? "💾 Update Company" : "✓ Create Company"}
                </button>
                <button type="button" className="cd-btn cd-btn--ghost" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══ EDIT PANEL — Company Cards ══ */}
        {activePanel === "edit" && (
          <div style={{ animation: "cdFadeUp 0.22s ease both" }}>
            <div className="cd-section-header">
              <span className="cd-section-title">
                {companies.length === 0 ? "No Companies" : `${companies.length} Company${companies.length !== 1 ? " Records" : ""}`}
              </span>
              {companies.length > 0 && (
                <span className="cd-count-badge">{companies.length}</span>
              )}
            </div>

            {loading ? (
              <div className="cd-loading">
                <div className="cd-loading-ring" />
                <span>Loading company data…</span>
              </div>
            ) : companies.length === 0 ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">🏢</div>
                <div className="cd-empty-title">No company registered yet</div>
                <div className="cd-empty-sub">Click "+ Add Company" to create your first company entry</div>
              </div>
            ) : (
              <div className="cd-card-grid">
                {companies.map((c, i) => (
                  <CompanyCard key={c.id || i} company={c} onEdit={handleEdit} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ SEARCH PANEL — Candidate Profile Cards ══ */}
        {activePanel === "search" && (
          <div style={{ animation: "cdFadeUp 0.22s ease both" }}>

            {/* Search bar — matches the portal's input style */}
            <div className="cd-search-bar">
              <input
                type="text"
                placeholder="Search by skill  (e.g. Python, React, Java, SQL)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="cd-input"
              />
              <input
                type="number"
                placeholder="Min. Years Exp."
                value={searchExp}
                onChange={(e) => setSearchExp(e.target.value)}
                className="cd-input"
                style={{ maxWidth: 170 }}
                min={0}
              />
              <button className="cd-btn cd-btn--navy" onClick={handleSearch} disabled={isSearching}>
                {isSearching
                  ? <><span className="cd-spinner" style={{ borderTopColor: "#fff", borderColor: "rgba(255,255,255,0.3)" }} /> Searching…</>
                  : "🔍 Search"}
              </button>
            </div>

            {/* Results */}
            {isSearching ? (
              <div className="cd-loading">
                <div className="cd-loading-ring" />
                <span>Searching candidates…</span>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="cd-section-header">
                  <span className="cd-section-title">Search Results</span>
                  <span className="cd-count-badge">{searchResults.length} found</span>
                  <span style={{ fontSize: 12.5, color: "var(--muted)", marginLeft: 4 }}>
                    Click "Create Resume" on any card to generate a resume
                  </span>
                </div>

                <div className="cd-profile-grid">
                  {searchResults.map((user, i) => (
                    <ProfileCard
                      key={i}
                      user={user}
                      onCreateResume={handleCreateResume}
                    />
                  ))}
                </div>
              </>
            ) : searchKeyword && !isSearching ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">🔍</div>
                <div className="cd-empty-title">No candidates found</div>
                <div className="cd-empty-sub">
                  Try a different skill keyword or lower the experience filter
                </div>
              </div>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
}
