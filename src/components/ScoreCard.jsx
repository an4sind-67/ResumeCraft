import { calcScore } from "../utils/resumeScore.js";

export default function ScoreCard({ resume }) {
  const { score, tips, label } = calcScore(resume);
  return (
    <div className="card score-card no-print">
      <div className="row between">
        <h3>Resume strength</h3>
        <strong>{score}/100 · {label}</strong>
      </div>
      <div className="bar" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
        <div className="bar-fill" style={{ width: `${score}%` }} />
      </div>
      {tips.length > 0 ? (
        <ul className="tips">{tips.map((t) => <li key={t}>{t}</li>)}</ul>
      ) : (
        <p className="muted">Great job - your resume covers every section.</p>
      )}
    </div>
  );
}
