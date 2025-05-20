import React, { useContext } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ModelCloseContext } from "../context/ModalClose";
import CreateInterview from "../../pages/CreateInterview";

const MainSection = () => {
  const { isModalOpen, setIsModalOpen } = useContext(ModelCloseContext);
  return (
    
    <section className="bg-[#0B1120] min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-10">
      {isModalOpen && <CreateInterview/>}
      {/* Text content */}
      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
            AI-Powered
          </span>{" "}
          Mock Interviews
        </h1>
        <p className="mt-6 text-gray-300 text-lg">
          Take your interview prep to the next level with AI-driven mock
          interviews. Get instant feedback, improve your communication skills,
          and boost your confidence—all in a realistic interview setting.
        </p>
        <button onClick={() => setIsModalOpen(true)} className="mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition duration-300 group">
          Get Started
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
        </button>
      </div>

      {/* Image */}
      <div className="w-full max-w-xl flex justify-center">
        <img
          src="https://github.com/B2Kumar03/project_Image/blob/main/Screenshot%202025-05-18%20194856.png?raw=true"
          alt="Interview Room"
          className="rounded-lg shadow-lg w-full object-contain"
        />
      </div>
    </section>
  );
};

export default MainSection;
