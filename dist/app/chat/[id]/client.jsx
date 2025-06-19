"use strict";
///not the owner page
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatClientpage;
const react_1 = __importDefault(require("react"));
const itemstore_1 = require("@/store/itemstore");
const socket_io_client_1 = require("socket.io-client");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const chatStore_1 = require("@/store/chatStore");
function ChatClientpage({ ownerID, itemID, }) {
    const Hydrated = (0, chatStore_1.chatStore)(state => state.Hydrated);
    const { messages, message, setMessage, setLastMessages, setMessages, } = (0, chatStore_1.chatStore)();
    const { userID, user } = (0, itemstore_1.itemStore)(); //destructuring the value of loggedin user or sender's id and the sender's detail
    const scrollRef = react_1.default.useRef(null); //this ref is for creating the scrolling div.
    const socketRef = react_1.default.useRef(null); //we made this ref to store our socket server instance so that we can use our server instance in multiple functions as shown below
    react_1.default.useEffect(() => {
        var _a;
        if (!Hydrated)
            return;
        if (!userID)
            return;
        const roomid = [userID, ownerID, itemID].sort().join("_"); //we are making the roomid using the logged in user id , owner id and the item id and all of these are in string
        const socket = (0, socket_io_client_1.io)('https://sharity-production.up.railway.ap', {
            withCredentials: true,
            //faster socket connection.
        }); //connecting to our backend server;
        (_a = socketRef.current) === null || _a === void 0 ? void 0 : _a.disconnect(); //we are disconnecting the older socket connection to prevent the duplicate messages and duplicate connection
        socketRef.current = socket; //here we are storing the instace of our actual socket in our socketRef using the useRef react hook.
        socket.emit("join-room", { roomID: roomid }); //here we are passing the join-room event to our backend server.
        socket.on("last messages", (lastmsg) => {
            //then we just use the evnt called last messages provided by our backend here to display in our client side
            setLastMessages(lastmsg);
        });
        socket.on("chat messages", (newmsg) => {
            //then we also use the chat messages evnt from our backend to display the latest message but this time we are extending our state because this new msg is the latest one not the old one.
            setMessages(newmsg);
        });
        return () => {
            socket.off("chat messages"); //we must turn off the events to prevent the overload issues and duplicate messages
            socket.off("last messages");
            socket.disconnect(); //we are also disconnecting the socket
        };
    }, [setLastMessages, setMessages, userID, itemID, ownerID, Hydrated]);
    react_1.default.useEffect(() => {
        var _a;
        (_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" }); //if the value of current exists in the scrollRef then we assign the scrollIntoView property.
    }, [messages]); //we make the scrollIntoView({behaviour:'smooth'}) to run only when there is change in messages state.
    const handleSend = () => {
        if (!userID)
            return;
        const roomid = [userID, ownerID, itemID].sort().join("_"); //we are making the roomid using the logged in user id , owner id and the item id and all of these are in string
        if (message.trim() === "" || !socketRef.current)
            return; //here we are using trim to exclude any whitespaces or empty spaces at the beginning and at the end of a string or character and even after this if the message is empty then we return the function
        else {
            const msg = {
                sender: {
                    _id: userID, //we are passing the currently loggedin user's id as the logged in user can only send the message
                    email: user === null || user === void 0 ? void 0 : user.email,
                    contact: user === null || user === void 0 ? void 0 : user.contact,
                    role: "buyer",
                },
                content: message, ///here we storing the types text as our content.
            };
            socketRef.current.emit("chat messages", { msg, roomID: roomid }); // then we pass an event called chat messsages to our backend using the msg and roomID which are expected by our backend
            setMessage(""); //then after sending the text we set the message to null as soon as the send button is clicked we must set the message to  empty '' to prevent the older sent message to be seen again in the webpage
        }
    };
    return (<div className="max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-xl font-semibold mb-4">Chat with owner</h2>

      {!Hydrated ? <div>Chat Loading...</div> : <div className="flex flex-col h-[500px] p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((msg, index) => (<div key={index} className={`max-w-[70%] px-4 py-2 rounded-xl ${msg.sender._id ===
                    userID /*here we are checking if the msg is sent by the logged in user or not if not because in the case of last messages the messages can be sent by the buyers or sellers depending upon the logedin user*/
                    ? "bg-blue-600 text-white self-end ml-auto"
                    : "bg-gray-200 text-black self-start mr-auto"}`}>
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs mt-1 text-right italic">
                {msg.sender.email}
              </p>
            </div>))}
          <div ref={scrollRef}/>{" "}
          {/* and this is the div element where we use the scrollRef for the scrolling effect*/}
        </div>

        {/* Input box */}
        <div className="flex items-center gap-2 mt-auto border-t pt-4">
          <input_1.Input value={message} placeholder="Type your message..." onChange={(e) => setMessage(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none" type="text"/>
          <button_1.Button onClick={handleSend} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Send
          </button_1.Button>
        </div>
      </div>}

     
    </div>);
}
