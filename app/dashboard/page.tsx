'use client';

import { Notifications, Connections, Chat } from '@/components/dashboard';
import ProfileContent from '@/components/profile-content';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Calendar} from "@nextui-org/calendar";

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

export default function Dashboard() {
  const [audio, setAudio] = useState<Audio[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [imagesEnabled, setImagesEnabled] = useState<boolean>(true);
  const [videosEnabled, setVideosEnabled] = useState<boolean>(true);
  const [sendTo, setSendTo] = useState('none');
  const [sendToName, setSendToName] = useState('none');
  const [startHidden, setStartHidden] = useState("hidden");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/get-current-user', { method: 'POST' });
        const userData = await res.json();
        setUser(userData);

        const formData = new FormData();
        formData.append('email', userData.email);
        const contentRes = await fetch('/api/get-user-profile', {
          method: 'POST',
          body: formData,
        });
        const contentData = await contentRes.json();
        setAudio(contentData.audio);
        setImages(contentData.images);
        setVideos(contentData.videos);
      } catch (error) {
        console.error('Error fetching user data or audio content', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleToggleAudio = () => setAudioEnabled(!audioEnabled);
  const handleToggleImages = () => setImagesEnabled(!imagesEnabled);
  const handleToggleVideos = () => setVideosEnabled(!videosEnabled);

  function selectChat(e: React.ChangeEvent<any>) {
    setSendTo(e.currentTarget.attributes.id.value);
    setSendToName(e.currentTarget.getAttribute("data-name"))
    setStartHidden("visible");
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-row p-2 bg-gray-700 w-5/6 justify-center space-x-10 h-full max-w-screen-2xl rounded-xl">
          <div className="flex justify-center flex-col max-w-screen-md basis-7/12">
            <div className="flex flex-col h-full rounded-3xl">
              <div className="flex justify-between m-3">
              <Link href="/dashboard/create" className="bg-purple-500 rounded-full p-2">Add stuff</Link>
              <Link href="/dashboard/delete" className="bg-purple-500 rounded-full p-2">Del stuff</Link>
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
          </div>

          <div className="flex justify-center flex-col max-w-screen-md basis-5/12 bg-gray-600 rounded-xl">
            <div className="h-1/3 rounded-3xl">
              <h1 className="text-2xl m-4 text-center">Connections</h1>
              <Notifications selectChat={selectChat} />
            </div>
              <div className="h-2/3 rounded-3xl flex flex-col items-center justify-center">
                <h1 className="text-2xl m-4">Calendar</h1>
                <div className="flex-grow">
                  <Calendar
                    aria-label="Date (No Selection)"
                    className="w-full"
                  />
                </div>
              </div>
          </div>
        </div>
      )}

      <div className={`fixed bottom-0 right-0 z-50 p-3 bg-gray-800 rounded-xl ${startHidden}`}>
        <Chat target={sendTo} na={sendToName}/>
      </div>
    </>
  );
}
