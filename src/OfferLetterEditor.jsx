import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root { height: 100%; overflow: hidden; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f0f0f;
    color: #f0ede8;
    height: 100%;
  }

  .app {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 286px;
    min-width: 286px;
    background: #181818;
    border-right: 1px solid #242424;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar-header {
    padding: 14px 18px 13px;
    border-bottom: 1px solid #242424;
    flex-shrink: 0;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    color: #555;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    margin-bottom: 9px;
    transition: color 0.13s;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
  .btn-back:hover { color: #c5a44a; }
  .btn-back svg { transition: transform 0.13s; }
  .btn-back:hover svg { transform: translateX(-2px); }

  .sidebar-header h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 18px;
    font-weight: 400;
    color: #f0ede8;
    letter-spacing: -0.3px;
  }

  .sidebar-header p {
    font-size: 10px;
    color: #4a4a4a;
    margin-top: 2px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* ── SCROLLABLE BODY fills remaining height exactly ── */
  .sidebar-body {
    flex: 1 1 0;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 16px 14px;
    scrollbar-width: thin;
    scrollbar-color: #282828 transparent;
  }
  .sidebar-body::-webkit-scrollbar { width: 3px; }
  .sidebar-body::-webkit-scrollbar-track { background: transparent; }
  .sidebar-body::-webkit-scrollbar-thumb { background: #282828; border-radius: 2px; }

  .section-title {
    font-size: 9.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #c5a44a;
    margin: 14px 0 8px;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .section-title:first-child { margin-top: 4px; }
  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #232323;
  }

  .field { margin-bottom: 8px; }

  .field label {
    display: block;
    font-size: 10.5px;
    color: #5a5a5a;
    margin-bottom: 3px;
    letter-spacing: 0.02em;
  }

  .field input,
  .field select {
    width: 100%;
    background: #111;
    border: 1px solid #262626;
    border-radius: 5px;
    padding: 7px 9px;
    font-size: 12px;
    color: #e0dcd6;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.13s, background 0.13s;
  }

  .field select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='5' viewBox='0 0 9 5'%3E%3Cpath d='M0 0l4.5 5L9 0z' fill='%23555'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 9px center;
    -webkit-appearance: none;
    appearance: none;
    padding-right: 26px;
  }

  .field input:focus,
  .field select:focus {
    border-color: #c5a44a;
    background: #131313;
  }

  /* salutation + name on one row */
  .name-row { display: flex; gap: 7px; }
  .name-row .sal { width: 78px; flex-shrink: 0; }
  .name-row .nm  { flex: 1; }

  /* ── FOOTER pinned to bottom ── */
  .sidebar-footer {
    flex-shrink: 0;
    padding: 12px 16px 16px;
    border-top: 1px solid #222;
    background: #181818;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .btn-save {
    width: 100%;
    padding: 10px;
    background: #c5a44a;
    color: #0d0d0d;
    border: none;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: background 0.14s, transform 0.1s;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .btn-save:hover  { background: #d4b35c; }
  .btn-save:active { transform: scale(0.98); }

  /* ── PREVIEW AREA ── */
  .preview-area {
    flex: 1;
    background: #131313;
    padding: 26px 30px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    scrollbar-width: thin;
    scrollbar-color: #282828 transparent;
  }
  .preview-area::-webkit-scrollbar { width: 4px; }
  .preview-area::-webkit-scrollbar-thumb { background: #282828; border-radius: 2px; }

  .preview-label {
    font-size: 9.5px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #333;
    align-self: flex-start;
  }

  /* ── LETTER PAPER ── */
  .letter-paper {
    background: #fff;
    color: #1a1a1a;
    width: 794px;
    min-height: 1123px;
    padding: 48px 56px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    line-height: 1.7;
    position: relative;
    box-shadow: 0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3);
  }
  .letter-paper + .letter-paper { border-top: 3px solid #e6ddc8; }

  /* Letterhead */
  .lh {
    display: flex; justify-content: flex-end;
    margin-bottom: 24px; padding-bottom: 20px;
    border-bottom: 2px solid #1a3a8f;
  }
  .lh-right { text-align: right; }
  .lh-brand {
    display: flex; align-items: center; justify-content: flex-end;
    gap: 10px; margin-bottom: 4px;
  }
  .lh-vb {
    background: #1a3a8f; color: #fff;
    font-size: 20px; font-weight: 900;
    padding: 4px 9px; border-radius: 4px;
    letter-spacing: -1px; font-family: Arial, sans-serif;
  }
  .lh-offerbeez { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #1a3a8f; font-family: Arial, sans-serif; }
  .lh-offerbeez span { color: #e8a000; }
  .lh-sub { font-size: 10px; color: #888; font-style: italic; margin-bottom: 5px; }
  .lh-addr { font-size: 10.5px; color: #555; line-height: 1.55; }

  .letter-title {
    text-align: center; font-size: 14.5px; font-weight: 700;
    text-decoration: underline; text-transform: uppercase;
    letter-spacing: 0.05em; margin: 22px 0 18px; color: #1a1a1a;
  }
  .salutation { font-weight: 700; margin-bottom: 12px; }
  .para { margin-bottom: 12px; text-align: justify; }
  .kv { display: flex; gap: 6px; margin: 6px 0; font-size: 13px; }
  .kv strong { min-width: 60px; white-space: nowrap; }

  .doc-list { margin: 8px 0 14px 22px; }
  .doc-list li { margin-bottom: 4px; }

  .sign-block { margin-top: 28px; }
  .sign-block .warm { margin-bottom: 40px; }
  .sign-block .sig-name { font-weight: 700; font-size: 13.5px; }
  .sign-block .sig-desig { font-weight: 700; }

  .candidate-block { margin-top: 32px; border-top: 1px solid #ccc; padding-top: 16px; }
  .candidate-block p { margin-bottom: 8px; }
  .sig-line-row { display: flex; gap: 60px; margin-top: 16px; font-size: 12.5px; font-weight: 600; }

  .annex-title {
    text-align: center; font-size: 14.5px; font-weight: 700;
    text-decoration: underline; text-transform: uppercase;
    letter-spacing: 0.05em; margin: 24px 0 18px;
  }

  table.comp-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 14px; }
  table.comp-table th, table.comp-table td { border: 1px solid #ccc; padding: 8px 12px; }
  table.comp-table thead th { background: #1a3a8f; color: #fff; font-weight: 700; text-align: left; }
  table.comp-table tbody tr:nth-child(even) { background: #f9f8f5; }
  table.comp-table td:last-child { text-align: right; font-variant-numeric: tabular-nums; }
  table.comp-table .total-row td { font-weight: 700; background: #f0ece0; font-size: 14px; }

  .pt-note { text-align: center; font-size: 12px; font-weight: 700; margin-top: 12px; color: #555; }

  .watermark {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(-35deg);
    font-size: 110px; font-weight: 900;
    color: rgba(26,58,143,0.04);
    pointer-events: none; user-select: none;
    white-space: nowrap; font-family: Arial, sans-serif;
  }

  @media print {
    .sidebar { display: none !important; }
    .preview-area { padding: 0; background: white; overflow: visible; }
    .preview-label { display: none; }
    .letter-paper { box-shadow: none; page-break-after: always; width: 100%; }
    html, body, #root { height: auto !important; overflow: visible !important; }
    .app { height: auto !important; overflow: visible !important; }
  }
`;

function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function Letterhead({ company }) {
  return (
    <div className="lh">
      <div className="lh-right">
        <div className="lh-brand">
          <div className="lh-vb">VB</div>
          <div className="lh-offerbeez">Offer<span>Beez</span></div>
        </div>
        <div className="lh-sub">(Product of Venturebiz)</div>
        <div className="lh-addr">
          {company}<br />
          #205/16, 2nd Floor, Spoorthi, Wilson Garden Society Layout,<br />
          Puttenahalli Main Road, JP Nagar 7th Phase, Bangalore- 560078.<br />
          Website: www.venturebiz.in &nbsp;|&nbsp; Email: info@venturebiz.in
        </div>
      </div>
    </div>
  );
}

export default function OfferLetterEditor() {
  const [f, setF] = useState({
    salutation: "Mr.",
    name: "Vimal B Gowda",
    position: "Software Engineer Trainee",
    joiningDate: "30/06/2025",
    location: "Office Location (Bangalore JP Nagar)",
    trainSalary: "16,000",
    trainWords: "Rupees Sixteen Thousand only",
    trainDuration: "Three Months",
    basic: "1,50,000.00",
    fbp: "94,200.00",
    special: "55,800.00",
    pf: "12,672.00",
    pt: "2,400.00",
    ctc: "3,00,000.00",
    hrName: "Vikas.V",
    hrDesig: "Human Resources - Head",
    company: "Venturebiz Promotions Private Limited",
  });

  const upd = k => e => setF(prev => ({ ...prev, [k]: e.target.value }));

  const handleBack = () => {
    window.location.href = "/hrms/dev/hr-dashboard";
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-header">
            {/* Back Button */}
            <button className="btn-back" onClick={handleBack}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2.5L4 6.5L8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <h1>Offer Letter</h1>
            <p>Edit &amp; Export</p>
          </div>

          {/* All fields scroll inside this box — never overflows the window */}
          <div className="sidebar-body">

            <div className="section-title">Candidate</div>
            <Field label="Full Name">
              <div className="name-row">
                <div className="sal">
                  <select value={f.salutation} onChange={upd("salutation")}>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                    <option>Dr.</option>
                  </select>
                </div>
                <div className="nm">
                  <input value={f.name} onChange={upd("name")} placeholder="Full name" />
                </div>
              </div>
            </Field>

            <div className="section-title">Role</div>
            <Field label="Position">
              <input value={f.position} onChange={upd("position")} />
            </Field>
            <Field label="Joining Date">
              <input value={f.joiningDate} onChange={upd("joiningDate")} />
            </Field>
            <Field label="Location">
              <input value={f.location} onChange={upd("location")} />
            </Field>

            <div className="section-title">Training Period</div>
            <Field label="Monthly Salary (₹)">
              <input value={f.trainSalary} onChange={upd("trainSalary")} />
            </Field>
            <Field label="Salary in Words">
              <input value={f.trainWords} onChange={upd("trainWords")} />
            </Field>
            <Field label="Duration">
              <input value={f.trainDuration} onChange={upd("trainDuration")} />
            </Field>

            <div className="section-title">Compensation (Annual)</div>
            <Field label="Basic Pay (₹)">
              <input value={f.basic} onChange={upd("basic")} />
            </Field>
            <Field label="Flexible Benefit Plan (₹)">
              <input value={f.fbp} onChange={upd("fbp")} />
            </Field>
            <Field label="Special Allowance (₹)">
              <input value={f.special} onChange={upd("special")} />
            </Field>
            <Field label="PF Contribution — Employer (₹)">
              <input value={f.pf} onChange={upd("pf")} />
            </Field>
            <Field label="Professional Tax (₹)">
              <input value={f.pt} onChange={upd("pt")} />
            </Field>
            <Field label="Total CTC (₹)">
              <input value={f.ctc} onChange={upd("ctc")} />
            </Field>

            <div className="section-title">HR Signatory</div>
            <Field label="HR Name">
              <input value={f.hrName} onChange={upd("hrName")} />
            </Field>
            <Field label="HR Designation">
              <input value={f.hrDesig} onChange={upd("hrDesig")} />
            </Field>
            <Field label="Company Name">
              <input value={f.company} onChange={upd("company")} />
            </Field>

          </div>

          {/* Save as PDF only */}
          <div className="sidebar-footer">
            <button className="btn-save" onClick={() => window.print()}>
              💾 Save as PDF
            </button>
          </div>
        </aside>

        {/* ── PREVIEW ── */}
        <main className="preview-area">
          <div className="preview-label">Live Preview — A4</div>

          {/* PAGE 1 */}
          <div className="letter-paper">
            <div className="watermark">VPPL</div>
            <Letterhead company={f.company} />
            <div className="letter-title">Letter of Intent Employment of Offer</div>

            <p className="salutation">Dear {f.salutation} {f.name}</p>

            <p className="para">
              We are excited to extend to you this Intent of Offer for the position of{" "}
              <strong>{f.position}</strong> at {f.company}. After careful evaluation of your
              skills, experience, and passion, we believe that you would be an excellent addition
              to our growing team.
            </p>

            <p className="para">
              At VPPL, we are building something special, and we are thrilled at the possibility
              of you joining us on this journey. Below are some key terms of the intended offer:
            </p>

            <div className="kv"><strong>Position:</strong> <span>{f.position}</span></div>
            <div className="kv"><strong>Joining Date:</strong> <span>{f.joiningDate}</span></div>
            <div className="kv"><strong>Location:</strong> <span>{f.location}</span></div>
            <div className="kv">
              <strong>Compensation</strong>
              <span>(After successfully completing Training Period of {f.trainDuration}): As mentioned in Annexure 1</span>
            </div>
            <div className="kv" style={{ marginTop: 8 }}>
              <strong>Other Benefits</strong>
              <span>(After Successfully completing Training and Probationary Period): Flexible working hours, Provident Fund.</span>
            </div>

            <p className="para" style={{ marginTop: 14 }}>
              During the Probationary Period you will be into technology training and will be
              assessed for completing the given capstone project.
            </p>
            <p className="para">
              During the Training, a Salary of Rs.{f.trainSalary}/- ({f.trainWords}) per month
              will be paid for {f.trainDuration}.
            </p>
            <p className="para">
              This letter expresses our intention to offer you this opportunity and outlines the
              preliminary terms of your employment. An Appointment Letter, including detailed
              employment terms and conditions, will follow upon your acceptance of this intent.
            </p>
            <p className="para">
              We are truly excited about the value you can bring to VPPL, and we look forward to
              seeing the impact you will make as we build our future together.
            </p>
            <p className="para">Welcome aboard!</p>
            <p className="para">
              On successful completion of joining and onboarding formalities, you will be issued
              a Letter of Appointment by VPPL.
            </p>
          </div>

          {/* PAGE 2 */}
          <div className="letter-paper">
            <div className="watermark">VPPL</div>
            <Letterhead company={f.company} />

            <p className="para">
              On joining, you are requested to please provide copies of the following documents,
              as and where applicable:
            </p>
            <ol className="doc-list">
              <li>Certificates of educational qualifications</li>
              <li>2 passport size photographs in colour.</li>
              <li>PAN Card copy</li>
              <li>ID Proof (DL or Aadhar Card or Voter ID Card)</li>
            </ol>
            <p className="para">
              We welcome you once again to {f.company} and sincerely wish you a rich and rewarding career.
            </p>
            <p className="para"><strong>We look forward to having you in our team.</strong></p>

            <div className="sign-block">
              <p className="warm">Warm regards,</p>
              <p className="sig-name">{f.hrName}</p>
              <p className="sig-desig">{f.hrDesig}</p>
              <p>{f.company}</p>
            </div>

            <div className="candidate-block">
              <p>
                Kindly return a copy of this letter duly countersigned by you on each page in
                acceptance of the terms and conditions set out herein.
              </p>
              <p style={{ marginTop: 10 }}>
                I have read and understood and do hereby agree to abide by the terms and conditions
                of this letter of appointment.
              </p>
              <p style={{ marginTop: 14, fontWeight: 700 }}>Signature of Candidate</p>
              <div className="sig-line-row">
                <span>Date: _______________</span>
                <span>Place: _______________</span>
              </div>
            </div>
          </div>

          {/* PAGE 3 — Annexure */}
          <div className="letter-paper">
            <div className="watermark">VPPL</div>
            <Letterhead company={f.company} />

            <div className="annex-title">Annexure - 1: Compensation Break-Up</div>

            <table className="comp-table">
              <thead>
                <tr>
                  <th>Components</th>
                  <th style={{ textAlign: "right" }}>Annually</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Basic Pay</strong></td>
                  <td>₹ {f.basic}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Flexible Benefit Plan</strong><br />
                    <em style={{ fontSize: 11.5, color: "#555" }}>
                      (includes House Rent Allowances, Leave Travel Allowances,<br />
                      Project Allowances (Conveyance, food etc. at client place,<br />
                      Insurance and Medical Benefits)
                    </em>
                  </td>
                  <td>₹ {f.fbp}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Special Allowance</strong><br />
                    <em style={{ fontSize: 11.5, color: "#555" }}>(**100% Achievement end of 12th Month)</em>
                  </td>
                  <td>₹ {f.special}</td>
                </tr>
                <tr>
                  <td><strong>PF Contribution Employer</strong></td>
                  <td>₹ {f.pf}</td>
                </tr>
                <tr>
                  <td><strong>Professional Tax</strong></td>
                  <td>₹ {f.pt}</td>
                </tr>
                <tr className="total-row">
                  <td><strong>Total Cost to Company</strong></td>
                  <td>₹ {f.ctc}</td>
                </tr>
              </tbody>
            </table>

            <p className="pt-note">***PT will be deducted accordingly as per Tax Deduction Policy***</p>
          </div>

        </main>
      </div>
    </>
  );
}
