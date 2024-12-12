"use client"

import ProfileContent from '@/components/profile-content';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Chat } from './chat';
import { useSearchParams } from 'next/navigation';


interface User {
    email: string;
    display_name: string;
    profile_image: string;
    bio: string;
    sub_types: string[];
    city: string;
    state: string;
    user_type: string;
}

interface Audio {
    title: string;
    url: string;
    artwork_id: number;
    id: number;
    caption: string;
    image_url: string;
}

interface Image {
    id: number;
    email: string;
    url: string;
    is_song_artwork: boolean;
    caption: string;
}

interface Video {
    url: string;
    email: string;
    title: string;
    caption: string;
    id: number;
}

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [audio, setAudio] = useState<Audio[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
    const [imagesEnabled, setImagesEnabled] = useState<boolean>(true);
    const [videosEnabled, setVideosEnabled] = useState<boolean>(true);
    const [toggleChat, setToggleChat] = useState("visible");


    useEffect(() => {
        const fetchUserData = async () => {
            if (!email) {
                try {
                    const res = await fetch('/api/get-current-user', { method: 'POST' });
                    const userData = await res.json();
                    setUser(userData);
    
                    const formData = new FormData();
                    formData.append("email", userData.email);
                    const contentRes = await fetch('/api/get-user-profile', {
                        method: 'POST',
                        body: formData,
                    });
                    const contentData = await contentRes.json();
                    setProfile(contentData.user);
                    setAudio(contentData.audio);
                    setImages(contentData.images);
                    setVideos(contentData.videos);
                } catch (error) {
                    console.error("Error fetching user data or audio content", error);
                } finally {
                    setLoading(false);
                }
            }
            else {
                try {
                    const res = await fetch('/api/get-current-user', { method: 'POST' });
                    const userData = await res.json();
                    setUser(userData);
    
                    const formData = new FormData();
                    formData.append("email", email);
                    const contentRes = await fetch('/api/get-user-profile', {
                        method: 'POST',
                        body: formData,
                    });
                    const contentData = await contentRes.json();
                    setProfile(contentData.user);
                    setAudio(contentData.audio);
                    setImages(contentData.images);
                    setVideos(contentData.videos);
                } catch (error) {
                    console.error("Error fetching user data or audio content", error);
                } finally {
                    setLoading(false);
                }
            }

            
        };
        fetchUserData();
    }, []);

    const handleToggleAudio = () => setAudioEnabled(!audioEnabled);
    const handleToggleImages = () => setImagesEnabled(!imagesEnabled);
    const handleToggleVideos = () => setVideosEnabled(!videosEnabled);

    function toggleVisible() {
        if (toggleChat === 'visible') {
          setToggleChat("hidden");
        } else {
          setToggleChat("visible");
        }
      }

    return (
        <>
            {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-4 w-5/6 h-auto">
                    <div className="relative col-start-1 bg-purple-500 bg-opacity-50 m-4 rounded-xl">
                        <h3 className="text-center m-4 text-4xl rounded">{profile.display_name}</h3>

                        <div className="flex m-4 justify-center items-center">
                            <div className="w-2/3 h-auto overflow-hidden rounded-full">
                                <Image
                                    src={profile.profile_image || "/images/default-profile-image.jpg"}
                                    alt="Profile pic"
                                    width={150}
                                    height={150}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            
                        </div>

                        {profile.city || profile.state ? 
                            profile.city && profile.state ? <div className="text-lg text-center">{`${profile.city}, ${profile.state}`}</div>
                            :
                            profile.city ? <div className="text-lg text-center">{profile.city}</div>
                            :
                            <div className="text-lg text-center">{profile.state}</div>
                        : <div></div>}
                        

                        {profile.sub_types ? <div className="">
                            <h1 className="mx-4 mt-4">{profile.user_type === "creative" ? "Skills" : "Rooms"}</h1>
                            <div className="flex flex-wrap gap-2">
                                {profile.sub_types.map((type) =>
                                    <div key={type} className="m-4 bg-purple-500 text-white py-1 px-3 rounded-full text-sm font-medium">{type}</div>
                                )}
                            </div>
                        </div> : <div></div>}

                        {profile.bio ? 
                            <>
                                <h1 className="mx-4">Bio</h1>
                                <div className="mb-4 mx-4 p-4 bg-gray-500 rounded-lg">
                                    {profile.bio}
                                </div> 
                            </> : <div></div>}

                        {email ? (<div className="flex justify-center">
                            <button onClick={toggleVisible} className="bg-gray-700 p-3 rounded-xl">Message</button>
                        </div>): null }
                        
                    </div>

                    {user && (
                        <ProfileContent
                            audio={audio}
                            images={images}
                            videos={videos}
                            audioEnabled={audioEnabled}
                            imagesEnabled={imagesEnabled}
                            videosEnabled={videosEnabled}
                            handleToggleAudio={handleToggleAudio}
                            handleToggleImages={handleToggleImages}
                            handleToggleVideos={handleToggleVideos}
                            userType={profile.user_type}
                        />
                    )}
                </div>
            )}
            {email ? (
                <div className={`fixed bottom-0 right-0 z-50 p-3 bg-gray-800 rounded-xl ${toggleChat}`}>
                    <Chat target={email} />   
                </div>) 
                : null}
            
        </>
    );
}
