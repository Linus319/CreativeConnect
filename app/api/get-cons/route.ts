import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createClient();

  const { data: { user }} = await supabase.auth.getUser();

  const { data: cons } = await supabase.from('connections').select('cons').eq('email', user.email);
  
  if (cons === undefined || cons.length == 0) {
    return Response.json([]);
  } else {
    let { data: consList } = await supabase.from('users').select().in('email', cons[0]['cons']);
    return Response.json(consList);
  }
}
