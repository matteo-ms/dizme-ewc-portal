import React from 'react';
import Button from '@/components/walt/button/Button';
import BaseModal from '@/components/walt/modal/BaseModal';

type Props = {
  show: boolean;
  onClose: () => void;
  credentialSubject: JSON;
  setCredentialSubject: (credentialSubject: JSON) => void;
};


export default function EditCredentialModal({ show, onClose, credentialSubject, setCredentialSubject }: Props) {
  const [subjectJson, setSubjectJson] = React.useState(credentialSubject);

  const handleInputChange = (key: string, value: string) => {
    setSubjectJson((prevSubject) => ({
      ...prevSubject,
      [key]: value
    }));
  };

  return (
    <BaseModal show={show} onClose={onClose}>
      <div className="flex flex-col items-left">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(subjectJson).map(([key, value]) => (
          <div key={key} className="mt-4">
            <label htmlFor={key} className="text-gray-800">{key}</label>
            <input
              type="text"
              id={key}
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="w-full h-10 border-2 border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-end gap-2 mt-5">
        <Button onClick={onClose} style="link">
          Cancel
        </Button>
        <Button onClick={() => {
          setCredentialSubject(subjectJson);
          onClose();
        }} style="button">
          Save
        </Button>
      </div>
    </div>
    </BaseModal>
  );
}
