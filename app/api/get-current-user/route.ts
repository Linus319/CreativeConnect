import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase.from("users").select('*').eq('email', user.email);

    return Response.json(data[0]);
}