'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ContractModal from './ContractModal';
import { getAuthSessionAction, signContractAction } from '@/auth/actions';

export default function ContractOverlay() {
  const { data: session, status, update } = useSession();
  const [showContract, setShowContract] = useState(false);
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    const checkContract = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        const { isContractSigned } = await getAuthSessionAction();
        if (!isContractSigned) {
          setArtistName(session.user.name || session.user.email || '');
          setShowContract(true);
        }
      }
    };

    checkContract();
  }, [session, status]);

  const handleSign = async () => {
    await signContractAction();
    setShowContract(false);
    // Refresh session to update any local state
    await update();
  };

  if (!showContract) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-black">
      <ContractModal
        artistName={artistName}
        onSign={handleSign}
      />
    </div>
  );
}
