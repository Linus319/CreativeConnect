import AudioPlayer from './audio-player';
import ProfileContentImage from './profile-content-image';
import VideoPlayer from './video-player';

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

interface ProfileContentProps {
    audio: Audio[];
    images: Image[];
    videos: Video[];
    audioEnabled: boolean;
    imagesEnabled: boolean;
    videosEnabled: boolean;
    handleToggleAudio: () => void;
    handleToggleImages: () => void;
    handleToggleVideos: () => void;
    userType: string;
}

const ProfileContent = ({
    audio,
    images,
    videos,
    audioEnabled,
    imagesEnabled,
    videosEnabled,
    handleToggleAudio,
    handleToggleImages,
    handleToggleVideos,
    userType
}: ProfileContentProps) => {
    return (
        <div className="m-4 rounded col-start-2 col-span-3 flex flex-col">
            {userType === "creative" ? 
                <div className="py-4 px-12 flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="mr-2">Images</span>
                        <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" className="peer sr-only" defaultChecked onChange={handleToggleImages} />
                            <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                            <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
                        </label>
                    </div>

                    <div className="flex items-center">
                        <span className="mr-2">Audio</span>
                        <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" className="peer sr-only" defaultChecked onChange={handleToggleAudio}/>
                            <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                            <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
                        </label>
                    </div>

                    <div className="flex items-center">
                        <span className="mr-2">Video</span>
                        <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" className="peer sr-only" defaultChecked onClick={handleToggleVideos}/>
                            <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                            <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
                        </label>
                    </div>
                </div>
                :   
                <h1 className="text-center text-4xl">Image Gallery</h1>}

            <div className="flex-grow rounded grid grid-cols-4 grid-rows-3 gap-4 p-4">
                {audioEnabled ? audio.map((track) => 
                    <div key={track.id} className="col-span-1 row-span-1 flex justify-center items-center bg-gray-800 rounded-lg">
                        <AudioPlayer 
                            imageUrl={track.image_url}
                            title={track.title}
                            src={track.url}
                        />
                    </div>
                ) : <div></div>}

                {imagesEnabled ? images.map((image) => 
                    <div key={image.id}>
                        <ProfileContentImage src={image.url} caption={image.caption} />
                    </div>
                ) : <div></div>}

                {videosEnabled ? videos.map((video) => 
                    <VideoPlayer key={video.id} title={video.title} src={video.url} />) : <div></div>
                }
            </div>
        </div>
    );
};

export default ProfileContent;