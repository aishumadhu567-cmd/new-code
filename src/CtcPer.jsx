//import api from "./api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HrCalculateSalary.css";

/* ── Animated Success Toast ── */
const SuccessToast = ({ type, onClose }) => {
  const isUpdate = type === "updated";
  useEffect(() => {
    const t = setTimeout(() => { if (onClose) onClose(); }, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="success-toast">
      <div className="toast-icon">
        <svg className="toast-tick" viewBox="0 0 20 20" fill="none">
          <circle className="toast-tick-circle" cx="10" cy="10" r="8" stroke="white" strokeWidth="1.8" />
          <polyline className="toast-tick-check" points="6,10.5 9,13.5 14,7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="toast-body">
        <span className="toast-title">{isUpdate ? "Updated!" : "Created!"}</span>
        <span className="toast-sub">{isUpdate ? "Configuration saved" : "Setup complete"}</span>
      </div>
      <div className="toast-progress">
        <div className="toast-progress-fill" />
      </div>
    </div>
  );
};

export default function SalaryConfiguration() {
  const [form, setForm] = useState({ id: null, basicPercentage: "", hraPercentage: "", pfPercentage: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [configExists, setConfigExists] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState("updated");

  const triggerSuccess = (type = "updated") => { setSuccessType(type); setShowSuccess(true); };
  const handleCloseToast = () => setShowSuccess(false);

  useEffect(() => { fetchSalaryConfig(); }, []);

  const fetchSalaryConfig = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/salary/calculator/get`, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      let configData = null;
      if (response.data) {
        if (Array.isArray(response.data) && response.data.length > 0) configData = response.data[0];
        else if (typeof response.data === "object" && Object.keys(response.data).length > 0) configData = response.data;
      }
      if (configData && (configData.id !== undefined || configData.basicPercentage !== undefined || configData.hraPercentage !== undefined || configData.pfPercentage !== undefined)) {
        setForm({ id: configData.id || null, basicPercentage: configData.basicPercentage?.toString() || "", hraPercentage: configData.hraPercentage?.toString() || "", pfPercentage: configData.pfPercentage?.toString() || "" });
        setConfigExists(true);
        setMessage("Configuration loaded successfully");
      } else {
        resetForm(); setConfigExists(false); setMessage("No configuration found. You can create one.");
      }
    } catch (error) {
      if (error.response?.status === 500 || error.response?.status === 400 || error.response?.status === 404) {
        resetForm(); setConfigExists(false); setMessage("No configuration found. You can create one.");
      } else { setMessage("Error loading configuration"); }
    } finally { setLoading(false); }
  };

  const resetForm = () => { setForm({ id: null, basicPercentage: "", hraPercentage: "", pfPercentage: "" }); };

  const validateForm = () => {
    const errors = {};
    if (!form.basicPercentage.trim()) { errors.basic = "Basic percentage is required"; }
    else { const v = parseFloat(form.basicPercentage); if (isNaN(v) || v <= 0 || v > 100) errors.basic = "Must be between 0.01 and 100"; }
    if (!form.hraPercentage.trim()) { errors.hra = "HRA percentage is required"; }
    else { const v = parseFloat(form.hraPercentage); if (isNaN(v) || v < 0 || v > 100) errors.hra = "Must be between 0 and 100"; }
    if (!form.pfPercentage.trim()) { errors.pf = "PF percentage is required"; }
    else { const v = parseFloat(form.pfPercentage); if (isNaN(v) || v < 0 || v > 100) errors.pf = "Must be between 0 and 100"; }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    if (parts[1]?.length > 2) return;
    if (cleaned.length > 30) return;
    if (cleaned.startsWith(".")) return;
    if (/^0{2,}/.test(cleaned)) return;
    setForm(prev => ({ ...prev, [name]: cleaned }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value && value.trim() !== "" && !isNaN(value)) {
      const num = parseFloat(value);
      if (!isNaN(num)) setForm(prev => ({ ...prev, [name]: num.toFixed(2) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setMessage(`Please fix the following:\n${Object.values(errors).join("\n")}`); return; }
    try {
      setSaving(true); setMessage("");
      const payload = { basicPercentage: parseFloat(form.basicPercentage), hraPercentage: parseFloat(form.hraPercentage), pfPercentage: parseFloat(form.pfPercentage) };
      if (configExists && form.id) {
        await axios.put(`/api/salary/update/${form.id}`, payload, { withCredentials: true, headers: { "Content-Type": "application/json" } });
        setMessage("Configuration updated successfully");
        triggerSuccess("updated");
        setIsEditing(false);
        setTimeout(() => { fetchSalaryConfig(); }, 1000);
      } else {
        try {
          const response = await axios.post(`/api/salary/calculator`, payload, { withCredentials: true, headers: { "Content-Type": "application/json" } });
          if (response.status === 200 || response.status === 201) {
            const newId = response.data?.id || response.data?.configId;
            if (newId) setForm(prev => ({ ...prev, id: newId }));
            setConfigExists(true);
            setMessage("Configuration created successfully (One-time setup complete)");
            triggerSuccess("created");
            setTimeout(() => { fetchSalaryConfig(); }, 1000);
          }
        } catch (createError) {
          if (createError.response?.status === 500 || createError.response?.status === 409) {
            const errorMsg = createError.response?.data?.message || createError.response?.data?.toString() || "";
            if (errorMsg.toLowerCase().includes("already exists")) {
              setMessage("Configuration already exists. Loading existing configuration...");
              setTimeout(() => { fetchSalaryConfig(); }, 1000);
            } else { setMessage("Server error during creation"); }
          } else { setMessage(`Error: ${createError.response?.data?.message || createError.message}`); }
        }
      }
    } catch (error) {
      if (error.response?.status === 500) setMessage("Server error. Please try again.");
      else if (error.response?.status === 400) setMessage("Invalid data. Please check your inputs.");
      else setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally { setSaving(false); }
  };

  const handleReset = () => {
    if (configExists) { fetchSalaryConfig(); setMessage("Form reset to current configuration"); }
    else { resetForm(); setMessage("Form cleared"); }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="salary-calc-page">
        {showSuccess && <SuccessToast type={successType} onClose={handleCloseToast} />}
        <div className="salary-calc-banner">
          <h2>Salary Configuration</h2>
          <p className="subtitle">Checking for existing salary configuration…</p>
        </div>
        <div className="salary-calc-card">
          <div className="loading"><h2>Loading Configuration…</h2><p>Please wait.</p></div>
        </div>
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="salary-calc-page">
      {showSuccess && <SuccessToast type={successType} onClose={handleCloseToast} />}

      {/* ── Blue Banner ── */}
      <div className="salary-calc-banner">
        <h2>Salary Configuration</h2>
        <p className="subtitle">
          {configExists ? "Edit salary calculation percentages (Can update anytime)" : "Create salary calculation percentages (One-time setup only)"}
        </p>
      </div>

      {/* ── Card ── */}
      <div className="salary-calc-card">
        {message && (
          <div className={`message ${message.includes("successfully") ? "success" : message.includes("No configuration") ? "warning" : "error"}`}>
            {message.split("\n").map((line, i) => <div key={i}>{line}</div>)}
          </div>
        )}

        {/* VIEW MODE */}
        {configExists && !isEditing && (
          <div className="view-mode">
            <div className="form-group">
              <label>Basic Percentage (% of CTC)</label>
              <div>{form.basicPercentage}%</div>
            </div>
            <div className="form-group">
              <label>HRA Percentage (% of Basic)</label>
              <div>{form.hraPercentage}%</div>
            </div>
            <div className="form-group">
              <label>PF Percentage (% of Basic)</label>
              <div>{form.pfPercentage}%</div>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button className="save-btn" onClick={() => setIsEditing(true)}>Update</button>
            </div>
          </div>
        )}

        {/* FORM MODE */}
        {(!configExists || isEditing) && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Basic Percentage (% of CTC) *</label>
              <input type="text" name="basicPercentage" value={form.basicPercentage} onChange={handleInputChange} onBlur={handleBlur} disabled={saving} required />
            </div>
            <div className="form-group">
              <label>HRA Percentage (% of Basic) *</label>
              <input type="text" name="hraPercentage" value={form.hraPercentage} onChange={handleInputChange} onBlur={handleBlur} disabled={saving} required />
            </div>
            <div className="form-group">
              <label>PF Percentage (% of Basic) *</label>
              <input type="text" name="pfPercentage" value={form.pfPercentage} onChange={handleInputChange} onBlur={handleBlur} disabled={saving} required />
            </div>
            <div className="button-group">
              <button type="submit" className="save-btn" disabled={saving}>
                {saving ? "Processing…" : configExists ? "Update Configuration" : "Create Configuration"}
              </button>
              {configExists && (
                <button type="button" className="reset-btn" onClick={() => setIsEditing(false)} disabled={saving}>Cancel</button>
              )}
            </div>
          </form>
        )}

        <div className="info-box">
          <h4>Important Rules:</h4>
          <ul>
            <li><strong>Adding:</strong> Only once when no configuration exists</li>
            <li><strong>Editing:</strong> Use Update button anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
