import { createClient } from '@/utils/supabase/server';

interface AudioTrack {
    id: number;
    email: string;
    title: string;
    song_image_id: number;
}

interface Image {
    id: number;
    email: string;
    url: string;
    is_song_artwork: boolean;
}

interface Video {
    src: string;
    email: string;
    title: string;
    id: number;
}

interface AudioWithImage extends AudioTrack {
    image_url: string;
}

export async function POST(request: Request) {
    const supabase = createClient();
    
    const formData = await request.formData();
    const email = formData.get("email");

    // get audio data from audio table for this user and add album art from images table
    const { data: audio }: { data: AudioTrack[] } = await supabase.from("audio").select().eq('email', email);
    const audioWithImages: AudioWithImage[] = await Promise.all(audio.map(async (track) => {
        if (track.song_image_id) {
            const { data: imageData } = await supabase.from("images").select('url').eq('id', track.song_image_id).single();
            if (imageData) {
                return { ...track, image_url: imageData.url };
            }
            else {
                return { ...track, image_url: "/images/default-audio-image.png"};
            }
        }
        else {
            return { ...track, image_url: "/images/default-audio-image.png"};
        }
    }));

    const { data: images }: { data: Image[] } = await supabase.from("images").select().eq('email', email).neq('is_song_artwork', true);

    const { data: videos }: { data: Video[] } = await supabase.from("video").select().eq('email', email);

    return Response.json({ audio: audioWithImages, images: images, videos: videos });
}