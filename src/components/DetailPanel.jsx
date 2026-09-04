import React, { useState } from "react";
import Modal from "./UI/Modal";
import Stars from "./UI/Stars";
import { Pencil, Trash2 } from "lucide-react";
import { STAGE_TONE } from "../data/initialCandidates";

export default function DetailPanel({
  candidate,
  onClose,
  onEdit,
  onDelete,
  onNoteSave,
}) {
  const [notes, setNotes] = useState(candidate.notes);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const tone = STAGE_TONE[candidate.stage];

  return (
    <Modal title="Candidate dossier" onClose={onClose}>
      <div className="flex items-start justify-between">
        <div>
          <div
            className="text-[19px] text-[#20262B]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {candidate.name}
          </div>
          <div className="text-[13px] text-[#6B7280]">{candidate.position}</div>
        </div>
        <span
          className="text-[11px] px-2 py-1 rounded-sm border"
          style={{ borderColor: tone.tab, color: tone.text }}
        >
          {candidate.stage}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-[13px]">
        <div>
          <div className="text-[11px] text-[#8A93A6]">Email</div>
          <div className="text-[#20262B]">{candidate.email}</div>
        </div>
        <div>
          <div className="text-[11px] text-[#8A93A6]">Phone</div>
          <div className="text-[#20262B]">{candidate.phone || "—"}</div>
        </div>
        <div>
          <div className="text-[11px] text-[#8A93A6]">Applied</div>
          <div className="text-[#20262B]">{candidate.appliedDate}</div>
        </div>
        <div>
          <div className="text-[11px] text-[#8A93A6]">Rating</div>
          <Stars value={candidate.rating} size={14} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[11px] text-[#8A93A6] mb-1">Notes</div>
        <textarea
          className="w-full border border-[#D8D3C6] bg-white px-3 py-2 text-[13px] text-[#20262B] rounded-sm min-h-[90px] outline-none focus:border-[#C2793B]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={() => onNoteSave(candidate.id, notes)}
            className="text-[12px] px-3 py-1.5 bg-[#20262B] text-[#F6F5F1] rounded-sm hover:bg-[#2D343B]"
          >
            Save notes
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E3DFD3]">
        <button
          onClick={() => onEdit(candidate)}
          className="flex items-center gap-1.5 text-[13px] text-[#4A5568] hover:text-[#20262B]"
        >
          <Pencil size={14} /> Edit candidate
        </button>
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex items-center gap-1.5 text-[13px] text-[#8A3B33] hover:text-[#6B2A24]"
          >
            <Trash2 size={14} /> Delete
          </button>
        ) : (
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-[#6B7280]">Remove permanently?</span>
            <button
              onClick={() => onDelete(candidate.id)}
              className="text-[#8A3B33] font-medium"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-[#6B7280]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
