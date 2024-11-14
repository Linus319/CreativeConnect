'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function uploadProfileImage(formData: FormData) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  const file: File | any = formData.get('file');
  const title = user?.data?.user?.email?.split("@")[0] + Date.now();

  await supabase.storage.from('images').upload(title, file);
  const { data: url } = await supabase.storage.from('images').getPublicUrl(title);
  await supabase.from('users').update({profile_image: url.publicUrl}).eq('email', user.data.user.email);
}

export async function uploadImage(formData: FormData) {


  const supabase = createClient();

  const user = await supabase.auth.getUser();

  const file: File | any = formData.get('file');
  const title = user?.data?.user?.email?.split("@")[0] + Date.now();

  const { data: dataStorage, error: errorStorage } =  await supabase.storage.from('images').upload(title, file);
  const { data: url } = await supabase.storage.from('images').getPublicUrl(title);
  const { data: dataTable, error: errorTable } = await supabase.from('images').insert({  email: user.data.user.email,
                                                                            url: url.publicUrl,
                                                                            is_song_artwork: 'false',
                                                                            caption: formData.get('caption')
  });
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteItem(id: string) {

  const supabase = createClient();
  
  const { data: getInfo } = await supabase.from('images').select().eq('id', id);
  const array = getInfo[0].url.split('/');
  const title = array[array.length - 1];

  const { data: error } = await supabase.from('images').delete().eq('id', id);
  const { data: errorStorage } = await supabase.storage.from('images').remove(title);

  revalidatePath('/dashboard');
}

export async function selectUsers(formData: FormData) {

  const supabase = createClient();
  const filter = Array.from(formData.keys());
  const { data: userList} = await supabase.from("users").select().overlaps('sub_types',filter);

  console.log(filter);
  console.log(userList);
}
