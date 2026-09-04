export const STAGES = [
  "Applied",
  "Interview",
  "Test",
  "Offer",
  "Accepted",
  "Rejected",
];

export const STAGE_TONE = {
  Applied: { tab: "#8A93A6", text: "#4A5568" },
  Interview: { tab: "#C2793B", text: "#8A521F" },
  Test: { tab: "#7C6BC4", text: "#564A93" },
  Offer: { tab: "#3F7D58", text: "#2C5A3F" },
  Accepted: { tab: "#1F8A6F", text: "#146552" },
  Rejected: { tab: "#B4534A", text: "#8A3B33" },
};

export const SEED = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    position: "Frontend Developer",
    stage: "Applied",
    rating: 4,
    notes: "Strong React fundamentals.",
    appliedDate: "2026-09-01",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "08023456789",
    position: "Backend Developer",
    stage: "Interview",
    rating: 5,
    notes: "Excellent system design answers.",
    appliedDate: "2026-08-24",
  },
  {
    id: 3,
    name: "Mike Lee",
    email: "mike@example.com",
    phone: "08034567890",
    position: "UI Designer",
    stage: "Test",
    rating: 3,
    notes: "Portfolio needs more range.",
    appliedDate: "2026-08-20",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "08045678901",
    position: "Frontend Developer",
    stage: "Offer",
    rating: 4,
    notes: "Negotiating start date.",
    appliedDate: "2026-08-15",
  },
];

export function uid() {
  return Date.now() + Math.floor(Math.random() * 1000);
}
