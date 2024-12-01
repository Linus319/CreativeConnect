'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOutAction } from '../app/actions';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutAction();
      router.push('/sign-in'); 
    } catch (error) {
      console.error('Sign out failed', error);
    }
  }

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="relative" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
      <img 
        className="size-10" 
        src="https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png" 
        alt="User Profile"
      />
      {showMenu && (
        <div className="flex flex-col absolute -bottom-30 bg-gray-500 rounded-md divide-y divide-gray-300">
          <Link href="/dashboard" className="p-2">Dashboard</Link>
          <Link href="/profile" className="p-2">Profile</Link>
          <Link href="#" className="p-2">Settings</Link>
          <button onClick={handleSignOut} className="p-2 text-left">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}