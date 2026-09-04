import { useState, useEffect, useMemo, useRef } from "react";
import { Search, Plus, FileText } from "lucide-react";
import { STAGES, STAGE_TONE, SEED } from "./data/initialCandidates";
import Modal from "./components/UI/Modal";
import CandidateCard from "./components/CandidateCard";
import CandidateForm from "./components/CandidateForm";
import DetailPanel from "./components/DetailPanel";
import "./App.css";

export default function App() {
  const [candidates, setCandidates] = useState(null);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [positionFilter, setPositionFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detail, setDetail] = useState(null);
  const [saveError, setSaveError] = useState(false);
  const loaded = useRef(false);

  // Standard LocalStorage handling replacing non-standard window.storage API
  useEffect(() => {
    try {
      const stored = localStorage.getItem("candidates");
      setCandidates(stored ? JSON.parse(stored) : SEED);
    } catch {
      setCandidates(SEED);
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current || candidates === null) return;
    try {
      localStorage.setItem("candidates", JSON.stringify(candidates));
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [candidates]);

  const positions = useMemo(() => {
    if (!candidates) return [];
    return Array.from(new Set(candidates.map((c) => c.position))).sort();
  }, [candidates]);

  const filtered = useMemo(() => {
    if (!candidates) return [];
    const q = search.toLowerCase();
    return candidates.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.position.toLowerCase().includes(q);
      const matchesStage = stageFilter === "All" || c.stage === stageFilter;
      const matchesPosition =
        positionFilter === "All" || c.position === positionFilter;
      return matchesSearch && matchesStage && matchesPosition;
    });
  }, [candidates, search, stageFilter, positionFilter]);

  function upsertCandidate(c) {
    setCandidates((prev) => {
      const exists = prev.some((p) => p.id === c.id);
      return exists ? prev.map((p) => (p.id === c.id ? c : p)) : [c, ...prev];
    });
    setShowForm(false);
    setEditing(null);
    setDetail(null);
  }

  function changeStage(id, stage) {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage } : c)),
    );
  }

  function deleteCandidate(id) {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    setDetail(null);
  }

  function saveNotes(id, notes) {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, notes } : c)),
    );
    setDetail((d) => (d ? { ...d, notes } : d));
  }

  if (candidates === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EFF1EC] text-[#6B7280] text-[14px]">
        Loading dossier…
      </div>
    );
  }

  const counts = STAGES.reduce((acc, s) => {
    acc[s] = candidates.filter((c) => c.stage === s).length;
    return acc;
  }, {});

  return (
    <div
      className="min-h-screen bg-[#EFF1EC]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <header className="border-b border-[#DDD8CB] bg-[#FBFAF7] px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} color="#C2793B" />
            <h1
              className="text-[19px] text-[#20262B]"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Candidate Register
            </h1>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="flex items-center gap-1.5 text-[13px] bg-[#20262B] text-[#F6F5F1] px-3.5 py-2 rounded-sm hover:bg-[#2D343B]"
          >
            <Plus size={15} /> Add candidate
          </button>
        </div>

        <div className="flex items-baseline gap-8 mt-5 flex-wrap">
          <div>
            <div
              className="text-[26px] text-[#20262B] leading-none"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              {candidates.length}
            </div>
            <div className="text-[11px] text-[#8A93A6] mt-1">
              Total candidates
            </div>
          </div>
          {STAGES.map((s) => (
            <div key={s}>
              <div
                className="text-[26px] leading-none"
                style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  color: STAGE_TONE[s].text,
                }}
              >
                {counts[s]}
              </div>
              <div className="text-[11px] text-[#8A93A6] mt-1">{s}</div>
            </div>
          ))}
        </div>
      </header>

      <div className="px-8 py-4 flex flex-wrap items-center gap-3 border-b border-[#DDD8CB] bg-[#F6F5F1]">
        <div className="flex items-center gap-2 bg-[#FBFAF7] border border-[#D8D3C6] rounded-sm px-3 py-1.5 flex-1 min-w-55">
          <Search size={14} color="#8A93A6" />
          <input
            className="flex-1 outline-none text-[13px] bg-transparent text-[#20262B] placeholder:text-[#8A93A6]"
            placeholder="Search by name, email, or position…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="text-[13px] border border-[#D8D3C6] bg-[#FBFAF7] rounded-sm px-2.5 py-1.5 text-[#4A5568]"
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
        >
          <option value="All">All stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="text-[13px] border border-[#D8D3C6] bg-[#FBFAF7] rounded-sm px-2.5 py-1.5 text-[#4A5568]"
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
        >
          <option value="All">All positions</option>
          {positions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <main className="px-8 py-6">
        {saveError && (
          <div className="mb-4 text-[12px] text-[#8A3B33] bg-[#F6E9E7] border border-[#E0BDB8] px-3 py-2 rounded-sm">
            Couldn't save your changes just now — they may not persist.
          </div>
        )}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#8A93A6] text-[14px]">
            No candidates match this filter. Try widening your search, or add a
            new entry.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {STAGES.map((stage) => (
              <div key={stage}>
                <div
                  className="flex items-center gap-2 mb-2.5 pb-1.5 border-b-2"
                  style={{ borderColor: STAGE_TONE[stage].tab }}
                >
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: STAGE_TONE[stage].text }}
                  >
                    {stage}
                  </span>
                  <span className="text-[11px] text-[#8A93A6]">
                    ({filtered.filter((c) => c.stage === stage).length})
                  </span>
                </div>
                <div className="space-y-2.5">
                  {filtered
                    .filter((c) => c.stage === stage)
                    .map((c) => (
                      <CandidateCard
                        key={c.id}
                        candidate={c}
                        onOpen={setDetail}
                        onStageChange={changeStage}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <Modal
          title={editing ? "Edit candidate" : "Add candidate"}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          wide
        >
          <CandidateForm
            initial={editing}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
            onSave={upsertCandidate}
          />
        </Modal>
      )}

      {detail && (
        <DetailPanel
          candidate={detail}
          onClose={() => setDetail(null)}
          onEdit={(c) => {
            setDetail(null);
            setEditing(c);
            setShowForm(true);
          }}
          onDelete={deleteCandidate}
          onNoteSave={saveNotes}
        />
      )}
    </div>
  );
}
