import { Images, Messages } from '@/components/dashboard';
import Link from 'next/link';
import { useState } from 'react';

export default async function Dashboard() {
  return (
    <>
      <div className="flex flex-row p-2 bg-gray-400 w-5/6 justify-center space-x-10 h-full max-w-screen-2xl">

        <div className="flex justify-center flex-col max-w-screen-md basis-7/12 bg-stone-600">
          <div className="bg-rose-600 h-5/6 rounded-3xl ">

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
            <Images deleteMode="false" className="overflow-y-auto"/>
          </div>
          <div className="flex items-center bg-sky-600 h-1/6 rounded-3xl">
            <Messages />
          </div>
        </div>

        <div className="flex justify-center flex-col max-w-screen-md basis-5/12 bg-zinc-600">
          <div className="bg-violet-600 h-1/2 rounded-3xl">Appointments</div>
          <div className="bg-emerald-600 h-1/2 rounded-3xl">Calender</div>
        </div>
      </div>
    </>
  );
}
