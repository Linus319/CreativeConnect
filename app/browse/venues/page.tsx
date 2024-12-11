'use client';

import { useState, useEffect } from 'react';
import { selectUsers } from '@/lib/actions';

export default function FindCreatives() {
  const [userList, setUserList] = useState(<></>);
  const [userPreview, setUserPreview] = useState(<></>);
  const [listLoading, setListLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  //renders on first pass list of all users
  useEffect(() => {
    setListLoading(true);
    setUserLoading(true);
    fetch('/api/venue-list', { body: new FormData(), method: 'POST'})
    .then((res) => res.json())
    .then((data) => { setUserList(UserList(data, setUserPreview)) })

    setUserPreview(UserProfile(undefined));
    setListLoading(false);
    setUserLoading(false);
  }, []);

  //makes a fetch request with the filters applied
  function getUsers(formData: FormData) {
    setListLoading(true);
    fetch('/api/venue-list', { body: formData, method: 'POST'} )
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
              <span className="mr-2">Event Space</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Event space" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Art Gallery</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Art gallery" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Performance</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Performance venue" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Recording</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Recording studio" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Photography</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Photography studio" className="peer sr-only" defaultChecked/>
                  <span className="block absolute w-6 h-6 bg-gray-300 rounded-full peer-checked:bg-purple-400 peer-checked:translate-x-6 transition-transform duration-300"></span>
                  <span className="block w-12 h-6 bg-gray-200 rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Rehersal</span>
              <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" name="Rehearsal space" className="peer sr-only" defaultChecked/>
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
