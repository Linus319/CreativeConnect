'use client';

import { deleteItem } from '@/lib/actions';
import { useState, useEffect } from 'react';

interface MessageProps {
  currentUser: boolean;
  message: string;
}

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
  const [images, setImages] = useState([]);


  useEffect(() => {
    fetch('/api/get-imgs', { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      setImages(data);
      setLoading(false);
    });

  }, []);



	const imageList = images?.map(img => 
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
            {imageList}
          </div>
  );
}

export function Notifications({ selectChat }) {

  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState([]);

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
                                        <div className="flex-auto" key={k} onClick={selectChat} email={user.email}>
                                          <img src={image} className="rounded-full max-w-10"/>
                                          <div className="flex justify-center" > {user.display_name} </div>
                                        </div>
                                        :  
                                        <div className="flex-auto" key={k} onClick={selectChat} email={user.email}>
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

export function Connections() {

  const [loading, setLoading] = useState(true);
  const [cons, setCons] = useState();

  useEffect(() => {
    fetch('api/get-cons', { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      setCons(data);
      setLoading(false);
    });
  }, []);

  const image = "https://www.seekpng.com/png/detail/365-3651600_default-portrait-image-generic-profile.png"

  const usersList = cons?.map((user, k) => {
  
                                return user.profile_image == null ? 
                                        <div className="flex-auto" key={k} email={user.email}>
                                          <img src={image} className="rounded-full max-w-10"/>
                                          <div className="flex justify-center" > {user.display_name} </div>
                                        </div>
                                        :  
                                        <div className="flex-auto" key={k} email={user.email}>
                                          <img src={user.profile_image} className="rounded-full max-w-10"/>
                                          <div className="flex justify-center" > {user.display_name} </div>
                                        </div>
  });


  return (loading 
          ? 
          <div>Loading...</div> 
          : 
          <div className="grid grid-cols-4 m-5 gap-4">
            {usersList}
          </div>
  );
}

export function Chat({ target }: {target: string}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vis, setVis] = useState("visible");


  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append("target", target);
    fetch('/api/get-msg', { body: formData, method: 'POST'})
    .then((res) => res.json())
    .then((data) => { 
      setMessages(data);
      setLoading(false)
    })
  }, [target])

  function sendMsg(formData: FormData) {
    formData.append('target', target);
    fetch('/api/send-msg', { body: formData, method: 'POST'})
    .then((res) => { 
      console.log(res.status);
    })
  }

  function toggleVisible() {
    if (vis === 'visible') {
      setVis("hidden");
    } else {
      setVis("visible");
    }
  }

  return ( 
    <div>
    <button onClick={toggleVisible} className="bg-green-900 rounded-full size-10">
    💬
    </button>
      {target}
    <div className={`flex flex-col justify-between size-96 bg-gray-700 ${vis}`}>

      {loading ? 
        <div className="self-center">Loading...</div>
       : 
      <div className="overflow-y-auto ">
       {messages.map(msg => {
          return msg.sender === 'abel@abel.com' ? 
            <SingleMessage currentUser={true} message={msg.message} key={msg.id}/>
           : 
            <SingleMessage currentUser={false} message={msg.message} key={msg.id}/>
          
        })}
      </div>
      }
      
      <form action={sendMsg} className="self-center">
        <input name="msg" type="text" className="rounded-md px-2"/>
        <button type="submit" className="px-1 m-1 bg-green-700 rounded-full">Send</button>
      </form>
    </div>

    </div>
  );

}

const SingleMessage = ( {currentUser, message}: MessageProps) => {
  return (
    <div className={`flex flex-row m-3 ${currentUser && 'justify-end'}`}>
      <div className="rounded-full bg-blue-700 p-2 max-w-80">{message}</div>
    </div>
  );
}
