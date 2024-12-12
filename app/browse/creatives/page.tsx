'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FindCreatives() {
  const [userList, setUserList] = useState(<></>);
  const [userPreview, setUserPreview] = useState(<></>);
  const [listLoading, setListLoading] = useState(true);

  //renders on first pass list of all users
  useEffect(() => {
    setListLoading(true);
    fetch('/api/user-list', { body: new FormData(), method: 'POST'})
    .then((res) => res.json())
    .then((data) => { setUserList(UserList(data, setUserPreview)) })

    setUserPreview(UserProfile(undefined));
    setListLoading(false);
  }, []);

  //makes a fetch request with the filters applied
  function getUsers(formData: FormData) {
    setListLoading(true);
    fetch('/api/user-list', { body: formData, method: 'POST'} )
    .then((res) => res.json())
    .then((data) => { 
      setUserList(UserList(data, setUserPreview));
      setListLoading(false);
     })
    
  }

  

  return (
    <div className="flex flex-row max-w-screen-2xl w-5/6 h-full bg-gray-900 rounded-xl p-2">
      <div id="selector" className="flex flex-col bg-gray-700 rounded-xl basis-3/5">
        <form action={getUsers} className="flex justify-between items-center bg-gray-600 rounded-xl min-h-16 p-1">
          <div className="grid grid-cols-3 gap-1 place-items-end">


            <div className="flex items-center">
              <span className="mr-2">Music</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Music" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Video</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Video" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Graphic Design</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Graphic Design" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Fashion</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Fashion" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Animation</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Animation" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Photography</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Photography" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
          </div>
          <button type="submit" className="basis-2/12 rounded-full size-10 bg-purple-700 p-2 mr-2">
            Reload
          </button>
        </form>
        {listLoading ? (
        <div className="flex basis-full justify-center items-center">Loading...</div>
          ) : (
            <div className="overflow-y-auto">
              {userList}
            </div>
        )}
        </div>
      
      <div className="flex bg-gray-700 rounded-xl ml-2 max-w-screen-md basis-2/5 justify-center items-center">
          {userPreview}
      </div>
    </div>
  );
}

function UserList(users: any, setUserPreview: any) {

  function getOne(e: any) {
    setUserPreview("Loading...");
    let formData = new FormData();
    formData.append("email", e.currentTarget.id);
    fetch('/api/user-get', { body:formData , method: 'POST'} )
    .then((res) => res.json())
    .then((data) => { 
      setUserPreview(UserProfile(data));
     })

  }
  
  const list = users.data.map((pf: any) => {
    return pf.profile_image == null ?
      <button onClick={getOne} key={pf.email} id={pf.email}className="flex flex-row">
        <img className="size-20 m-3 rounded-full" src="https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png" />
        <div className="flex flex-col m-4">
          <p className="text-2xl text-left">{pf.display_name}</p>
          <div className="flex flex-row space-x-2">
            {pf.sub_types?.map((entry: any, index: any) => (
              <span key={index} className="text-sm text-white">
                {entry}
              </span>
            ))}
          </div>
        </div>
      </button>
      :

      <button onClick={getOne} key={pf.email} id={pf.email} className="flex flex-row">
        <img className="size-20 m-3 rounded-full" src={pf.profile_image} />
        <div className="flex flex-col m-4">
          <p className="text-2xl text-left">{pf.display_name}</p>
          <div className="flex flex-row space-x-2">
            {pf.sub_types?.map((entry: any, index: any) => (
              <span key={index} className="text-sm text-white">
                {entry}
              </span>
            ))}
          </div>
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
    <Link href={`/profile?email=${user[0].email}`}>
      <div className="flex flex-col justify-content items-center">
        <h1 className="text-4xl m-4"> {user[0].display_name} </h1>
        <img className="size-40 rounded-full" src="https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png" />
        <div className="m-4"> {user[0].bio} </div>
        <div className="flex flex-wrap gap-2">
            {user[0].sub_types.map((type: string) =>
                <div key={type} className="m-4 bg-purple-500 text-white py-1 px-3 rounded-full text-sm font-medium">{type}</div>
            )}
        </div>
      </div>
    </Link> 
  )
  : (
    <Link href={`/profile?email=${user[0].email}`}>
      <div className="flex flex-col justify-content items-center">
        <h1 className="text-4xl m-4"> {user[0].display_name} </h1>
        <img className="size-40 rounded-full" src={user[0].profile_image} />
        <div className="m-4"> {user[0].bio} </div>
        <div className="flex flex-wrap gap-2">
            {user[0].sub_types.map((type: string) =>
                <div key={type} className="m-4 bg-purple-500 text-white py-1 px-3 rounded-full text-sm font-medium">{type}</div>
            )}
        </div>
      </div>
    </Link>
  );
}
