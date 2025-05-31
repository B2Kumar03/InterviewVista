'use client';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ModelCloseContext } from '../components/context/ModalClose';

const CreateInterview = () => {
  const [jobProfile, setJobProfile] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Fresher');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const { isModalOpen, setIsModalOpen } = useContext(ModelCloseContext);

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput('');
      }
    }
  };

  const handleSubmit = async () => {
    if (!jobProfile || !experienceLevel || skills.length === 0 || !targetCompany) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token'); // replace with correct token key if different
      if (!token) {
        toast.error('User not authenticated.');
        return;
      }

      const response = await fetch('http://localhost:8080/api/create-interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobProfile,
          experienceLevel,
          skills,
          targetCompany,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Interview created successfully!');
        setIsModalOpen(false); // close modal
        // Optionally reset fields here
        setJobProfile('');
        setExperienceLevel('Fresher');
        setSkills([]);
        setSkillInput('');
        setTargetCompany('');
      } else {
        toast.error(data.message || 'Failed to create interview.');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Something went wrong while creating interview.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/60 z-50 fixed top-0 left-0 w-full">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
        <div className="bg-[#273b70] text-white font-semibold py-3 rounded-t-md text-center text-lg">
          <i className="fas fa-id-card mr-2"></i> Create New Interview
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Profile</label>
          <input
            className="w-full border px-3 text-[black] py-2 rounded-md outline-none"
            type="text"
            placeholder="Enter Job Profile"
            value={jobProfile}
            onChange={(e) => setJobProfile(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Experience Level</label>
          <input
            className="w-full border text-[black] px-3 py-2 rounded-md outline-none"
            type="text"
            placeholder="Fresher, 1-2 years, etc."
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Skills</label>
          <input
            className="w-full text-[black] border px-3 py-2 rounded-md outline-none"
            type="text"
            placeholder="Type and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-[#0ACF83] text-white px-2 py-1 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Target Company</label>
          <input
            className="w-full border text-[black] px-3 py-2 rounded-md outline-none"
            type="text"
            placeholder="Example: Google"
            value={targetCompany}
            onChange={(e) => setTargetCompany(e.target.value)}
          />
        </div>

        <button
          className="w-full mt-6 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Interview'}
        </button>

        <button
          className="absolute top-2 right-2 cursor-pointer hover:text-[#c9e4da] text-black text-lg font-bold"
          onClick={() => setIsModalOpen(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CreateInterview;
