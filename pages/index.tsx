import React from 'react';
import { useRouter } from 'next/router';
import { flags } from '@/utils/flags';
import Icon from '@/components/walt/logo/Icon';

export default function Home() {
  const router = useRouter();

  const handleFlagClick = (flag: any) => {
    router.push(`/authority?country=${encodeURIComponent(flag.country)}&countryCode=${encodeURIComponent(flag.countryCode)}`);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <Icon height={150} width={150} />
        <h1 className="text-4xl font-bold text-primary-900 text-center mt-5">PID Issuance & Verification</h1>
        <h2 className="text-xl text-primary-700 text-center mt-2">Select Your Country to Begin</h2>
        <p className="text-center mt-2 max-w-md">Initiate the process of obtaining or verifying your Personal Identification (PID) by choosing your country. This ensures you are directed to the appropriate national authority's portal for PID services.</p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {flags.map((flag, index) => (
            <div key={index} className="cursor-pointer" onClick={() => handleFlagClick(flag)}>
              <img src={flag.imageUrl} alt={flag.country} style={{ maxWidth: '100px'}} />
              <p className="text-center mt-2">{flag.country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}