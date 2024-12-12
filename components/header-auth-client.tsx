'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOutAction } from '../app/actions';


export default function UserMenu() {

  const [showMenu, setShowMenu] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/get-profile-pic', { body: new FormData(), method: 'POST'})
    .then((res) => res.json())
    .then((data) => { 
      setImage(data);
    });
  }, []);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="relative" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
      <img 
        className="rounded-full size-10" 
        src={image ? image : "https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png" }
      />
      {showMenu ? 
        <div className="flex flex-col absolute -bottom-30 right-0 bg-gray-500 rounded-md divide-y divide-gray-300">
          <Link href="/dashboard" className="p-2">Dashboard</Link>
          <Link href="/profile" className="p-2">Profile</Link>
          <Link href="/profile/edit" className="p-2">Settings</Link>
          <form action={signOutAction} className="p-2">
            <button type="submit">
              Sign out
            </button>
          </form>
        </div>
        :
        <></>}
    </div>);

}
