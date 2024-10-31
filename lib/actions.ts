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
  const selectArray: string[] = ["Music"];

//const { data: userList, error: error } = await supabase.from("users").select().filter('sub_types', 'cs', '["Music"]');
  const { data: userList, error: error } = await supabase.from("users").select().overlaps('sub_types', ["Music"]);
  console.log(userList);
  console.log(error);
}
