import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {

  const supabase = createClient();
  const formData = await request.formData();
  
  const filter = Array.from(formData.keys());

  if (filter.length === 0) {
    const list = await supabase.from("users").select().eq('user_type', 'creative');
    return Response.json(list);

  }
  const list = await supabase.from("users").select().eq('user_type', 'creative').overlaps('sub_types', filter);



  return Response.json(list);

}
