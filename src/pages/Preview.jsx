import ResumePreview from "../components/ResumePreview.jsx";
import { TEMPLATES } from "../utils/sampleData.js";

export default function Preview({ resume, onUpdate, navigate }) {
  return (
    <main className="page">
      <div className="row between wrap page-head no-print">
        <h2>{resume.title}</h2>
        <div className="row wrap">
          <div className="segmented" role="group" aria-label="Choose template">
            {TEMPLATES.map((t) => (
              <button key={t.id} className={resume.template === t.id ? "active" : ""} onClick={() => onUpdate({ template: t.id })}>{t.name}</button>
            ))}
          </div>
          <button className="btn" onClick={() => navigate(`/builder/${resume.id}`)}>Edit</button>
          <button className="btn primary" onClick={() => window.print()}>Print / Save as PDF</button>
        </div>
      </div>
      <div className="print-area preview-full"><ResumePreview resume={resume} /></div>
    </main>
  );
}
