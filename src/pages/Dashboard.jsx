import { useState } from "react";
import { calcScore } from "../utils/resumeScore.js";
import { TEMPLATES, blankResume, sampleResume, uid } from "../utils/sampleData.js";

export default function Dashboard({ resumes, setResumes, navigate }) {
  const [query, setQuery] = useState("");
  const [template, setTemplate] = useState("all");
  const [sort, setSort] = useState("recent");
  const [newTitle, setNewTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const create = (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (title.length < 3) return setTitleError("Give the resume a title (min 3 characters)");
    if (resumes.some((r) => r.title.toLowerCase() === title.toLowerCase())) return setTitleError("A resume with this title already exists");
    const r = blankResume(title);
    setResumes([r, ...resumes]);
    setNewTitle("");
    setTitleError("");
    navigate(`/builder/${r.id}`);
  };

  const addSample = () => setResumes([{ ...sampleResume(), title: `Sample Resume ${resumes.length + 1}` }, ...resumes]);
  const duplicate = (r) => setResumes([{ ...r, id: uid(), title: `${r.title} (copy)`, updatedAt: Date.now() }, ...resumes]);
  const remove = (r) => window.confirm(`Delete "${r.title}"?`) && setResumes(resumes.filter((x) => x.id !== r.id));

  const visible = resumes
    .filter((r) => template === "all" || r.template === template)
    .filter((r) => (r.title + r.personal.fullName).toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) =>
      sort === "recent" ? b.updatedAt - a.updatedAt : sort === "score" ? calcScore(b).score - calcScore(a).score : a.title.localeCompare(b.title)
    );

  const avg = resumes.length ? Math.round(resumes.reduce((s, r) => s + calcScore(r).score, 0) / resumes.length) : 0;

  return (
    <main className="page">
      <section className="hero">
        <h1>Build a resume that gets you shortlisted</h1>
        <p>Fill in your details, watch the live preview, check your resume strength and print it as a PDF.</p>
        <form className="row hero-form" onSubmit={create} noValidate>
          <input value={newTitle} onChange={(e) => { setNewTitle(e.target.value); setTitleError(""); }} placeholder="Resume title, e.g. Frontend Internship" aria-label="New resume title" />
          <button className="btn primary" type="submit">Create resume</button>
          <button className="btn ghost light" type="button" onClick={addSample}>Load sample</button>
        </form>
        {titleError && <small className="error light" role="alert">{titleError}</small>}
      </section>

      <section className="stats">
        <div className="card stat"><strong>{resumes.length}</strong><span>Resumes</span></div>
        <div className="card stat"><strong>{avg}</strong><span>Average strength</span></div>
        <div className="card stat"><strong>{resumes.reduce((s, r) => s + r.projects.length, 0)}</strong><span>Projects listed</span></div>
      </section>

      <section className="toolbar">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or name" aria-label="Search resumes" />
        <select value={template} onChange={(e) => setTemplate(e.target.value)} aria-label="Filter by template">
          <option value="all">All templates</option>
          {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort resumes">
          <option value="recent">Recently edited</option>
          <option value="score">Highest strength</option>
          <option value="title">Title A-Z</option>
        </select>
      </section>

      <section className="grid">
        {visible.map((r) => {
          const { score } = calcScore(r);
          return (
            <article key={r.id} className="card resume-card">
              <div className="row between">
                <h3>{r.title}</h3>
                <span className="badge">{r.template}</span>
              </div>
              <p className="muted">{r.personal.fullName || "No name yet"} · edited {new Date(r.updatedAt).toLocaleDateString()}</p>
              <div className="bar"><div className="bar-fill" style={{ width: `${score}%` }} /></div>
              <small>{score}/100 strength</small>
              <div className="row wrap">
                <button className="btn small primary" onClick={() => navigate(`/builder/${r.id}`)}>Edit</button>
                <button className="btn small" onClick={() => navigate(`/preview/${r.id}`)}>Preview</button>
                <button className="btn small" onClick={() => duplicate(r)}>Duplicate</button>
                <button className="btn small danger" onClick={() => remove(r)}>Delete</button>
              </div>
            </article>
          );
        })}
      </section>
      {visible.length === 0 && (
        <p className="empty">{resumes.length === 0 ? "No resumes yet - create one above." : "No resumes match your search."}</p>
      )}
    </main>
  );
}
