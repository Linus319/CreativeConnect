import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient();
  const formData = await request.formData();
  const sender = (await supabase.auth.getUser()).data.user.email;
  const target = formData.get("target");

  //get messages that were sent to each other
  const { data: listSender } = await supabase.from('messages').select().eq('sender', sender).eq('target', target);
  const { data: listTarget } = await supabase.from('messages').select().eq('sender', target).eq('target', sender);
  const fullList = listSender.concat(listTarget);
  
  //sort array so chat is in order
  //id is incremental, so it can be used instead of timestamp
  fullList.sort(function(a, b) {
    return a.id - b.id;
  });
  return Response.json(fullList);
}

