import React, { useState, useEffect } from 'react';

interface BasicInfoProps {
  updateData: (data: any) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ updateData }) => {
  const [basicInfo, setBasicInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    updateData(basicInfo);
  }, [basicInfo, updateData]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Basic Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          value={basicInfo.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          value={basicInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded-md"
        />
        <input
          type="tel"
          name="phone"
          value={basicInfo.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="location"
          value={basicInfo.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded-md"
        />
      </div>
      <textarea
        name="summary"
        value={basicInfo.summary}
        onChange={handleChange}
        placeholder="Professional Summary"
        className="w-full p-2 border rounded-md h-32"
      />
    </div>
  );
};

export default BasicInfo;