import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient();
  const formData = await request.formData();

  const sen = (await supabase.auth.getUser()).data.user.email;
  const tar = await formData.get('target');
  const msg = await formData.get('msg');

  const { data: result } = await supabase.from('messages').insert({ sender: sen, target: tar, message: msg }).select();

  return Response.json(result);
}

