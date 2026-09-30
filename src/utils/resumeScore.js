import { isEmail, isPhone } from "./validators.js";

// Completeness score out of 100 with improvement tips
export function calcScore(resume) {
  const p = resume.personal;
  let score = 0;
  const tips = [];
  const add = (points, ok, tip) => (ok ? (score += points) : tips.push(tip));

  add(5, p.fullName.trim().length >= 3, "Add your full name");
  add(5, isEmail(p.email), "Add a valid email address");
  add(5, isPhone(p.phone), "Add a valid phone number");
  add(5, p.location.trim() !== "", "Add your location");
  add(5, p.github.trim() !== "" || p.linkedin.trim() !== "", "Add a GitHub or LinkedIn link");
  add(10, p.summary.trim().length >= 80, "Write a summary of at least 80 characters");
  add(15, resume.education.length >= 1, "Add at least one education entry");
  add(15, resume.experience.length >= 1, "Add an internship or experience entry");

  if (resume.projects.length >= 2) score += 20;
  else {
    if (resume.projects.length === 1) score += 10;
    tips.push("Add at least two projects");
  }

  add(15, resume.skills.length >= 6, "List at least six skills");

  const label = score >= 85 ? "Excellent" : score >= 60 ? "Good" : score >= 30 ? "Getting there" : "Just started";
  return { score, tips, label };
}
