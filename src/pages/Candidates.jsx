import Navbar from "../components/Navbar";
function Candidates() {
  const candidates = [
    {
      id: 1,
      name: "Justin Ezeh",
      email: "justincherechukwu@gmail.com",
      phone: "08079761878",
      position: "Frontend Developer",
      stage: "Applied",
      rating: 4,
      notes: "Strong React fundamentals",
      appliedDate: "2026-09-01",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      phone: "08012345678",
      position: "Frontend Developer",
      stage: "Applied",
      rating: 3,
      notes: "Good understanding of CSS",
      appliedDate: "2026-09-02",
    },
  ];
  return (
    <section className="p-4 w-full md:w-[80%] lg:w-[85%] ml-auto">
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>
      <div className="flex flex-col md:flex-row gap-5 items-center justify-start w-full py-5 px-10">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white p-4 rounded-2xl shadow mb-4 w-25% max-w-65 overflow-auto"
          >
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p className="text-gray-600">{candidate.email}</p>
            <p className="text-gray-600">{candidate.phone}</p>
            <p className="text-gray-600">{candidate.position}</p>
            <p className="text-gray-600">Stage: {candidate.stage}</p>
            <p className="text-gray-600">Rating: {candidate.rating}</p>
            <p className="text-gray-600">Notes: {candidate.notes}</p>
            <p className="text-gray-600">
              Applied Date: {candidate.appliedDate}
            </p>
            <div className="flex gap-2 mt-2">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Candidates;
