
import { createClient } from '@/utils/supabase/server';
import { useEffect } from 'react';

export async function GET(request: Request) {
  const supabase = createClient();


  const { data: { user }} = await supabase.auth.getUser();
  const { data: messaged } = await supabase.from('messages').select('target').eq('sender', user.email);
  //messaged may show repeated entries. Code below removes repeats
  const obj = messaged.map(a => JSON.stringify(a));
  const noDoubles = Array.from(new Set(obj)).map(a => JSON.parse(a));
  //This creates an array for the supabase .in() function to filter which users to return
  const arr = [];
  for (let x of noDoubles) {
    arr.push(x['target']);
  }

  const { data: users } = await supabase.from('users').select().in('email', arr);
  return Response.json(users);
}
