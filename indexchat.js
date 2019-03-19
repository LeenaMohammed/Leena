const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;
server.listen(port, ()=>{
    console.log('Server is listening on Port: ${port}');
});    
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/indexchat.html'); 
    });  

app.get('/javascript', (req, res)=>{
    res.sendFile(__dirname + '/public//javascript.html'); 
    });  
app.get('/swiftt', (req, res)=>{
    res.sendFile(__dirname + '/public/swiftt.html'); 
    });  
app.get('/python', (req, res)=>{
     res.sendFile(__dirname + '/public/python.html'); 
    });  
    const tech = io.of('/tech');
    tech.on('connection', (socket)=>{

         socket.on('join', (data )=>{
          tech.in(data.room).emit('message', `New User Joined ${data.room} root!`);
    })

    socket.on('message', (data)=>{
        tech.in(data.room).emit('message', data.msg);
    })
    
    io.on('disconnect', ()=>{
    console.log('User Disconnected');
    tech.emit('message', 'User Disconnected');
    })
    });
