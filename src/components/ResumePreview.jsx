import { formatMonth } from "../utils/validators.js";

const link = (v) => (/^https?:\/\//.test(v) ? v : `https://${v}`);

// The printable resume sheet. The look changes with the template class.
export default function ResumePreview({ resume }) {
  const { personal: p, education, experience, projects, skills, template } = resume;
  const contact = [p.email, p.phone, p.location].filter(Boolean);
  const links = [p.linkedin, p.github].filter(Boolean);

  return (
    <article className={`resume-sheet ${template}`}>
      <header className="r-head">
        <h1>{p.fullName || "Your Name"}</h1>
        <p>{contact.join("  |  ") || "email  |  phone  |  location"}</p>
        {links.length > 0 && (
          <p>
            {links.map((l, i) => (
              <span key={l}>{i > 0 && "  |  "}<a href={link(l)} target="_blank" rel="noreferrer">{l}</a></span>
            ))}
          </p>
        )}
      </header>

      {p.summary && (
        <section><h2>Summary</h2><p>{p.summary}</p></section>
      )}

      {education.length > 0 && (
        <section>
          <h2>Education</h2>
          {education.map((e) => (
            <div key={e.id} className="r-item">
              <div className="r-row"><strong>{e.school}</strong><span>{e.year}</span></div>
              <div>{e.degree}{e.score && ` - ${e.score}`}</div>
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <h2>Experience</h2>
          {experience.map((x) => (
            <div key={x.id} className="r-item">
              <div className="r-row">
                <strong>{x.role}, {x.company}</strong>
                <span>{formatMonth(x.start)} - {x.end ? formatMonth(x.end) : "Present"}</span>
              </div>
              {x.desc && <p>{x.desc}</p>}
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          {projects.map((x) => (
            <div key={x.id} className="r-item">
              <div className="r-row"><strong>{x.name}</strong><span>{x.tech}</span></div>
              {x.desc && <p>{x.desc}</p>}
              {x.link && <a href={link(x.link)} target="_blank" rel="noreferrer">{x.link}</a>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section><h2>Skills</h2><p>{skills.join("  •  ")}</p></section>
      )}
    </article>
  );
}
