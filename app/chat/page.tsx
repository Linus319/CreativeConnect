'use client';

import { useEffect, useState } from 'react';

interface MessageProps {
  currentUser: bool;
  message: text;
}

export default function Chat() {
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(true);
  const sender = "abel@abel.com";
  const target = "joshua@gmail.com";

  useEffect(() => {
    const formData = new FormData();
    formData.append("sender", sender);
    formData.append("target", target);
    fetch('/api/get-msg', { body: formData, method: 'POST'})
    .then((res) => res.json())
    .then((data) => { 
      setMessages(data);
      setLoading(false)
    })
  }, [])

  function sendMsg(formData: FormData) {
    formData.append('sender', sender);
    formData.append('target', target);
    fetch('/api/send-msg', { body: formData, method: 'POST'})
    .then((res) => { 
      console.log(res.status);
    })
  }

//  if (messages) console.log(messages);

  return ( 
    <div className="flex flex-col justify-between size-96 bg-gray-700">
      <div className="overflow-y-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        messages.map(msg => {
          return msg.sender === 'abel@abel.com' ? (
            <SingleMessage currentUser={true} message={msg.message} key={msg.id}/>
          ) : (
            <SingleMessage currentUser={false} message={msg.message} key={msg.id}/>
          );
        })
      )}
      </div>
      <form action={sendMsg} className="self-center">
        <input name="msg" type="text" className="rounded-md px-2"/>
        <button type="submit" className="px-1 m-1 bg-green-700 rounded-full">Send</button>
      </form>
    </div>
  );

}

//      { (loading) ? <div>Loading...</div> : messages.data.map(msg =>  <div>{msg.sender}</div> )}
const SingleMessage = ( {currentUser, message}: MessageProps) => {
  return (
    <div className={`flex flex-row m-3 ${currentUser && 'justify-end'}`}>
      <div className="rounded-full bg-blue-700 p-2 max-w-80">{message}</div>
    </div>
  );
}
