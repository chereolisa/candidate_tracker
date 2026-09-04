import React from "react";
import Stars from "./UI/Stars";
import { STAGES, STAGE_TONE } from "../data/initialCandidates";

export default function CandidateCard({ candidate, onOpen, onStageChange }) {
  const tone = STAGE_TONE[candidate.stage];
  return (
    <div
      className="bg-[#FBFAF7] border border-[#E3DFD3] rounded-sm p-3 cursor-pointer hover:border-[#C2793B] transition-colors relative"
      onClick={() => onOpen(candidate)}
    >
      {/* <div
        className="absolute top-0 left-3 -translate-y-1/2 px-1.5 text-[9px] tracking-wide bg-[#FBFAF7]"
        style={{ color: tone.text }}
      >
        {String(candidate.id).slice(-4)}
      </div> */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[14px] text-[#20262B] font-medium">
            {candidate.name}
          </div>
          <div className="text-[12px] text-[#6B7280]">{candidate.position}</div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Stars value={candidate.rating} size={12} />
        <select
          className="text-[11px] border border-[#E3DFD3] rounded-sm bg-transparent px-1 py-0.5 text-[#4A5568] outline-none"
          value={candidate.stage}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onStageChange(candidate.id, e.target.value)}
        >
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
