'use client';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ModelCloseContext } from '../components/context/ModalClose';

const jobSuggestions = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'DevOps Engineer', 'Data Scientist', 'Product Manager',
  'UI/UX Designer', 'QA Engineer', 'Machine Learning Engineer',
];

const skillSuggestions = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Django',
  'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'CSS', 'HTML',
];

const CreateInterview = () => {
  const [jobProfile, setJobProfile] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Fresher');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);

  const { setIsModalOpen } = useContext(ModelCloseContext);

  const containsSpecialChars = (str) => /[^a-zA-Z0-9\s]/.test(str);

  const handleAddSkill = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && skillInput.trim()) {
      e.preventDefault();
      const trimmedSkill = skillInput.trim();
      if (!skills.includes(trimmedSkill)) {
        if (containsSpecialChars(trimmedSkill)) {
          setErrors((prev) => ({ ...prev, skills: 'No special characters allowed in skills.' }));
          return;
        }
        setSkills([...skills, trimmedSkill]);
        setSkillInput('');
        setErrors((prev) => ({ ...prev, skills: '' }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!jobProfile.trim()) {
      newErrors.jobProfile = 'Job profile is required.';
    } else if (containsSpecialChars(jobProfile)) {
      newErrors.jobProfile = 'No special characters allowed.';
    }

    if (!targetCompany.trim()) {
      newErrors.targetCompany = 'Target company is required.';
    } else if (containsSpecialChars(targetCompany)) {
      newErrors.targetCompany = 'No special characters allowed.';
    }

    if (skills.length === 0) {
      newErrors.skills = 'Add at least one skill.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
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
        setIsModalOpen(false);
        setJobProfile('');
        setExperienceLevel('Fresher');
        setSkills([]);
        setSkillInput('');
        setTargetCompany('');
        setErrors({});
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

  const filteredJobSuggestions = jobSuggestions.filter(
    (j) => j.toLowerCase().includes(jobProfile.toLowerCase()) && jobProfile
  );

  const filteredSkillSuggestions = skillSuggestions.filter(
    (s) => s.toLowerCase().includes(skillInput.toLowerCase()) && skillInput && !skills.includes(s)
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/60 z-50 fixed top-0 left-0 w-full">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
        <div className="bg-[#273b70] text-white font-semibold py-3 rounded-t-md text-center text-lg">
          <i className="fas fa-id-card mr-2"></i> Create New Interview
        </div>

        <div className="mt-4">
          {/* Job Profile */}
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Profile</label>
          <div className="relative">
            <input
              className={`w-full border px-3 text-black py-2 rounded-md outline-none ${
                errors.jobProfile ? 'border-red-500' : ''
              }`}
              type="text"
              placeholder="Enter Job Profile"
              value={jobProfile}
              onChange={(e) => setJobProfile(e.target.value)}
              onFocus={() => setShowJobSuggestions(true)}
              onBlur={() => setTimeout(() => setShowJobSuggestions(false), 150)}
            />
            {showJobSuggestions && filteredJobSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md shadow">
                {filteredJobSuggestions.map((job, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                    onMouseDown={() => {
                      setJobProfile(job);
                      setShowJobSuggestions(false);
                    }}
                  >
                    {job}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.jobProfile && <p className="text-red-500 text-xs mt-1">{errors.jobProfile}</p>}

          {/* Experience Level */}
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Experience Level</label>
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full border text-black px-3 py-2 rounded-md outline-none"
          >
            <option value="Fresher">Fresher</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="Senior">Senior</option>
          </select>

          {/* Skills */}
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Skills</label>
          <div className="relative">
            <input
              className={`w-full text-black border px-3 py-2 rounded-md outline-none ${
                errors.skills ? 'border-red-500' : ''
              }`}
              type="text"
              placeholder="Type and press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
            />
            {skillInput.length > 0 && (
              <button
                onClick={handleAddSkill}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#273b70] text-white px-3 py-1 rounded-md text-sm"
              >
                Add
              </button>
            )}
            {filteredSkillSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md shadow text-black text-sm">
                {filteredSkillSuggestions.map((skill, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSkills([...skills, skill]);
                      setSkillInput('');
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
          <div className="flex flex-wrap mt-2 gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 bg-[#0ACF83] text-white px-2 py-1 text-xs rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => {
                    const updatedSkills = skills.filter((_, i) => i !== idx);
                    setSkills(updatedSkills);
                  }}
                  className="ml-1 text-white hover:text-black font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Target Company */}
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Target Company</label>
          <input
            className={`w-full border text-black px-3 py-2 rounded-md outline-none ${
              errors.targetCompany ? 'border-red-500' : ''
            }`}
            type="text"
            placeholder="Example: Google"
            value={targetCompany}
            onChange={(e) => setTargetCompany(e.target.value)}
          />
          {errors.targetCompany && <p className="text-red-500 text-xs mt-1">{errors.targetCompany}</p>}
        </div>

        {/* Submit Button */}
        <button
          className={`w-full mt-6 py-2 rounded-md ${
            loading || (!jobProfile && !targetCompany && !skills.length)
              ? 'bg-gray-500 cursor-not-allowed text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
          onClick={handleSubmit}
          disabled={loading || (!jobProfile && !targetCompany && !skills.length)}
        >
          {loading ? 'Creating...' : 'Create Interview'}
        </button>

        {/* Close Button */}
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
