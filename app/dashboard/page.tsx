'use client';

import { Images, Notifications } from '@/components/dashboard';
import Link from 'next/link';
import Chat from '@/components/dashboard-client';
import { useState, useEffect } from 'react';


export default function Dashboard() {

  const [chatHide, setChatHide] = useState('hidden');

  function toggleChat() {
    if (chatHide === 'hidden') {
      setChatHide('visible');
    } else {
      setChatHide('hidden');
    }
  }

  return (
    <>
      <div className="flex flex-row p-2 bg-gray-400 w-5/6 justify-center space-x-10 h-full max-w-screen-2xl">

        <div className="flex justify-center flex-col max-w-screen-md basis-7/12 bg-stone-600">
          <div className="flex flex-col bg-rose-600 h-5/6 rounded-3xl">

            <div id="action_bar" className="flex flex-row rounded-full">
              <div className="flex justify-start w-1/2">
                <div className="py-2 pl-4 max-5">
                  Filter: 
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-5">
                  Music
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-5">
                  Images
                </button>
              </div>
              <div className="flex justify-end w-1/2">
                <Link href="/dashboard/create">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-5">
                    ↑
                  </button>
                 </Link>
                 <Link href="/dashboard/delete">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white front-bold py-2 px-4 rounded-full mr-5">
                    🗑
                  </button>
                 </Link>
              </div>
            </div>
            <div className="flex-1 my-4 overflow-y-auto">
              <Images deleteMode="false"/>
            </div>
          </div>
          <div className="flex items-center bg-sky-600 h-1/6 rounded-3xl overflow-x-auto">
            <div className="overflow-y-auto mx-4" onClick={toggleChat}>
            <Notifications />
            </div>
          </div>
        </div>

        <div className="flex justify-center flex-col max-w-screen-md basis-5/12 bg-zinc-600">
          <div className="bg-violet-600 h-1/2 rounded-3xl">Appointments</div>
          <div className="bg-emerald-600 h-1/2 rounded-3xl">Calender</div>
        </div>
      </div>
      <div className={`fixed bottom-0 right-0 ${chatHide}`}>
        <Chat /> 
      </div>
      
    </>
  );
}
//pass value to <Chat /> to toggle visibility so you don't have to use useEffet here
