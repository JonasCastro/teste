const express = require('express');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const multer = require('multer');
const UploadConfig = require('./config/upload');
const upload = multer(UploadConfig);

const app =  express();
const server = http.Server(app);
const io = socketio(server);

const nameFiles = [];

io.on('connection', socket =>{
  socket.join('room01');
})

// app.use((req,res,next)=>{
//     req.io = io;
//     return next();
// })

app.use(cors());
app.use(express.json());
// app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));

app.get('/name-files', (req, res, next) => res.json(nameFiles)); 


app.post('/files',upload.single('thumbnail'), (req, res)=> {
  const { filename } = req.file;
  nameFiles.push(filename)
  io.to('room01').emit("update-files", { nameFiles });
  return res.json(nameFiles);
});

app.delete('/files/:file_name',(req, res)=> {
  const { file_name } = req.params;
  const index = nameFiles.findIndex(name => name === file_name);
  console.log(index);
  if(index !== -1) nameFiles.splice(index,1); 
  io.to('room01').emit("update-files", { nameFiles });
  return res.json(nameFiles);
});

server.listen(3333,()=>{
  console.log("server init!!");
});