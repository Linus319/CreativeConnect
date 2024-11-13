import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {

  const supabase = createClient();
  const formData = await request.formData();
  
  const filter = Array.from(formData.keys());

  if (filter.length === 0) {
    const list = await supabase.from("users").select();
    return Response.json(list);

  }
  const list = await supabase.from("users").select().overlaps('sub_types', filter);



  return Response.json(list);

}
