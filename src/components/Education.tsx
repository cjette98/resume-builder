import React, { useState, useEffect } from 'react';

interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
}

interface EducationProps {
  updateData: (data: Education[]) => void;
}

const Education: React.FC<EducationProps> = ({ updateData }) => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    id: Date.now(),
    institution: '',
    degree: '',
    fieldOfStudy: '',
    graduationDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentEducation(prev => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    setEducations(prev => [...prev, currentEducation]);
    setCurrentEducation({
      id: Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      graduationDate: '',
    });
  };

  const removeEducation = (id: number) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };

  useEffect(() => {
    updateData(educations);
  }, [educations, updateData]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Education</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          name="institution"
          value={currentEducation.institution}
          onChange={handleChange}
          placeholder="Institution"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="degree"
          value={currentEducation.degree}
          onChange={handleChange}
          placeholder="Degree"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="fieldOfStudy"
          value={currentEducation.fieldOfStudy}
          onChange={handleChange}
          placeholder="Field of Study"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="date"
          name="graduationDate"
          value={currentEducation.graduationDate}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={addEducation}
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {educations.map(edu => (
          <div key={edu.id} className="bg-white p-4 rounded-md shadow">
            <h3 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
            <p>{edu.institution}</p>
            <p className="text-sm text-gray-600">Graduated: {edu.graduationDate}</p>
            <button
              onClick={() => removeEducation(edu.id)}
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

export default Education;