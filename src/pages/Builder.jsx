import { useState } from "react";
import PersonalForm from "../components/PersonalForm.jsx";
import EntryEditor from "../components/EntryEditor.jsx";
import SkillsEditor from "../components/SkillsEditor.jsx";
import ScoreCard from "../components/ScoreCard.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import { TEMPLATES } from "../utils/sampleData.js";
import { formatMonth, validatePersonal } from "../utils/validators.js";

const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;

const educationFields = [
  { name: "school", label: "School / College", required: true, placeholder: "Institution name" },
  { name: "degree", label: "Degree / Course", required: true, placeholder: "B.Tech Computer Science" },
  { name: "year", label: "Year of passing", required: true, placeholder: "2028", pattern: /^(19|20)\d{2}$/, patternMessage: "Enter a 4-digit year" },
  { name: "score", label: "CGPA / Percentage", placeholder: "CGPA 8.81" },
];

const experienceFields = [
  { name: "role", label: "Role", required: true, placeholder: "Web Development Intern" },
  { name: "company", label: "Company", required: true, placeholder: "Company name" },
  { name: "start", label: "Start", type: "month", required: true },
  { name: "end", label: "End (leave empty if current)", type: "month" },
  { name: "desc", label: "What did you do?", textarea: true, maxLength: 300, placeholder: "Built features, fixed bugs, learned tools..." },
];
const experienceCheck = (d) => (d.start && d.end && d.end < d.start ? { end: "End date cannot be before start date" } : {});

const projectFields = [
  { name: "name", label: "Project name", required: true, placeholder: "Portfolio Website" },
  { name: "tech", label: "Technologies", required: true, placeholder: "React, CSS3" },
  { name: "link", label: "Link (optional)", placeholder: "github.com/you/project", pattern: URL_RE, patternMessage: "Enter a valid link" },
  { name: "desc", label: "Description", textarea: true, maxLength: 300, placeholder: "What does it do?" },
];

const TABS = [
  { id: "personal", label: "Personal" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

export default function Builder({ resume, onUpdate, navigate }) {
  const [tab, setTab] = useState("personal");
  const personalHasErrors = Object.keys(validatePersonal(resume.personal)).length > 0;

  return (
    <main className="page">
      <div className="row between wrap page-head no-print">
        <div>
          <input className="title-input" value={resume.title} aria-label="Resume title" onChange={(e) => onUpdate({ title: e.target.value })} />
        </div>
        <div className="row wrap">
          <select value={resume.template} aria-label="Template" onChange={(e) => onUpdate({ template: e.target.value })}>
            {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name} template</option>)}
          </select>
          <button className="btn" onClick={() => navigate("/")}>Back</button>
          <button className="btn primary" onClick={() => navigate(`/preview/${resume.id}`)}>Full preview</button>
        </div>
      </div>

      <div className="builder">
        <div className="editor no-print">
          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
                {t.label}
                {t.id === "personal" && personalHasErrors && <span className="dot" title="Some details need attention" />}
                {["education", "experience", "projects", "skills"].includes(t.id) && <span className="count">{resume[t.id].length}</span>}
              </button>
            ))}
          </div>

          {tab === "personal" && <PersonalForm personal={resume.personal} onChange={(personal) => onUpdate({ personal })} />}
          {tab === "education" && (
            <EntryEditor noun="education" fields={educationFields} items={resume.education} onChange={(education) => onUpdate({ education })}
              renderItem={(e) => (<><strong>{e.school}</strong><div className="muted">{e.degree} · {e.year} {e.score && `· ${e.score}`}</div></>)} />
          )}
          {tab === "experience" && (
            <EntryEditor noun="experience" fields={experienceFields} items={resume.experience} onChange={(experience) => onUpdate({ experience })} extraValidate={experienceCheck}
              renderItem={(x) => (<><strong>{x.role}, {x.company}</strong><div className="muted">{formatMonth(x.start)} - {x.end ? formatMonth(x.end) : "Present"}</div></>)} />
          )}
          {tab === "projects" && (
            <EntryEditor noun="project" fields={projectFields} items={resume.projects} onChange={(projects) => onUpdate({ projects })}
              renderItem={(x) => (<><strong>{x.name}</strong><div className="muted">{x.tech}</div></>)} />
          )}
          {tab === "skills" && <SkillsEditor skills={resume.skills} onChange={(skills) => onUpdate({ skills })} />}
        </div>

        <aside className="side">
          <ScoreCard resume={resume} />
          <div className="preview-frame print-area"><ResumePreview resume={resume} /></div>
        </aside>
      </div>
    </main>
  );
}
