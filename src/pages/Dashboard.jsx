import Navbar from "../components/Navbar";
function Dashboard() {
  return (
    <section>
      <div className="flex flex-1/7">
        <Navbar />
      </div>
      <div className="flex flex-col gap-5 items-center justify-start w-6/7 h-screen bg-gray-100 text-black py-5 px-10"></div>
    </section>
  );
}

export default Dashboard;
