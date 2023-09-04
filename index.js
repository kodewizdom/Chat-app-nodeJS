const express = require('express');
const http = require('http');
const socketio = require("socket.io");

const connect = require('./config/database-config');
const Chat = require('./models/chat')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    socket.on('join_room', (data)=>{
        socket.join(data.roomid);
    });

    socket.on('msg_send', async (data) =>{
        console.log(data);
        const chat = await Chat.create({
            user: data.username,
            roomId: data.roomid,
            content: data.msg
        });
        io.to(data.roomid).emit('msg_rcvd',data);
    });

    
});
app.set('view engine','ejs');
app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomid',async (req,res)=>{
    const chats = await Chat.find({
        roomId : req.params.roomid  
    }).select('content user');
    
    console.log(chats);
    res.render('index',{
        name:'sajid',
        id: req.params.roomid,
        chats: chats
    });
});

server.listen(3000, async () => {
    console.log('Server Started');
    await connect();
    console.log('mongo db connected');
});