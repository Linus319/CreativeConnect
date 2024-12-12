'use client';

import { Notifications, Connections, Chat } from '@/components/dashboard';
import ProfileContentDelete from '@/components/profile-content-delete';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
            <div className="flex flex-col bg-gray-700 h-full w-full max-w-screen-2xl rounded-3xl">
              {user && (
                <ProfileContentDelete
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
