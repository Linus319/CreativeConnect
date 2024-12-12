import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: profile_pic } = await supabase.from("users").select('profile_image').eq('email', user.email);
    
    return Response.json(profile_pic[0].profile_image);
}