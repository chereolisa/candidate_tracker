import React, { useState } from "react";
import Stars from "./UI/Stars";
import { STAGES, uid } from "../data/initialCandidates";

export default function CandidateForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      email: "",
      phone: "",
      position: "",
      stage: "Applied",
      rating: 3,
      notes: "",
      appliedDate: new Date().toISOString().slice(0, 10),
    },
  );
  const [error, setError] = useState("");

  function submit() {
    if (!form.name.trim() || !form.email.trim() || !form.position.trim()) {
      setError("Name, email, and position are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    onSave({ ...form, id: initial?.id ?? uid() });
  }

  const field =
    "w-full border border-[#D8D3C6] bg-[#FBFAF7] px-3 py-2 text-[14px] text-[#20262B] outline-none focus:border-[#C2793B] focus:ring-1 focus:ring-[#C2793B] rounded-sm";
  const label = "block text-[11px] tracking-wide text-[#6B7280] mb-1";

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-[13px] text-[#8A3B33] bg-[#F6E9E7] border border-[#E0BDB8] px-3 py-2 rounded-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Full name</label>
          <input
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Justin Ezeh"
          />
        </div>
        <div>
          <label className={label}>Position applied for</label>
          <input
            className={field}
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            placeholder="Frontend Developer"
          />
        </div>
        <div>
          <label className={label}>Email</label>
          <input
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ada@example.com"
          />
        </div>
        <div>
          <label className={label}>Phone</label>
          <input
            className={field}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="0801 234 5678"
          />
        </div>
        <div>
          <label className={label}>Stage</label>
          <select
            className={field}
            value={form.stage}
            onChange={(e) => setForm({ ...form, stage: e.target.value })}
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Applied date</label>
          <input
            type="date"
            className={field}
            value={form.appliedDate}
            onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className={label}>Rating</label>
        <Stars
          value={form.rating}
          onChange={(n) => setForm({ ...form, rating: n })}
          size={18}
        />
      </div>
      <div>
        <label className={label}>Notes</label>
        <textarea
          className={field + " min-h-20 resize-none"}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Interview impressions, follow-ups..."
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-[13px] text-[#4A5568] hover:text-[#20262B]"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          className="px-4 py-2 text-[13px] bg-[#20262B] text-[#F6F5F1] rounded-sm hover:bg-[#2D343B]"
        >
          {initial ? "Save changes" : "Add candidate"}
        </button>
      </div>
    </div>
  );
}
