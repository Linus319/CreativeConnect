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
  redirect(`/profile/edit?email=${user.data.user.email}`);
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

export async function deleteItems(formData: FormData) {
  const supabase = createClient();

  const videoList = formData.getAll('videoList[]');
  const imageList = formData.getAll('imageList[]');
  const musicList = formData.getAll('musicList[]');

  if (videoList !== undefined && videoList.length > 0) {
    //delete stuff
    const { data: getTableItems } = await supabase.from('video').select('url').in('id', videoList);
    let list = [];
    for (let x of getTableItems) {
      const arr = x.url.split('/');
      list.push(arr[arr.length - 1]);
    }
    const tableError = await supabase.from('video').delete().in('id', videoList);
    const bucketError = await supabase.storage.from('video').remove(list);
  }
  if  (imageList !== undefined && imageList.length > 0) {
    //delete stuff
    const { data: getTableItems } = await supabase.from('images').select('url').in('id', imageList);
    let list = [];
    for (let x of getTableItems) {
      const arr = x.url.split('/');
      list.push(arr[arr.length - 1]);
    }
    const tableError = await supabase.from('images').delete().in('id', imageList);
    const bucketError = await supabase.storage.from('images').remove(list);
  }
  if (musicList !== undefined && musicList.length > 0) {
    //delete stuff
    const { data: getTableItems } = await supabase.from('audio').select('url').in('id', musicList);
    let list = [];
    for (let x of getTableItems) {
      const arr = x.url.split('/');
      list.push(arr[arr.length - 1]);
    }
    const tableError = await supabase.from('audio').delete().in('id', musicList);
    const bucketError = await supabase.storage.from('audio').remove(list);
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function upsertConnection(formData: FormData) {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user.email;
  const target = formData.get('target');
  let { data: userData, data: userError } = await supabase.from('connections').select().eq('email', user);
  let { data: targetData, data: targetError } = await supabase.from('connections').select().eq('email', target);

  if (userData.length === 0) {
    //you haven't spoken to anyone, so add entry into table 
    const newUser = await supabase.from('connections').insert({ email: user, cons: [target] });
  } else {
    //you already have a list of users, but are messaging someone new
    //here we add the target to your account
    let currentConnections = userData[0]['cons'];
    if (currentConnections.includes(target)) {
      //do nothing since target is already in list
    } else {
      currentConnections.push(target);
      const upload = await supabase.from('connections').upsert(userData);
    }
  }

  if (targetData.length === 0) {
    const newUser = await supabase.from('connections').insert({ email: target, cons: [user] });
  } else {
    let targetConnections = targetData[0]['cons'];
    if (targetConnections.includes(user)) {
      //do nothing since you are already in their list
    } else {
      targetConnections.push(user);
      const upload = await supabase.from('connections').upsert(targetData);
    }
  }
}

export async function selectUsers(formData: FormData) {

  const supabase = createClient();
  const filter = Array.from(formData.keys());
  const { data: userList} = await supabase.from("users").select().overlaps('sub_types',filter);

  console.log(filter);
  console.log(userList);
}
