// One labelled input / textarea with an inline error message
export default function Field({ label, name, value, onChange, onBlur, error, type = "text", textarea = false, required = false, placeholder = "", maxLength, hint }) {
  const id = `f-${name}`;
  const shared = {
    id,
    name,
    value,
    placeholder,
    maxLength,
    onBlur,
    "aria-invalid": error ? "true" : "false",
    onChange: (e) => onChange(name, e.target.value),
  };
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>
        {label} {required && <span className="req">*</span>}
      </label>
      {textarea ? <textarea rows={3} {...shared} /> : <input type={type} {...shared} />}
      {hint && !error && <small className="hint">{hint}</small>}
      {error && <small className="error" role="alert">{error}</small>}
    </div>
  );
}
