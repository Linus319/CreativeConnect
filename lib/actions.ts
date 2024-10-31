'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createItem(formData: FormData) {

  const newItem = {
    email:    formData.get("email"),
    url:      formData.get("url"),
    caption:  formData.get("caption")
  };

  const supabase = createClient();
  const { data: error } = await supabase.from("images").insert({   email: newItem.email,
                                                                  url: newItem.url,
                                                                  is_song_artwork: "true",
                                                                  caption: newItem.caption
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteItem(id: string) {

  const supabase = createClient();
  const { data: error } = await supabase.from("images").delete().eq('id', id);

  revalidatePath('/dashboard');
}

export async function selectUsers(formData: FormData) {

  const supabase = createClient();

//const { data: userList, error: error } = await supabase.from("users").select().contains('temp_sub_types',["Music"]);
  const filter = Array.from(formData.keys());
  const { data: userList} = await supabase.from("users").select().overlaps('sub_types',filter);

  console.log(filter);
  console.log(userList);
}
