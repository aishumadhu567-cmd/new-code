import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SkillManagement.css";

const API_BASE = "/api/skill";

const EMPTY_FORM = {
  skillName: "",
  yearsOfExperience: "",
  description: ""
};

const ensureArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") return [data];
  return [];
};

export default function SkillManagement() {
  const [skills,  setSkills]  = useState([]);
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [editId,  setEditId]  = useState(null);
  const [search,  setSearch]  = useState({ keyWord: "", yrOfExp: "" });
  const [loading, setLoading] = useState(false);
  const [tab,     setTab]     = useState("list");   // "form" | "list"
  const [toast,   setToast]   = useState(null);

  /* ── helpers ── */
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const cleanPayload = (data) => ({
    skillName:         data.skillName         || "",
    yearsOfExperience: Number(data.yearsOfExperience) || 0,
    description:       data.description       || ""
  });

  /* ── GET ALL ── */
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setSkills(ensureArray(res.data));
    } catch (err) {
      console.error("Error fetching skills:", err);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  /* ── SEARCH ── */
  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.keyWord) params.append("keyWord", search.keyWord);
      if (search.yrOfExp) params.append("yrOfExp",  search.yrOfExp);
      const res = await axios.get(`${API_BASE}/search?${params.toString()}`);
      setSkills(ensureArray(res.data));
    } catch (err) {
      console.error("Search error:", err);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch({ keyWord: "", yrOfExp: "" });
    fetchSkills();
  };

  /* ── FORM INPUT ── */
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  /* ── CREATE / UPDATE ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = cleanPayload(form);
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, payload);
        showToast("Skill updated successfully!");
      } else {
        await axios.post(API_BASE, payload);
        showToast("Skill added successfully!");
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      setTab("list");
      await fetchSkills();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      showToast(err.response?.data?.message || "Something went wrong.", "error");
    }
  };

  /* ── EDIT ── */
  const handleEdit = (skill) => {
    setForm({
      skillName:         skill.skillName         || "",
      yearsOfExperience: skill.yearsOfExperience || "",
      description:       skill.description       || ""
    });
    setEditId(skill.id);
    setTab("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setTab("list");
  };

  /* ── BADGE color by years ── */
  const expBadgeClass = (yrs) => {
    if (yrs >= 5)  return "sm-badge sm-badge--gold";
    if (yrs >= 3)  return "sm-badge sm-badge--blue";
    if (yrs >= 1)  return "sm-badge sm-badge--teal";
    return "sm-badge sm-badge--gray";
  };

  return (
    <div className="sm-root">

      {/* ── Toast ── */}
      {toast && (
        <div className={`sm-toast sm-toast--${toast.type}`}>
          <span className="sm-toast-dot" />{toast.msg}
        </div>
      )}

      {/* ══ HERO BANNER ══ */}
      <div className="sm-hero">
        <div className="sm-hero-circle sm-hero-circle--1" />
        <div className="sm-hero-circle sm-hero-circle--2" />
        <div className="sm-hero-circle sm-hero-circle--3" />
        <div className="sm-hero-content">
         
          <h1 className="sm-hero-title">
            Skill Management
            <span className="sm-hero-title-sub">
              Manage employee skills, experience and proficiency
            </span>
          </h1>
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="sm-body">

        {/* ── Tab navigation (matching screenshot style) ── */}
        <div className="sm-tab-bar">
          <button
            className={`sm-tab ${tab === "form" ? "sm-tab--active" : ""}`}
            onClick={() => { setTab("form"); if (!editId) setForm(EMPTY_FORM); }}
          >
            <span className="sm-tab-icon">＋</span>
            {editId ? "Edit Skill" : "Add Skill"}
          </button>
          <button
            className={`sm-tab ${tab === "list" ? "sm-tab--active" : ""}`}
            onClick={() => setTab("list")}
          >
            <span className="sm-tab-icon">📋</span>
            Skill List
            
          </button>
          
        </div>

      

        {/* ══ ADD / EDIT FORM ══ */}
        {tab === "form" && (
          <div className="sm-card sm-anim">
            <div className="sm-card-header">
              <div className="sm-card-header-bar" />
              <div>
                <div className="sm-card-title">{editId ? "Edit Skill" : "Add New Skill"}</div>
                
              </div>
            </div>

            <form className="sm-form" onSubmit={handleSubmit}>
              <div className="sm-field">
                <label className="sm-label">🛠  Skill Name <span className="sm-req">*</span></label>
                <input
                  name="skillName"
                  className="sm-input"
                  placeholder="e.g. React.js, Java, Python…"
                  value={form.skillName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="sm-field">
                <label className="sm-label">📅  Years of Experience</label>
                <input
                  name="yearsOfExperience"
                  type="number"
                  className="sm-input"
                  placeholder="e.g. 3"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />
              </div>

              <div className="sm-field sm-field--full">
                <label className="sm-label">📝  Description</label>
                <textarea
                  name="description"
                  className="sm-input sm-textarea"
                  placeholder="Brief description of the skill…"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                />
              </div>

              <div className="sm-form-actions sm-field--full">
                <button type="submit" className="sm-btn sm-btn--blue sm-btn--lg" disabled={loading}>
                  {loading
                    ? <><span className="sm-spinner" /> Saving…</>
                    : editId ? "💾  Update Skill" : "✓  Add Skill"}
                </button>
                <button type="button" className="sm-btn sm-btn--ghost" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══ SKILL LIST ══ */}
        {tab === "list" && (
          <div className="sm-card sm-anim">
            <div className="sm-card-header">
              <div className="sm-card-header-bar" />
              <div>
                <div className="sm-card-title">All Skills</div>
                <div className="sm-card-sub">{skills.length} skill{skills.length !== 1 ? "s" : ""} registered</div>
              </div>
            </div>

            {loading ? (
              <div className="sm-loading">
                <div className="sm-loading-ring" /><span>Loading skills…</span>
              </div>
            ) : skills.length === 0 ? (
              <div className="sm-empty">
                <div className="sm-empty-icon">🛠</div>
                <div className="sm-empty-title">No skills found</div>
                <div className="sm-empty-sub">Click "Add Skill" tab to add your first skill</div>
              </div>
            ) : (
              <div className="sm-table-wrap">
                <table className="sm-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Skill Name</th>
                      <th>Experience</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill, i) => (
                      <tr key={skill.id} className="sm-tr">
                        <td className="sm-td-num">{i + 1}</td>
                        <td>
                          <div className="sm-skill-cell">
                            <div className="sm-skill-icon">
                              {(skill.skillName || "?")[0].toUpperCase()}
                            </div>
                            <span className="sm-skill-name">{skill.skillName}</span>
                          </div>
                        </td>
                        <td>
                          <span className={expBadgeClass(skill.yearsOfExperience)}>
                            {skill.yearsOfExperience} yr{skill.yearsOfExperience !== 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="sm-td-desc">{skill.description || "—"}</td>
                        <td>
                          <button className="sm-btn sm-btn--edit" onClick={() => handleEdit(skill)}>
                            ✏️ Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>{/* end sm-body */}
    </div>
  );
}
