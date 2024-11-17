import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    const supabase = createClient();
    
    const formData = await request.formData();
    const email = formData.get("email");

    const { data: audio } = await supabase.from("audio").select().eq('email', email);

    const audioWithImages = await Promise.all(audio.map(async (track) => {
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

    return Response.json(audioWithImages);
}