import React, { useState, useRef } from 'react';
import { User, Briefcase, GraduationCap, Award, Code, FileDown } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import BasicInfo from './components/BasicInfo';
import Skills from './components/Skills';
import Experiences from './components/Experiences';
import Education from './components/Education';
import Certificates from './components/Certificates';
import ResumePreview from './components/ResumePreview';

function App() {
  const [activeStep, setActiveStep] = useState('basic');
  const [resumeData, setResumeData] = useState({
    basicInfo: {},
    skills: [],
    experiences: [],
    education: [],
    certificates: [],
  });

  const previewRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  const steps = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experiences', label: 'Experiences', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certificates', label: 'Certificates', icon: Award },
  ];

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({ ...prev, [section]: data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex p-6">
      <div className="bg-white rounded-lg shadow-xl w-1/2 p-8 mr-4 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Resume Builder</h1>
        
        <div className="flex mb-8 justify-between">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeStep === step.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <step.icon className="w-6 h-6 mb-1" />
              <span className="text-sm">{step.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          {activeStep === 'basic' && <BasicInfo updateData={(data) => updateResumeData('basicInfo', data)} />}
          {activeStep === 'skills' && <Skills updateData={(data) => updateResumeData('skills', data)} />}
          {activeStep === 'experiences' && <Experiences updateData={(data) => updateResumeData('experiences', data)} />}
          {activeStep === 'education' && <Education updateData={(data) => updateResumeData('education', data)} />}
          {activeStep === 'certificates' && <Certificates updateData={(data) => updateResumeData('certificates', data)} />}
        </div>

        <button
          onClick={handlePrint}
          className="mt-6 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
        >
          <FileDown className="w-5 h-5 mr-2" />
          Generate PDF
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-xl w-1/2 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Resume Preview</h2>
        <ResumePreview ref={previewRef} data={resumeData} />
      </div>
    </div>
  );
}

export default App;