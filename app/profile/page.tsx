"use client";

import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AudioPlayer from '@/components/audio-player';
import { useState, useEffect } from 'react';

interface Audio {
    title: string;
    url: string;
    artwork_id: number;
    id: number;
    image_url: string;
}

interface User {
    email: string;
    display_name: string;
    profile_image: string;
    bio: string;
}

export default function ProfilePage() {
    const [audio, setAudio] = useState<Audio[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true)

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const res = await fetch('/api/get-current-user', { method: 'POST'});
            const userData = await res.json();
            setUser(userData);
    
            const formData = new FormData();
            formData.append("email", userData.email);
            const audioRes = await fetch('/api/get-user-content', {
                method: 'POST',
                body: formData,
            });
            const audioData = await audioRes.json();
            setAudio(audioData);        
          } catch (error) {
            console.error("Error fetching user data or audio content", error);
          } finally {
            setLoading(false);
          }
        };
        fetchUserData();
    }, []);

    const handleToggleChange = () => {
        if (audioEnabled) {
            console.log("disabled audio");
            setAudioEnabled(false);
        }
        else {
            console.log("enabled audio");
            setAudioEnabled(true);
        }
    }

    return (
        <>
        {loading ? <div>Loading...</div> :
        <div className="grid grid-cols-4 bg-gray-600 w-5/6 h-auto">
            <div className="relative col-start-1 bg-purple-600 m-4 rounded">

                <Link 
                    className="m-4 top-2 left-2 bg-white p-2 rounded-full hover:bg-gray-100 absolute transform -translate-x-4 -translate-y-4" 
                    href={`/profile/edit?email=${user.email}`}>
                    <Image 
                        src={"/images/edit-button.svg"} 
                        alt={"Edit profile button"} 
                        width = {30}
                        height = {30}
                    />
                </Link>

                <h3 className="text-center m-4 text-4xl rounded">{user.display_name}</h3>

                <div className="flex m-4 justify-center items-center">
                    <div className="w-2/3 h-auto aspect-square overflow-hidden rounded-full">
                        <Image
                            src={user.profile_image ? user.profile_image : "/images/default-profile-image.jpg"}
                            alt="Profile pic"
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                <h1 className="mx-4">Bio</h1>
                <div className="mb-4 mx-4 p-4 bg-gray-500 rounded-lg">
                    {user.bio}
                </div>

                <div className="flex justify-center">
                    <button className="m-4 px-8 py-4 border rounded-lg bg-gray-500 hover:bg-gray-400">Send message</button>
                </div>
                
                
            </div>

            <div className="m-4 rounded bg-purple-600 col-start-2 col-span-3 flex flex-col">
                <div className="py-4 px-12 flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="mr-2">Images</span>
                        <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" className="peer sr-only" />
                            <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                            <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
                        </label>
                    </div>

                    <div className="flex items-center">
                        <span className="mr-2">Audio</span>
                        <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" className="peer sr-only" defaultChecked onChange={handleToggleChange}/>
                            <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                            <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
                        </label>
                    </div>

                    <div className="flex items-center">
                        <span className="mr-2">Video</span>
                        <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" className="peer sr-only" />
                            <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                            <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
                        </label>
                    </div>
                </div>
                <div className="bg-orange-400 flex-grow m-0 rounded grid grid-cols-4 grid-rows-3 gap-4 p-4">
                    {audioEnabled ? audio.map((track) => 
                        <div key={track.id} className="col-span-1 row-span-1 flex justify-center items-center bg-gray-800 rounded-lg">
                            <AudioPlayer 
                                imageUrl={track.image_url}
                                title={track.title}
                                src={track.url}
                            />
                        </div>
                    ) : <div></div>}
                </div>
            </div>
        </div>}
        </>
    )
}
