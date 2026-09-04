import React from "react";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children, wide }) {
  return (
    <div
      className="fixed inset-0 bg-[#161A1E]/50 flex items-start justify-center p-6 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`bg-[#FBFAF7] mt-10 mb-10 rounded-sm shadow-xl w-full ${wide ? "max-w-2xl" : "max-w-lg"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E3DFD3] px-5 py-4">
          <h2
            className="text-[15px] font-medium text-[#20262B]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#8A93A6] hover:text-[#20262B]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
