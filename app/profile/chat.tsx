'use client';

import { Supabase } from '@/lib/supa';
import { upsertConnection } from '@/lib/actions';
import { useState, useEffect, useRef } from 'react';

interface MessageProps {
  currentUser: boolean;
  message: string;
}

const supabase = Supabase();

export function Chat({ target }: {target: string}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vis, setVis] = useState("visible");
  const [currentUser, setCurrentUser] = useState('none');
  const messageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLFormElement>(null);
  const channelName = target.localeCompare(currentUser) ? target.split('@')[0] + currentUser.split('@')[0] : currentUser.split('@')[0] + target.split('@')[0];

  const myChannel = supabase.channel(channelName, {
    config: {
      broadcast: { self: true },
    },
  })
  
  myChannel.subscribe((status) => {
    if (status !== 'SUBSCRIBED') { return }
    
  })

  myChannel.on(
    'broadcast',
    { event: 'test-my-messages' },
    (payload) => {
      const newPush = messages;
      newPush.push(payload['payload'][0]);
      setMessages([...newPush]);
    }
  )

  function scrollBottom() {
    messageRef.current?.scrollIntoView()
  }

  useEffect(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append("target", target);
    fetch('/api/get-current-user', { method: 'POST' } )
    .then((res) => res.json())
    .then((data) => {
      setCurrentUser(data.email);
    })
    fetch('/api/get-msg', { body: formData, method: 'POST'})
    .then((res) => res.json())
    .then((data) => { 
      setMessages(data);
      setLoading(false)
    })
  }, [target])

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  function sendMsg(formData: FormData) {
    formData.append('target', target);
    upsertConnection(formData);
    fetch('/api/send-msg', { body: formData, method: 'POST'})
    .then((res) => res.json())
    .then((data) => { 
      console.log("sending message to channel: ", myChannel['topic']);
      myChannel.send({
        type: 'broadcast',
        event: 'test-my-messages',
        payload : data
      })
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
      <div className="overflow-y-auto" id="content">
       {messages.map(msg => {
          return msg.sender === currentUser ? 
            <SingleMessage currentUser={true} message={msg.message} key={msg.id}/>
           : 
            <SingleMessage currentUser={false} message={msg.message} key={msg.id}/>
          
        })}
        <div ref={messageRef} />
      </div>
      }
      
      <form 
        ref={inputRef} 
        action={ async (formData) => { 
          await sendMsg(formData) 
          inputRef.current?.reset() 
        }}  
          className="self-center">
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
