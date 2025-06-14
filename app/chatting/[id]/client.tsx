
"use client"
import React from "react";
import { itemStore } from "@/store/itemstore";
import {io} from 'socket.io-client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatStore } from "@/store/chatStore";


interface buyer{
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
export default  function ChattingClientpage({itemID,buyers}:{itemID:string,buyers:buyer[]}){
  const{messages,message,setMessage,setMessages,setLastMessages,Hydrated}=chatStore();
  const [selectedBuyer,setSelectedBuyer]=React.useState('');
  const {userID,user}= itemStore();   //destructuring the value of loggedin user or sender's id and the sender's detail 
 
  const scrollRef=React.useRef<HTMLDivElement>(null);
  const socketRef=React.useRef<any>(null);   //we made this ref to store our socket server instance so that we can use our server instance in multiple functions as shown below
 
  React.useEffect(()=>{
    
    if(!selectedBuyer) return;  //if there is no buyer selected then we just close this function to prevent the unwanted socket connection
    const  socket=io('http://localhost:3000');    //connecting to our backend server;
    socketRef.current?.disconnect();    //and we are disconnecting the previous socket connection if the previous socket connection exists  as this effect runs only when there is change in the buyer
    socketRef.current=socket;   //here we are storing the instace of our actual socket in our socketRef using the useRef react hook.
   
    const roomid=[userID,selectedBuyer,itemID].sort().join('_');    //this roomid is in the same format when the logged in user is not an owner of the item
    
    socket.emit('join-room',{roomID:roomid});   //here we are passing the join-room event to our backend server using the owner's id,item's id and the buyer's id as the roomID.
    socket.on('last messages',(lastmsg:any)=>{     //then we just use the evnt called last messages provided by our backend here to display in our client side
        setLastMessages(lastmsg);
    });
      
    socket.on('chat messages',(newmsg:any)=>{       //then we also use the chat messages evnt from our backend to display the latest message
      setMessages(newmsg)
    })
    console.log('roomid is :',roomid);
    return ()=>{
      socket.off('chat messages');   //we must turn off the event to prevent the overload issues and duplicate messages
      socket.off('last messages');
      socket.disconnect();
    }


  },[selectedBuyer]);   //we run this use effect only when there is new selected buyer so that there is new socket connection for each buyers
  

  React.useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})


  },[messages])

  const  handleSend=()=>{
    if (message.trim()===""|| !socketRef.current) return;  //here we are using trim to exclude any whitespaces or empty spaces at the beginning and at the end of a string or character and even after this if the message is empty then we return the function
    
    else{
      const msg={
        sender:{
          _id:userID,
          email:user?.email,
            contact:user?.contact,
            role:'seller'

        },
        content:message,   ///here we storing the types text as our content.
      }
      const roomid=[userID,selectedBuyer,itemID].sort().join('_');
      socketRef.current.emit('chat messages',{msg,roomID:roomid});  // then we pass an event called chat messsages to our backend
      setMessage('');    //then after sending the text we set the message to null 
    }
  }




return (
  <div className="max-w-2xl mx-auto mt-8 px-4">
   
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Select a person to see the inbox:</label>
      <select
        onChange={(e) => setSelectedBuyer(e.target.value)}
        value={selectedBuyer}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option disabled value="">
          -- Select a buyer --
        </option>
        {buyers.map((buyer) => (
          <option key={buyer._id} value={buyer._id}>     {/**we are setting the buyer's id as the value cause we need the buyer id ,itemid and the owner id,which in in this case is the loggedin user to create the roomid */}
            {buyer.email} ({buyer.contact})
          </option>
        ))}
      </select>
    </div>

    
    {selectedBuyer && (     /** then when there is a buyer selected for chat then we display the older messages and make the real time chat system ready for the user or owner of item*/
      <div className="flex flex-col h-[500px] p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Messages */}
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

        {/* Input */}
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
    )}
  </div>
);


}