'use server';
import { createClient } from '@/utils/supabase/server';

export default async function UserList() {
  
  const supabase = createClient();

  const { data: profiles }  = await supabase.from("users").select();

  const userList = profiles?.map(pf => {
                                 return pf.profile_image == null ? 
                                  <div className="flex flex-row">
                                    <img key={pf.id} className="size-20 m-3 rounded-full" src="https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png" />
                                    <div className="flex flex-col">
                                      <p>{pf.display_name}</p>
                                      {pf.sub_types?.map(entry => <p>{entry}</p>)}
                                    </div>

                                  </div>
                                     : 
                                  <div className="flex flex-row">
                                    <img key={pf.id} className="size-20 m-3 rounded-full" src={pf.profile_image} /> 
                                    <div className="flex flex-col">
                                      <p>{pf.display_name}</p>
                                      {pf.sub_types?.map(entry => <p>{entry}</p>)}
                                    </div>
                                  </div>
  });

  return (
    <div className="overflow-y-auto h-full">
      {userList} 
    </div>

    );

}
/*
created_at: '2024-10-26T23:46:40.091827+00:00',
    user_type: 'creative',
    email: 'sleepy@gmail.com',
    display_name: 'sleepy',
    sub_types: [ 'Music', 'Graphic design', 'Photography' ],
    city: null,
    state: null,
    profile_image: 'https://skhxtmjbcfmytgqgdayj.supabase.co/storage/v1/object/public/images/sleepy_profile.jpg'
*/
