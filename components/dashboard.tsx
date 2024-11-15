'use client';

import { createClient } from '@/utils/supabase/server';
import { deleteItem } from '@/lib/actions';
import { useState, useEffect } from 'react';

function DeleteButton({ id }: { id: string}) {

  const deleteWithId = deleteItem.bind(null, id);

  return (
    <form action={deleteWithId}>
      <button type="submit" className="flex items-center justify-center absolute -right-3 -top-3 bg-gray-700 rounded-full size-8">X</button>
    </form> 
  );

}

export function Images({ deleteMode }: { deleteMode: string } ) {

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState();


  useEffect(() => {
    fetch('/api/get-imgs', { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      setImages(data);
      setLoading(false);
    });

  }, []);



	const image_list = images?.map(img => 
                                 <div key={img.id} className="flex-auto relative">
                                  <a href={img.url}>
                                    <img src={img.url} className="rounded-lg"/>
                                  </a>
                                  {deleteMode == "true" ? 
                                  <DeleteButton id={img.id}/> : null }
                                </div>);

  return (loading 
          ? 
          <div>Loading...</div> 
          : 
          <div className="grid grid-cols-4 m-5 gap-4">
            {image_list}
          </div>
  );
}

export function Notifications() {

  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState();

  useEffect(() => {
    fetch('/api/get-ntf', { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      setNotif(data);
      setLoading(false);
    });

  }, []);

  const image = "https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png"

  const usersList = notif?.map((user, k) => {
  
                                return user.profile_image == null ? 
                                        <div className="flex-auto" key={k}>
                                          <img src={image} className="rounded-full max-w-10"/>
                                          <div className="flex justify-center" > {user.display_name} </div>
                                        </div>
                                        :  
                                        <div className="flex-auto" key={k}>
                                          <img src={user.profile_image} className="rounded-full max-w-10"/>
                                          <div className="flex justify-center" > {user.display_name} </div>
                                        </div>
  }
                                      );

  return (loading
          ?
          <div>Loading...</div>
          :
          <div className="flex flex-row m-5 gap-4">
            {usersList}
          </div>
  );
}
