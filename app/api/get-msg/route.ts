import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient();
  const formData = await request.formData();
  const sender = formData.get("sender");
  const target = formData.get("target");

  const { data: listSender } = await supabase.from('messages').select().eq('sender', sender).eq('target', target);
  const { data: listTarget } = await supabase.from('messages').select().eq('sender', target).eq('target', sender);
  const fullList = listSender.concat(listTarget);
  console.log(fullList);
  return Response.json(fullList);
}

