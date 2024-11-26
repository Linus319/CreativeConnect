"use client"

import ProfileContent from '@/components/profile-content';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Chat } from './chat';


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
    id: number;
}

export default function ProfilePage() {
    const [audio, setAudio] = useState<Audio[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
    const [imagesEnabled, setImagesEnabled] = useState<boolean>(true);
    const [videosEnabled, setVideosEnabled] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
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
                setAudio(contentData.audio);
                setImages(contentData.images);
                setVideos(contentData.videos);
            } catch (error) {
                console.error("Error fetching user data or audio content", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleToggleAudio = () => setAudioEnabled(!audioEnabled);
    const handleToggleImages = () => setImagesEnabled(!imagesEnabled);
    const handleToggleVideos = () => setVideosEnabled(!videosEnabled);

    return (
        <>
            {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-4 w-5/6 h-auto">
                    <div className="relative col-start-1 bg-purple-500 bg-opacity-50 m-4 rounded-xl">
                        <Link
                            className="m-4 top-4 left-4 bg-white p-2 rounded-full hover:bg-gray-200 absolute transform -translate-x-4 -translate-y-4"
                            href={`/profile/edit?email=${user.email}`}>
                            <Image
                                src={"/images/edit-button.svg"}
                                alt={"Edit profile button"}
                                width={30}
                                height={30}
                            />
                        </Link>

                        <h3 className="text-center m-4 text-4xl rounded">{user.display_name}</h3>

                        <div className="flex m-4 justify-center items-center">
                            <div className="w-2/3 h-auto overflow-hidden rounded-full">
                                <Image
                                    src={user.profile_image || "/images/default-profile-image.jpg"}
                                    alt="Profile pic"
                                    width={150}
                                    height={150}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {user.city || user.state ? 
                            user.city && user.state ? <div className="text-lg text-center">{`${user.city}, ${user.state}`}</div>
                            :
                            user.city ? <div className="text-lg text-center">{user.city}</div>
                            :
                            <div className="text-lg text-center">{user.state}</div>
                        : <div></div>}
                        

                        {user.sub_types ? <div className="">
                            <h1 className="mx-4 mt-4">{user.user_type === "creative" ? "Skills" : "Rooms"}</h1>
                            <div className="flex flex-wrap gap-2">
                                {user.sub_types.map((type) =>
                                    <div key={type} className="m-4 bg-purple-500 text-white py-1 px-3 rounded-full text-sm font-medium">{type}</div>
                                )}
                            </div>
                        </div> : <div></div>}

                        {user.bio ? 
                            <>
                                <h1 className="mx-4">Bio</h1>
                                <div className="mb-4 mx-4 p-4 bg-gray-500 rounded-lg">
                                    {user.bio}
                                </div> 
                            </> : <div></div>}

                        <div className="flex justify-center">
                          <Chat target="ding@dong.com" />
                        </div>
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
                            userType={user.user_type}
                        />
                    )}
                </div>
            )}
        </>
    );
}
