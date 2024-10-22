import React, { useState, useEffect } from 'react';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
}

interface CertificatesProps {
  updateData: (data: Certificate[]) => void;
}

const Certificates: React.FC<CertificatesProps> = ({ updateData }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate>({
    id: Date.now(),
    name: '',
    issuer: '',
    issueDate: '',
    expirationDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCertificate(prev => ({ ...prev, [name]: value }));
  };

  const addCertificate = () => {
    setCertificates(prev => [...prev, currentCertificate]);
    setCurrentCertificate({
      id: Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      expirationDate: '',
    });
  };

  const removeCertificate = (id: number) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  useEffect(() => {
    updateData(certificates);
  }, [certificates, updateData]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Certificates</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={currentCertificate.name}
          onChange={handleChange}
          placeholder="Certificate Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="issuer"
          value={currentCertificate.issuer}
          onChange={handleChange}
          placeholder="Issuer"
          className="w-full p-2 border rounded-md"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="issueDate"
            value={currentCertificate.issueDate}
            onChange={handleChange}
            placeholder="Issue Date"
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            name="expirationDate"
            value={currentCertificate.expirationDate}
            onChange={handleChange}
            placeholder="Expiration Date (if applicable)"
            className="p-2 border rounded-md"
          />
        </div>
        <button
          onClick={addCertificate}
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Certificate
        </button>
      </div>

      <div className="space-y-4">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-white p-4 rounded-md shadow">
            <h3 className="font-semibold">{cert.name}</h3>
            <p>Issued by: {cert.issuer}</p>
            <p className="text-sm text-gray-600">
              Issued: {cert.issueDate}
              {cert.expirationDate && ` | Expires: ${cert.expirationDate}`}
            </p>
            <button
              onClick={() => removeCertificate(cert.id)}
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

export default Certificates;