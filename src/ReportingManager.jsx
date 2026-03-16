import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportingManager() {
  const [manager, setManager] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    loadAllData();

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes modalSlideIn {
        from { opacity: 0; transform: translateY(-20px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0)   scale(1); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .rm-manager-card:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 12px 28px rgba(56,189,248,0.18) !important;
        border-color: #38BDF8 !important;
      }
      .rm-table-row:hover {
        background: #F0F9FF !important;
      }
      .rm-close-btn:hover {
        background: #F3F4F6 !important;
        color: #111827 !important;
      }
      .rm-retry-btn:hover  { opacity: 0.88; }
      .rm-modal-btn:hover  { opacity: 0.88; }
      @media (max-width: 900px) {
        .rm-content-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 600px) {
        .rm-header { flex-direction: column; align-items: flex-start !important; }
        .rm-modal  { width: 92% !important; }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => { document.head.removeChild(styleSheet); };
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      try {
        const mgrRes = await axios.get(`/api/hr/mgr/emp/my-manager`, { withCredentials: true });
        setManager(mgrRes.data);
      } catch (mgrErr) {
        if (mgrErr.response?.status === 400 || mgrErr.response?.status === 404) {
          setManager(null);
        } else { setManager(null); }
      }
      try {
        const empRes = await axios.get(`/api/hr/mgr/mgr/my-employees`, { withCredentials: true });
        setEmployees(Array.isArray(empRes.data) ? empRes.data : []);
      } catch (empErr) {
        setEmployees([]);
      }
    } catch (err) {
      setError("Failed to load reporting structure");
    } finally {
      setLoading(false);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div style={S.loadingContainer}>
        <div style={S.spinner} />
        <p style={S.loadingText}>Loading reporting structure...</p>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div style={S.errorContainer}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>⚠️</div>
        <h2 style={S.errorTitle}>Error Loading Data</h2>
        <p style={S.errorText}>{error}</p>
        <button className="rm-retry-btn" style={S.retryBtn} onClick={loadAllData}>
          Retry
        </button>
      </div>
    );
  }

  /* ── Empty ── */
  if (!manager && employees.length === 0) {
    return (
      <div style={S.page}>
        <div style={S.banner}>
          <div style={S.bannerCircle1} /><div style={S.bannerCircle2} /><div style={S.bannerCircle3} />
          <div style={S.bannerInner}>
            <span style={S.bannerTitle}>Reporting Structure</span>
            <span style={S.bannerDivider} />
            <span style={S.bannerSubtitle}>View your manager and employees reporting to you</span>
          </div>
        </div>
        <div style={S.contentWrap}>
        <div style={S.emptyBox}>
          <div style={{ fontSize: 48, marginBottom: 14, opacity: 0.3 }}>📋</div>
          <p style={{ fontSize: 15, color: "#6B7280", margin: 0 }}>
            No reporting structure found for your account
          </p>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>

      {/* ── Page Header Banner ── */}
      <div style={S.banner}>
        {/* decorative circles */}
        <div style={S.bannerCircle1} />
        <div style={S.bannerCircle2} />
        <div style={S.bannerCircle3} />
        <div style={S.bannerInner}>
          <span style={S.bannerTitle}>Reporting Structure</span>
          <span style={S.bannerDivider} />
          <span style={S.bannerSubtitle}>View your manager and employees reporting to you</span>
        </div>
      </div>

      {/* ── Content Grid ── */}
      <div style={S.contentWrap}>
      <div
        className="rm-content-grid"
        style={employees.length > 0 ? S.contentGrid : S.contentSingle}
      >

        {/* ── LEFT: My Manager ── */}
        <section>
          <h2 style={S.sectionTitle}>
            <span>👤</span> My Manager
          </h2>

          {manager ? (
            <div
              className="rm-manager-card"
              style={S.managerCard}
              onClick={() => setSelectedPerson({
                id: manager.managerId,
                name: manager.managerName,
                username: manager.managerUsername,
                designation: manager.designation,
                department: manager.department,
              })}
            >
              {/* Card top */}
              <div style={S.cardTop}>
                <div style={S.avatar}>
                  {manager.managerName?.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={S.cardName}>{manager.managerName}</h3>
                  <p style={S.cardUsername}>@{manager.managerUsername}</p>
                </div>
              </div>

              {/* Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={S.detailRow}>
                  <span style={S.detailLabel}>Designation</span>
                  <span style={S.badgeDesig}>{manager.designation}</span>
                </div>
                <div style={S.detailRow}>
                  <span style={S.detailLabel}>Department</span>
                  <span style={S.badgeDept}>{manager.department}</span>
                </div>
              </div>


            </div>
          ) : (
            <div style={S.emptyBox}>
              <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>📋</div>
              <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>No manager assigned</p>
            </div>
          )}
        </section>

        {/* ── RIGHT: My Team ── */}
        {employees.length > 0 && (
          <section>
            <h2 style={S.sectionTitle}>
              <span>👥</span> My Team
              <span style={{ fontSize: 17, color: "#6B7280", fontWeight: 400, marginLeft: 6 }}>
                ({employees.length})
              </span>
            </h2>

            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Employee</th>
                    <th style={S.th}>Username</th>
                    <th style={S.th}>Designation</th>
                    <th style={S.th}>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((e) => (
                    <tr
                      key={e.employeeId}
                      className="rm-table-row"
                      style={S.tableRow}
                      onClick={() => setSelectedPerson({
                        id: e.employeeId,
                        name: e.employeeName,
                        username: e.employeeUsername,
                        designation: e.designation,
                        department: e.department,
                      })}
                    >
                      <td style={S.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={S.avatarSm}>
                            {e.employeeName?.charAt(0).toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 600, color: "#111827" }}>
                            {e.employeeName}
                          </span>
                        </div>
                      </td>
                      <td style={S.td}>
                        <span style={S.usernamePill}>@{e.employeeUsername}</span>
                      </td>
                      <td style={S.td}>
                        <span style={S.badgeDesig}>{e.designation}</span>
                      </td>
                      <td style={S.td}>
                        <span style={S.badgeDept}>{e.department}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
      </div>

      {/* ── Detail Modal ── */}
      {selectedPerson && (
        <div style={S.overlay} onClick={() => setSelectedPerson(null)}>
          <div
            className="rm-modal"
            style={S.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={S.modalHeader}>
              <div style={S.modalAvatar}>
                {selectedPerson.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px 0" }}>
                  {selectedPerson.name}
                </h2>
                <p style={{ fontSize: 13, color: "#6B7280", margin: 0, fontFamily: "monospace" }}>
                  @{selectedPerson.username}
                </p>
              </div>
              <button
                className="rm-close-btn"
                style={S.closeBtn}
                onClick={() => setSelectedPerson(null)}
              >×</button>
            </div>

            {/* Modal Body */}
            <div style={S.modalBody}>
              <div style={S.modalRow}>
                <span style={S.modalLabel}>Employee ID</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>
                  {selectedPerson.id}
                </span>
              </div>
              <div style={S.modalRow}>
                <span style={S.modalLabel}>Designation</span>
                <span style={S.badgeDesig}>{selectedPerson.designation}</span>
              </div>
              <div style={S.modalRow}>
                <span style={S.modalLabel}>Department</span>
                <span style={S.badgeDept}>{selectedPerson.department}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={S.modalFooter}>
              <button
                className="rm-modal-btn"
                style={S.modalBtn}
                onClick={() => setSelectedPerson(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   STYLES  —  Black · White · Light Blue
================================================================ */
const S = {

  /* ── Page ── */
  page: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    background: "#F0F4FA",
    minHeight: "100vh",
  },

  /* ── Banner — navy → royal blue, matches screenshot ── */
  banner: {
    background: "linear-gradient(110deg, #0d1b3e 0%, #1a2f6e 35%, #1e3faf 65%, #2952d9 100%)",
    borderRadius: "0 0 18px 18px",
    padding: "28px 36px",
    marginBottom: 32,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(13,27,62,0.30)",
  },
  /* decorative translucent circles — same as screenshot */
  bannerCircle1: {
    position: "absolute",
    top: "-55px", left: "220px",
    width: 180, height: 180,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    pointerEvents: "none",
  },
  bannerCircle2: {
    position: "absolute",
    top: "-30px", left: "360px",
    width: 140, height: 140,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    pointerEvents: "none",
  },
  bannerCircle3: {
    position: "absolute",
    top: "-50px", right: "120px",
    width: 200, height: 200,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.04)",
    pointerEvents: "none",
  },
  bannerInner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#FFFFFF",
    letterSpacing: "-0.2px",
    whiteSpace: "nowrap",
  },
  bannerDivider: {
    display: "inline-block",
    width: 1,
    height: 18,
    background: "rgba(255,255,255,0.30)",
    flexShrink: 0,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.60)",
    fontWeight: 400,
  },

  /* ── Content wrapper ── */
  contentWrap: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 24px 40px",
  },

  /* ── Grid ── */
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: 32,
    alignItems: "start",
  },
  contentSingle: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 32,
    maxWidth: 480,
  },

  /* ── Section title ── */
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  /* ── Manager Card ── */
  managerCard: {
    background: "#FFFFFF",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    border: "1px solid #E5E7EB",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
    animation: "fadeUp 0.4s ease",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
    paddingBottom: 18,
    borderBottom: "1.5px solid #F3F4F6",
  },

  /* ★ Avatars — light-blue gradient ★ */
  avatar: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 800,
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(56,189,248,0.30)",
  },
  avatarSm: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: 700,
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(56,189,248,0.25)",
  },
  modalAvatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 800,
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(56,189,248,0.28)",
  },

  cardName: {
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 4px 0",
  },
  cardUsername: {
    fontSize: 13,
    color: "#6B7280",
    margin: 0,
    fontFamily: "monospace",
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "11px 14px",
    background: "#F9FAFB",
    borderRadius: 8,
    border: "1px solid #F3F4F6",
  },
  detailLabel: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: 600,
  },
  clickHint: {
    marginTop: 16,
    paddingTop: 12,
    borderTop: "1px dashed #E5E7EB",
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
  },

  /* ★ Badges ★ */
  /* Designation — light blue */
  badgeDesig: {
    background: "#E0F2FE",
    color: "#0369A1",
    padding: "4px 12px",
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-block",
    border: "1px solid rgba(56,189,248,0.25)",
  },
  /* Department — black/dark */
  badgeDept: {
    background: "#F3F4F6",
    color: "#1F2937",
    padding: "4px 12px",
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-block",
    border: "1px solid #E5E7EB",
  },

  /* ── Table ── */
  tableWrap: {
    background: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    border: "1px solid #E5E7EB",
    maxHeight: 500,
    overflowY: "auto",
    animation: "fadeUp 0.4s ease",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  /* ★ Table header — BLACK ★ */
  th: {
    padding: "13px 18px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 700,
    color: "#FFFFFF",
    background: "#111827",
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  tableRow: {
    borderBottom: "1px solid #F3F4F6",
    cursor: "pointer",
    transition: "background 0.15s",
    background: "#FFFFFF",
  },
  td: {
    padding: "14px 18px",
    fontSize: 14,
    color: "#374151",
  },
  usernamePill: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#0369A1",
    background: "#E0F2FE",
    padding: "3px 9px",
    borderRadius: 5,
    border: "1px solid rgba(56,189,248,0.20)",
    fontWeight: 600,
  },

  /* ── Empty ── */
  emptyBox: {
    background: "#FFFFFF",
    borderRadius: 14,
    padding: "56px 32px",
    textAlign: "center",
    border: "2px dashed #E5E7EB",
  },

  /* ── Modal ── */
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.48)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  },
  modal: {
    background: "#FFFFFF",
    borderRadius: 18,
    width: "100%",
    maxWidth: 440,
    boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
    animation: "modalSlideIn 0.3s ease-out",
    overflow: "hidden",
  },
  modalHeader: {
    padding: "22px 22px 16px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    borderBottom: "1.5px solid #F3F4F6",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 14, right: 14,
    background: "none",
    border: "none",
    fontSize: 26,
    color: "#6B7280",
    cursor: "pointer",
    width: 32, height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s, color 0.15s",
  },
  modalBody: {
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  modalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 0",
    borderBottom: "1px solid #F3F4F6",
  },
  modalLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: 600,
  },
  modalFooter: {
    padding: "16px 24px 22px",
    textAlign: "right",
  },

  /* ★ Buttons — light blue ★ */
  modalBtn: {
    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
    color: "#FFFFFF",
    border: "none",
    padding: "10px 28px",
    borderRadius: 9,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(56,189,248,0.30)",
    transition: "opacity 0.2s",
  },
  retryBtn: {
    background: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
    color: "#FFFFFF",
    border: "none",
    padding: "12px 32px",
    borderRadius: 9,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(56,189,248,0.30)",
    transition: "opacity 0.2s",
  },

  /* ── Loading / Error ── */
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 400,
    gap: 20,
    background: "#F9FAFB",
  },
  spinner: {
    width: 48,
    height: 48,
    border: "4px solid #E5E7EB",
    borderTop: "4px solid #38BDF8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: 500,
    margin: 0,
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 400,
    textAlign: "center",
    padding: 40,
    background: "#F9FAFB",
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 24,
  },
};
