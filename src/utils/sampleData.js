export const uid = () => Math.random().toString(36).slice(2, 10);

export const TEMPLATES = [
  { id: "classic", name: "Classic" },
  { id: "modern", name: "Modern" },
  { id: "minimal", name: "Minimal" },
];

export function blankResume(title = "Untitled Resume") {
  return {
    id: uid(),
    title,
    template: "modern",
    updatedAt: Date.now(),
    personal: { fullName: "", email: "", phone: "", location: "", linkedin: "", github: "", summary: "" },
    education: [],
    experience: [],
    projects: [],
    skills: [],
  };
}

export function sampleResume() {
  return {
    id: uid(),
    title: "Software Internship Resume",
    template: "modern",
    updatedAt: Date.now(),
    personal: {
      fullName: "Anand",
      email: "anand@example.com",
      phone: "9876543210",
      location: "Pudukkottai, Tamil Nadu",
      linkedin: "linkedin.com/in/your-id",
      github: "github.com/your-id",
      summary:
        "Second-year B.Tech Computer Science student with a strong interest in web development and entrepreneurship, looking for a software development internship to build real-world products.",
    },
    education: [
      { id: uid(), school: "SRM Institute of Science and Technology, Tiruchirappalli", degree: "B.Tech Computer Science and Engineering", year: "2028", score: "CGPA 8.81" },
    ],
    experience: [],
    projects: [
      { id: uid(), name: "ResumeCraft", tech: "React, JavaScript, CSS3", link: "", desc: "Online resume builder with live preview, validation and print-to-PDF." },
    ],
    skills: ["JavaScript", "React", "HTML5", "CSS3", "Git"],
  };
}
