import { AvailableCredential, CredentialFormats } from '@/types/credentials';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { getCountryImageUrl } from '@/utils/flags';
import EditCredentialForm from '../forms/EditCredentialForm';
import EditCredentialModal from '../modal/EditCredentialModal';

type Props = {
  credentialToEdit: AvailableCredential;
  credentialsToIssue: AvailableCredential[];
  setCredentialsToIssue: (credentials: AvailableCredential[]) => void;
};

export default function RowCredential({ credentialToEdit, credentialsToIssue, setCredentialsToIssue }: Props) {
  const [credentialSubject, setCredentialSubject] = React.useState(credentialToEdit.offer.credentialSubject);
  const [selectedFormat, setSelectedFormat] = React.useState(CredentialFormats[0]);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    setCredentialsToIssue(
      credentialsToIssue.map((credential) => {
        if (credential.offer.id == credentialToEdit.offer.id) {
          return {
            ...credential,
            offer: {
              ...credential.offer,
              credentialSubject: credentialSubject,
            },
          };
        } else {
          return credential;
        }
      })
    );
  }, [credentialSubject]);

  React.useEffect(() => {
    setCredentialsToIssue(
      credentialsToIssue.map((credential) => {
        if (credential.offer.id == credentialToEdit.offer.id) {
          return {
            ...credential,
              selectedFormat: selectedFormat,
          };
        } else {
          return credential;
        }
      })
    );
  }, [selectedFormat]);
 
  return (
    <>
      <div className="flex flex-row gap-5 justify-between">
        <div className="flex flex-row gap-3 items-center">
        <img
            src={credentialToEdit.issuer.image}
            alt={credentialToEdit.issuer.name}
            className="h-16"></img>
          <span className="text-gray-900 text-xl text-left">{credentialToEdit.title}</span>
          <PencilSquareIcon onClick={() => { setModalVisible(true) }} className="h-4 text-gray-500 hover:text-primary-400 cursor-pointer" />
        </div>
        <div className="flex flex-row items-center gap-3 w-5/12">
          <div className="w-[2px] h-[2px] bg-gray-200"></div>
          <div className="w-full">
            {/* <Dropdown
              values={CredentialFormats}
              selected={selectedFormat}
              setSelected={setSelectedFormat}
            /> */}
              <div className="text-gray-500 text-sm">Credential will be released as:</div>
              <div className="text-gray-900 text-sm">{selectedFormat}</div>
          </div>
        </div>
      </div>
      <EditCredentialModal show={modalVisible} onClose={() => { setModalVisible(false) }} credentialSubject={credentialSubject} setCredentialSubject={setCredentialSubject} />
    </>
  );
}
