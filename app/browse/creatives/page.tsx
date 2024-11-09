'use client';

import { useState, useEffect } from 'react';
import { selectUsers } from '@/lib/actions';

export default function FindCreatives() {
  const [userList, setUserList] = useState(<></>);
  const [userPreview, setUserPreview] = useState(<></>);

  //renders on first pass list of all users
  useEffect(() => {
    fetch('/api/user-list', { body: new FormData(), method: 'POST'})
    .then((res) => res.json())
    .then((data) => { setUserList(UserList(data, setUserPreview)) })

    setUserPreview(UserProfile(undefined));
  }, []);

  //makes a fetch request with the filters applied
  function getUsers(formData: FormData) {
    fetch('/api/user-list', { body: formData, method: 'POST'} )
    .then((res) => res.json())
    .then((data) => { setUserList(UserList(data, setUserPreview)) })
  }

  return (
    <div className="flex flex-row max-w-screen-2xl w-5/6 h-4/5">
      <div id="selector" className="flex flex-col bg-blue-900 max-w-screen-md basis-1/2">
        <form action={getUsers} className="flex flex-row h-10 justify-around bg-green-500 w-">
          <label>Select Creative Type</label>
          <div>
            <input id="Music" name="Music" type="checkbox" defaultChecked/>
            <label htmlFor="Music">Music</label>
          </div>
          <div>
            <input id="Video" name="Video" type="checkbox" defaultChecked/>
            <label htmlFor="Video">Video</label>
          </div>
          <div>
            <input id="Graphics Design" name="Graphic design" type="checkbox" defaultChecked/>
            <label htmlFor="Graphics Design">Graphics Design</label>
          </div>
          <div>
            <input id="Photography" name="Photography" type="checkbox" defaultChecked/>
            <label htmlFor="Photography">Photography</label>
          </div>
          <button type="submit" className="rounded-full bg-green-700 p-2">
            Reload
          </button>
        </form>
        <div className="overflow-y-auto">
        {userList}
        </div>
      </div>

      <div className="flex bg-red-900 max-w-screen-md basis-1/2 justify-center items-center">
        {userPreview}
      </div>
    </div>
  );
}

function UserList(users: any, setUserPreview: any) {

  function getOne(e: any) {

    let formData = new FormData();
    formData.append("email", e.currentTarget.id);
    fetch('/api/user-get', { body:formData , method: 'POST'} )
    .then((res) => res.json())
    .then((data) => { setUserPreview(UserProfile(data)) })

  }
  
  const list = users.data.map((pf: any) => {
                              return pf.profile_image == null ?
                                <button onClick={getOne} key={pf.email} id={pf.email}className="flex flex-row">
                                  <img className="size-20 m-3 rounded-full" src="https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png" />
                                  <div className="flex flex-col">
                                    <p>{pf.display_name}</p>
                                    {pf.sub_types?.map((entry: any, index: any) => <p key={index}>{entry}</p>)}
                                  </div>
                                </button>
                                :

                                <button onClick={getOne} key={pf.email} id={pf.email} className="flex flex-row">
                                  <img className="size-20 m-3 rounded-full" src={pf.profile_image} />
                                  <div className="flex flex-col">
                                    <p>{pf.display_name}</p>
                                    {pf.sub_types?.map((entry: any, index: any) => <p key={index}>{entry}</p>)}
                                  </div>
                                </button>

  });

  return (
    <div>{list}</div>
  )
  
}

function UserProfile(user: any) {

  if (user === undefined) return <div>No user selected</div>;

  return user[0].profile_image == null ? ( 
    <div className="flex flex-col">
      <h1> {user[0].display_name} </h1>
      <img className="size-40 rounded-full" src="https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png" />
      <div> {user[0].bio} </div>
      <div> {user[0].sub_types} </div>
    </div>
  )
  : (
    <div className="flex flex-col">
      <h1> {user[0].display_name} </h1>
      <img className="size-40 rounded-full" src={user[0].profile_image} />
      <div> {user[0].bio} </div>
      <div> {user[0].sub_types} </div>
    </div>
  );
}
