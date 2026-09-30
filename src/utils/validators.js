export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

// Indian mobile number: optional +91 / 0, then 10 digits starting with 6-9
export const isPhone = (v) =>
  /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, ""));

export const isUrl = (v) => /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(v.trim());

export function validatePersonal(p) {
  const e = {};
  const name = p.fullName.trim();
  if (!name) e.fullName = "Full name is required";
  else if (name.length < 3) e.fullName = "Name must be at least 3 characters";
  else if (!/^[A-Za-z][A-Za-z .'-]*$/.test(name)) e.fullName = "Use letters only";

  if (!p.email.trim()) e.email = "Email is required";
  else if (!isEmail(p.email)) e.email = "Enter a valid email (name@example.com)";

  if (!p.phone.trim()) e.phone = "Phone number is required";
  else if (!isPhone(p.phone)) e.phone = "Enter a valid 10-digit mobile number";

  if (!p.location.trim()) e.location = "Location is required";

  ["linkedin", "github"].forEach((k) => {
    if (p[k].trim() && !isUrl(p[k])) e[k] = "Enter a valid link";
  });

  if (p.summary.length > 400) e.summary = "Keep the summary under 400 characters";
  return e;
}

// "2025-06" -> "Jun 2025"
export function formatMonth(value) {
  if (!value) return "";
  const [y, m] = value.split("-");
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return m ? `${names[Number(m) - 1]} ${y}` : y;
}
