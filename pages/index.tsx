import React from 'react';
import { useRouter } from 'next/router';
import { flags } from '@/utils/flags';

export default function Home() {
  const router = useRouter();

  const handleFlagClick = (flag: any) => {
    router.push(`/authority?country=${encodeURIComponent(flag.country)}&countryCode=${encodeURIComponent(flag.countryCode)}`);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-4xl font-bold text-primary-900 text-center mt-5">Select Country</h1>
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