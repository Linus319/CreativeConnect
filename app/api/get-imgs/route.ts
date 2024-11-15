import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: images } = await supabase.from("images").select().eq('email', user.email);


  return Response.json(images);
}
