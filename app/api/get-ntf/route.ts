
import { createClient } from '@/utils/supabase/server';
import { useEffect } from 'react';

export async function GET(request: Request) {
  const supabase = createClient();


  const { data: { user }} = await supabase.auth.getUser();
  const { data: connections } = await supabase.from('connections').select('cons').eq('email', user.email);
  const { data: users } = await supabase.from('users').select().in('email', connections[0]['cons']);

  return Response.json(users);
}
