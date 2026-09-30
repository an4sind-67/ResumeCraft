import { useState } from "react";
import Field from "./Field.jsx";
import { validatePersonal } from "../utils/validators.js";

// Controlled form: every keystroke updates the resume (live preview),
// errors appear for a field once it has been touched.
export default function PersonalForm({ personal, onChange }) {
  const [touched, setTouched] = useState({});
  const errors = validatePersonal(personal);

  const update = (name, value) => onChange({ ...personal, [name]: value });
  const touch = (name) => () => setTouched((t) => ({ ...t, [name]: true }));
  const props = (name) => ({
    name,
    value: personal[name],
    onChange: update,
    onBlur: touch(name),
    error: touched[name] ? errors[name] : undefined,
  });

  return (
    <form className="card form-grid" onSubmit={(e) => e.preventDefault()} noValidate>
      <h3 className="span-2">Personal details</h3>
      <Field label="Full name" required placeholder="e.g. Anand Kumar" {...props("fullName")} />
      <Field label="Email" required type="email" placeholder="name@example.com" {...props("email")} />
      <Field label="Phone" required type="tel" placeholder="10-digit mobile number" {...props("phone")} />
      <Field label="Location" required placeholder="City, State" {...props("location")} />
      <Field label="LinkedIn" placeholder="linkedin.com/in/username" {...props("linkedin")} />
      <Field label="GitHub" placeholder="github.com/username" {...props("github")} />
      <div className="span-2">
        <Field
          label="Professional summary"
          textarea
          maxLength={400}
          placeholder="2-3 lines about your goals and strengths"
          hint={`${personal.summary.length}/400 characters`}
          {...props("summary")}
        />
      </div>
      <button type="button" className="btn ghost span-2" onClick={() => setTouched({ fullName: 1, email: 1, phone: 1, location: 1, linkedin: 1, github: 1, summary: 1 })}>
        Check all fields
      </button>
    </form>
  );
}
