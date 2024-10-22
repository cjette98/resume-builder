import React, { useState, useEffect } from 'react';

interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperiencesProps {
  updateData: (data: Experience[]) => void;
}

const Experiences: React.FC<ExperiencesProps> = ({ updateData }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    id: Date.now(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExperience(prev => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    setExperiences(prev => [...prev, currentExperience]);
    setCurrentExperience({
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const removeExperience = (id: number) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  useEffect(() => {
    updateData(experiences);
  }, [experiences, updateData]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Work Experiences</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          name="company"
          value={currentExperience.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="position"
          value={currentExperience.position}
          onChange={handleChange}
          placeholder="Position"
          className="w-full p-2 border rounded-md"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={currentExperience.startDate}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            name="endDate"
            value={currentExperience.endDate}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
        </div>
        <textarea
          name="description"
          value={currentExperience.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full p-2 border rounded-md h-32"
        />
        <button
          onClick={addExperience}
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map(exp => (
          <div key={exp.id} className="bg-white p-4 rounded-md shadow">
            <h3 className="font-semibold">{exp.position} at {exp.company}</h3>
            <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
            <p className="mt-2">{exp.description}</p>
            <button
              onClick={() => removeExperience(exp.id)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;