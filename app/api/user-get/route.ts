import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();

  const formData = await request.formData();
  const { data: user, error: error } = await supabase.from("users").select().eq('email', formData.get("email"));

  return Response.json(user);
}
