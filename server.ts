const { createServer } = require("http"); //we are using the createServer from http to make a custom server for our socket connection
const next = require("next");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const { messageModal } = require("./models/messagemodel"); // adjust path if necessary
const { connection } = require("./connectionconfig/connectionconfig");
const { buyerModal } = require("./models/buyerModal");
const {roomidModal}=require("./models/roomModal");

const port = "http://localhost:3000";
import type { Types } from "mongoose"; //we can import the type using import and export even if the file is in commonjs

interface messgaeDataType {
  sender: {
    _id: string;
    email: string;
    contact: string;
    role: string;
  };
  content: string;
  buyerID: string;
  ownerID: string;
}

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev }); //here we are making the app from the instance of next depending upon the type of env
const handle = app.getRequestHandler(); //here this handle function is the function of nextjs that handles the routing server functionality

app.prepare().then(() => {
  connection(); ///first of all we must connect with our mongo db
  const server = createServer(handle); //this function tells that this is our custom server and it's all methods are handled by the handle function of nextjs
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", //this is the server link in which our next js app runs

      methods: ["GET", "POST"], 
    },
  }); //this is our actual socket server;

  io.on("connection", (socket: any) => {
    console.log("user connected", socket.id); //here user is connected in our socket server using socket.id
 
    socket.on("join-room", async (data: { roomID: string }) => {  //we are passing the roomID as an object here 
      //then we let the user to join the private chat room using the roomID
      const { roomID } = data; //destructering the roomID
      socket.join(roomID); //joining with the roomID
      const lastMessages = await messageModal
        .find({ roomId: roomID })   //finding our messages based on the room Id which is saved in the messagemodel
        .sort({ timeStamp: 1 })     //sorting arranges the messages in an ascending order based on the timeStamp
        .populate("sender", "email contact"); //fetching the saved messages based on the roomID so we are using find method not findById
      //timestamp:1 arranges the lastmessages result in ascending order
      socket.emit("last messages", lastMessages); //then we emit that last or history messages
      const savedRoomId=new roomidModal({    //we are storing the roomId in our different roomid modal which will have the collection of the roomids
        roomid:roomID,

      }) 

      await savedRoomId.save()  //then we save that roomid
    });

    socket.on(
      "chat messages",
      async (data: { msg: messgaeDataType; roomID: string }) => {
        //then if there is any messages in the room then
        const { msg, roomID } = data; //desctructuring the msg and roomID passed into out socket backend from the client side
        const newMessage = new messageModal({
          sender: {
            _id: new mongoose.Types.ObjectId(msg.sender._id), //here we are converting the id of the user into mongoose object id cause the type of sender in our messagemodel is in objectid which is the reference to the User in our mongo db
          },
          content: msg.content,
          roomId: roomID,     //then we are also saving the roomID in our messagemodel
        });

        const finalMessageData = await newMessage.save();

        if (msg.sender.role === "buyer") {
          const ID = new mongoose.Types.ObjectId(msg.sender._id); //as the sender's id is in string , we are converting it into mongoose object id

          await buyerModal.updateOne(
            {
              //here this code prevents the duplicate saving of the  buyer id
              id: ID, //we are saving the buyer's _id inside our buyermdodal id.
            },
            {
              $setOnInsert: { id: ID },
            },
            { upsert: true }
          );
        } //here only if the role is buyer we are saving that buyer's id

        io.to(roomID).emit("chat messages", {
          ...msg,
          sender: {
            //then we emit that new messages in that specific roomID's chat room
            _id: newMessage.sender._id.toString(),
            email: newMessage.sender.email,
            contact: newMessage.sender.contact,
          },
          content: msg.content,
        });
      }
    );
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  server.listen(3000, () => console.log("server is running at port", port));
});
