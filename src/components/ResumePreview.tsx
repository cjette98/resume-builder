import React, { forwardRef } from 'react';

interface ResumeData {
  basicInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  skills: string[];
  experiences: {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationDate: string;
  }[];
  certificates: {
    id: number;
    name: string;
    issuer: string;
    issueDate: string;
    expirationDate: string;
  }[];
}

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
  return (
    <div ref={ref} className="bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-2">{data.basicInfo.fullName}</h1>
      <p className="text-gray-600 mb-4">
        {data.basicInfo.email} | {data.basicInfo.phone} | {data.basicInfo.location}
      </p>
      <p className="mb-6">{data.basicInfo.summary}</p>

      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <p className="mb-6">{data.skills.join(', ')}</p>

      <h2 className="text-2xl font-semibold mb-2">Experience</h2>
      {data.experiences.map((exp) => (
        <div key={exp.id} className="mb-4">
          <h3 className="text-xl font-semibold">{exp.position}</h3>
          <p className="text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
          <p>{exp.description}</p>
        </div>
      ))}

      <h2 className="text-2xl font-semibold mb-2">Education</h2>
      {data.education.map((edu) => (
        <div key={edu.id} className="mb-4">
          <h3 className="text-xl font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
          <p className="text-gray-600">{edu.institution} | Graduated: {edu.graduationDate}</p>
        </div>
      ))}

      <h2 className="text-2xl font-semibold mb-2">Certificates</h2>
      {data.certificates.map((cert) => (
        <div key={cert.id} className="mb-4">
          <h3 className="text-xl font-semibold">{cert.name}</h3>
          <p className="text-gray-600">
            Issued by: {cert.issuer} | Date: {cert.issueDate}
            {cert.expirationDate && ` | Expires: ${cert.expirationDate}`}
          </p>
        </div>
      ))}
    </div>
  );
});

export default ResumePreview;