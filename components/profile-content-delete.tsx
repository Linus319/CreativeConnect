import AudioPlayer from './audio-player';
import ProfileContentImage from './profile-content-image';
import VideoPlayer from './video-player';
import { deleteItems } from '../lib/actions';

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

const ProfileContentDelete = ({
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
  

  function toggleDelete(id: number) {
    const element = document.getElementById(id.toString());
    element.classList.toggle("hidden");
    element.classList.toggle("delete-me");
  }

  function deleteSelected() {
    const deleteThese = document.getElementsByClassName("delete-me");
    let formData = new FormData;
    for (let x of deleteThese) {
      if (x.classList.contains('video')) {
        //append to videoList[]
        formData.append('videoList[]', x.id);
      } else if (x.classList.contains('image')) {
        //append to imageList[]
        formData.append('imageList[]', x.id);
      } else if (x.classList.contains('music')) {
        //append to musicList[]
        formData.append('musicList[]', x.id);
      }
    }
    deleteItems(formData);
  }

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
                    <div key={track.id} onClick={() => toggleDelete(track.id)} className="col-span-1 row-span-1 flex justify-center items-center bg-gray-800 rounded-lg relative">
                        <div id={track.id.toString()} className="music size-6 bg-green-700 hidden absolute -left-3 -top-3 z-10 rounded-full"></div>
                        <AudioPlayer 
                            imageUrl={track.image_url}
                            caption={track.caption}
                            title={track.title}
                            src={track.url}
                        />
                    </div>
                ) : <div></div>}

                {imagesEnabled ? images.map((image) => 
                    <div key={image.id} onClick={() => toggleDelete(image.id)} className="relative">
                        <div id={image.id.toString()} className="image size-6 bg-green-700 hidden absolute -left-3 -top-3 z-10 rounded-full"></div>
                        <ProfileContentImage src={image.url} caption={image.caption} />
                    </div>
                ) : <div></div>}

                {videosEnabled ? videos.map((video) => 
                    <div key={video.id} onClick={() => toggleDelete(video.id)} className="relative">
                      <div id={video.id.toString()} className="video size-6 bg-green-700 hidden absolute -left-3 -top-3 z-10 rounded-full"></div>
                      <VideoPlayer title={video.title} caption={video.caption} src={video.url} /> 
                    </div>
                )  : <div></div>
                }
            </div>
            <form action={deleteSelected} >
              <button className="fixed bottom-10 right-10 bg-blue-700 rounded-full p-3"> DELETE ALL SELECTED </button>
            </form>
        </div>
    );
};

export default ProfileContentDelete;
