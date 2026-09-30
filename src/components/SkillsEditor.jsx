import { useState } from "react";

const SUGGESTIONS = [
  "JavaScript", "React", "Node.js", "Express", "MongoDB", "MySQL", "Python", "Java", "C", "C++",
  "HTML5", "CSS3", "Tailwind CSS", "Git", "GitHub", "REST APIs", "Data Structures", "Problem Solving",
  "TypeScript", "Figma", "Communication", "Teamwork",
];

export default function SkillsEditor({ skills, onChange }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const add = (raw) => {
    const value = raw.trim();
    if (!value) return setError("Type a skill first");
    if (value.length > 30) return setError("Skill name is too long (max 30)");
    if (skills.some((s) => s.toLowerCase() === value.toLowerCase())) return setError("Skill already added");
    if (skills.length >= 20) return setError("You can add up to 20 skills");
    onChange([...skills, value]);
    setText("");
    setError("");
  };

  // search/filter: suggestions matching the typed text and not already added
  const matches = SUGGESTIONS.filter(
    (s) => s.toLowerCase().includes(text.trim().toLowerCase()) && !skills.some((k) => k.toLowerCase() === s.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="card stack">
      <h3>Skills ({skills.length}/20)</h3>
      <div className="row">
        <input
          value={text}
          placeholder="Type a skill and press Enter"
          aria-label="Add skill"
          onChange={(e) => { setText(e.target.value); setError(""); }}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(text); } }}
        />
        <button className="btn primary" onClick={() => add(text)}>Add</button>
      </div>
      {error && <small className="error" role="alert">{error}</small>}

      <div className="chips">
        {skills.map((s) => (
          <span key={s} className="chip">
            {s}
            <button aria-label={`Remove ${s}`} onClick={() => onChange(skills.filter((k) => k !== s))}>&times;</button>
          </span>
        ))}
        {skills.length === 0 && <p className="muted">No skills yet.</p>}
      </div>

      <div>
        <small className="muted">Suggestions</small>
        <div className="chips">
          {matches.map((s) => (
            <button key={s} className="chip suggest" onClick={() => add(s)}>+ {s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
