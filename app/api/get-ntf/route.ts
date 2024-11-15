
import { createClient } from '@/utils/supabase/server';
import { useEffect } from 'react';

export async function GET() {
  const supabase = createClient();

  const { data: users } = await supabase.from("users").select();

  return Response.json(users);
}
