import { useState } from "react";
import Field from "./Field.jsx";
import { uid } from "../utils/sampleData.js";

/**
 * Reusable add / edit / delete editor used for Education, Experience and Projects.
 * `fields` describes the form, `items` is the saved list, `onChange` gets the new list.
 */
export default function EntryEditor({ noun, fields, items, onChange, extraValidate, renderItem }) {
  const blank = () => Object.fromEntries(fields.map((f) => [f.name, ""]));
  const [draft, setDraft] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const setField = (name, value) => {
    setDraft((d) => ({ ...d, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const reset = () => {
    setDraft(blank());
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e = {};
    fields.forEach((f) => {
      const v = String(draft[f.name]).trim();
      if (f.required && !v) e[f.name] = `${f.label} is required`;
      else if (v && f.pattern && !f.pattern.test(v)) e[f.name] = f.patternMessage;
    });
    const extra = extraValidate ? extraValidate(draft) : {};
    Object.keys(extra).forEach((k) => {
      if (!e[k]) e[k] = extra[k];
    });
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const clean = Object.fromEntries(Object.entries(draft).map(([k, v]) => [k, String(v).trim()]));
    if (editingId) onChange(items.map((i) => (i.id === editingId ? { ...clean, id: editingId } : i)));
    else onChange([...items, { ...clean, id: uid() }]);
    reset();
  };

  const startEdit = (item) => {
    const { id, ...values } = item;
    setDraft({ ...blank(), ...values });
    setEditingId(id);
    setErrors({});
  };

  const remove = (item) => {
    if (!window.confirm(`Delete this ${noun} entry?`)) return;
    onChange(items.filter((i) => i.id !== item.id));
    if (editingId === item.id) reset();
  };

  return (
    <div className="stack">
      <form className="card form-grid" onSubmit={submit} noValidate>
        <h3 className="span-2">{editingId ? `Edit ${noun}` : `Add ${noun}`}</h3>
        {fields.map((f) => (
          <div key={f.name} className={f.textarea ? "span-2" : ""}>
            <Field {...f} value={draft[f.name]} onChange={setField} error={errors[f.name]} />
          </div>
        ))}
        <div className="span-2 row">
          <button type="submit" className="btn primary">{editingId ? "Save changes" : `Add ${noun}`}</button>
          {editingId && <button type="button" className="btn ghost" onClick={reset}>Cancel</button>}
        </div>
      </form>

      <div className="card">
        <h3>Saved {noun} entries ({items.length})</h3>
        {items.length === 0 && <p className="muted">Nothing added yet.</p>}
        <ul className="entry-list">
          {items.map((item) => (
            <li key={item.id} className={editingId === item.id ? "editing" : ""}>
              <div>{renderItem(item)}</div>
              <div className="row">
                <button className="btn small" onClick={() => startEdit(item)}>Edit</button>
                <button className="btn small danger" onClick={() => remove(item)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
