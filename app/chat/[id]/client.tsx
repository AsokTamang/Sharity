///not the owner page
"use client"
import React from "react";
import { itemStore } from "@/store/itemstore";
import {io} from 'socket.io-client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



interface ownerType{
  _id:string;
  email:string;
  contact:number;
}

interface wholeType{
  sender:{
    _id:string;
    email:string;
    contact:number; 
  role:string; };
    content:string;
}
export default  function ChatClientpage({ownerID,itemID}:{ownerID:string,itemID:string}){
  const {userID,user}= itemStore();   //destructuring the value of loggedin user or sender's id and the sender's detail 
  const [messages,setMessages]=React.useState<wholeType[]>([]);    ///this state stores the whole message detail here 
  const [message,setMessage]=React.useState('');    //this state stores the recently sent text only
  const scrollRef=React.useRef<HTMLDivElement>(null);
  const socketRef=React.useRef<any>(null);   //we made this ref to store our socket server instance so that we can use our server instance in multiple functions as shown below
 
  React.useEffect(()=>{
     const roomid=[userID,ownerID,itemID].sort().join('_');     //we are making the roomid using the logged in user id , owner id and the item id and all of these are in string  
    const  socket=io('http://localhost:3000');    //connecting to our backend server;
    socketRef.current=socket;   //here we are storing the instace of our actual socket in our socketRef using the useRef react hook.
    socket.emit('join-room',{roomID:roomid});   //here we are passing the join-room event to our backend server using the owner's id _ item's id as the roomID.
    socket.on('last messages',(lastmsg:any)=>{     //then we just use the evnt called last messages provided by our backend here to display in our client side
        setMessages(lastmsg);
    });
      
    socket.on('chat messages',(newmsg:any)=>{       //then we also use the chat messages evnt from our backend to display the latest message
      setMessages((prev:any)=>[...prev,newmsg])
    })

    console.log('room id is:',roomid);

    return ()=>{
      socket.off('chat messages');   //we must turn off the event to prevent the overload issues and duplicate messages
      socket.off('last messages');
      socket.disconnect();
    }
    

  },[userID]);
  

  React.useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})


  },[messages])

  const  handleSend=()=>{
     const roomid=[userID,ownerID,itemID].sort().join('_');     //we are making the roomid using the logged in user id , owner id and the item id and all of these are in string  
    if (message.trim()===""|| !socketRef.current) return;  //here we are using trim to exclude any whitespaces or empty spaces at the beginning and at the end of a string or character and even after this if the message is empty then we return the function
    
    else{
      const msg={
        sender:{
          _id:userID,  //we are passing the currently loggedin user's id as the logged in user can only send the message
          email:user?.email,
            contact:user?.contact,
            role:'buyer'

        },
        content:message,   ///here we storing the types text as our content.
       
      }
      socketRef.current.emit('chat messages',{msg,roomID:roomid});  // then we pass an event called chat messsages to our backend
      setMessage('');    //then after sending the text we set the message to null 
    }
  }




 return (
  <div className="max-w-2xl mx-auto mt-8 px-4">
    <h2 className="text-xl font-semibold mb-4">Chat with owner</h2>

    <div className="flex flex-col h-[500px] p-4 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-xl ${
              msg.sender._id === userID
                ? 'bg-blue-600 text-white self-end ml-auto'
                : 'bg-gray-200 text-black self-start mr-auto'
            }`}
          >
            <p className="text-sm">{msg.content}</p>
            <p className="text-xs mt-1 text-right italic">{msg.sender.email}</p>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input box */}
      <div className="flex items-center gap-2 mt-auto border-t pt-4">
        <Input
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none"
          type="text"
        />
        <Button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </Button>
      </div>
    </div>
  </div>
);


}