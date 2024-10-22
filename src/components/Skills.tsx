import React, { useState, useEffect } from 'react';

interface SkillsProps {
  updateData: (data: string[]) => void;
}

const suggestedSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'Java', 'C#', 'SQL', 'Git', 'Docker', 'AWS', 'Azure',
  'GraphQL', 'REST API', 'MongoDB', 'PostgreSQL', 'Redux',
  'Vue.js', 'Angular', 'Express.js', 'Spring Boot', 'CI/CD',
  'Agile', 'Scrum', 'TDD', 'Machine Learning', 'Data Structures',
  'Algorithms', 'System Design', 'Cloud Computing', 'DevOps'
];

const Skills: React.FC<SkillsProps> = ({ updateData }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills(prev => [...prev, customSkill]);
      setCustomSkill('');
    }
  };

  useEffect(() => {
    updateData(selectedSkills);
  }, [selectedSkills, updateData]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Skills</h2>
      
      <div className="flex flex-wrap gap-2">
        {suggestedSkills.map(skill => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedSkills.includes(skill)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          placeholder="Add custom skill"
          className="flex-grow p-2 border rounded-md"
        />
        <button
          onClick={addCustomSkill}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Selected Skills:</h3>
        <ul className="list-disc list-inside">
          {selectedSkills.map(skill => (
            <li key={skill} className="text-gray-700">{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;