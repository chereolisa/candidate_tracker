import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        id="navbar"
        className="flex-col gap-5 items-center justify-start w-[20%] lg:w-[15%] h-screen bg-gray-800 text-white py-5 px-10 fixed z-10 hidden md:flex"
      >
        <ul className="flex flex-col gap-5 items-center justify-center text-left w-full cursor-pointer">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-blue-500 py-2 w-full ${isActive ? "text-blue-500" : ""}`
            }
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              `hover:text-blue-500 py-2 w-full ${isActive ? "text-blue-500" : ""}`
            }
          >
            <li>Candidates</li>
          </NavLink>
          <NavLink
            to="/pipeline"
            className={({ isActive }) =>
              `hover:text-blue-500 py-2 w-full ${isActive ? "text-blue-500" : ""}`
            }
          >
            <li>Pipeline</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-blue-500 py-2 w-full ${isActive ? "text-blue-500" : ""}`
            }
          >
            <li>Contact</li>
          </NavLink>
        </ul>
      </div>

      <div className="lg:hidden text-right">
        <button
          id="menu-btn"
          class="text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {" "}
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden ${isOpen ? "block fixed bg-gray-800 w-full text-white" : "hidden"}`}
      >
        <ul className="flex flex-col gap-5 items-center justify-center text-center w-full cursor-pointer">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-blue-500 py-2 w-full ${isActive ? "text-blue-500" : ""}`
            }
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              `hover:text-blue-500 py-2 w-full ${isActive ? "text-blue-500" : ""}`
            }
          >
            <li>Candidates</li>
          </NavLink>
          <NavLink
            to="/pipeline"
            className={({ isActive }) =>
              `hover:text-blue-500 py-2 w-full ${isActive ? "text-blue-500" : ""}`
            }
          >
            <li>Pipeline</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-blue-500 py-2 w-full ${isActive ? "text-blue-500" : ""}`
            }
          >
            <li>Contact</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
