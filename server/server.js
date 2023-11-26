// its good practice that everything related to server in main file 
// and everything related to express in another file
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');
const dotenv = require('dotenv');
// const socketIO = require('socket.io');

const socket = require('./utilities/sockets/socketio');
const cors = require('cors');

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace('<DATABASE_PASSWORD>',process.env.DATABASE_PASSWORD);
// testttttt
mongoose
    .connect(DB)
    //.connect('mongodb+srv://magdy_hussien:Mm123456@cluster0.vftrsrv.mongodb.net/')
    .then(con =>{
        console.log('DB connection sucessfull!');
    }).catch(err =>{
        console.log(err);
    })

//gridFS
const conn = mongoose.createConnection(DB);
let gfs;
conn.once('open',()=>{
    gfs = new mongoose.mongo.GridFSBucket(conn.db,{bucketName:'uploads'});
})
//storage engine
const storage = new GridFsStorage({
    url: DB,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
            try{
                const fileInfo = {
                    filename: file.originalname, 
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            }catch(err){
                reject(err);
            }
        });
    }
});
  
exports.upload = multer({storage});

//4) start server
const app = require('./app');
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Allow only the React app to access
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust the methods as per your needs
    allowedHeaders: ['Content-Type', 'Authorization'], // Adjust headers as per your needs
}));
const port = process.env.PORT || 3000;
//const server = require('http').createServer(app);
//const io = socketIO(server);
//const io = socket.init(server);
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})
// Socket.io connection
// io.on('connection', (socket) => {
//     console.log('hahahaha +   a user connected');
//     socket.emit("me" , socket.id); 

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });

//     socket.on('callUser' , (data)=>{
//         io.to(data.userToCall).emit("callUser", {
//             signal : data.signalData,
//             from : data.from,
//             name: data.name
//         })
//     })
//     socket.on("answerCall",(data)=> io.to(data.to).emit("callAccepted"),data.signal);
// });
io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

    socket.on("endCall", () => {
        socket.broadcast.emit("callEnded");
    });
})

server.listen(port,()=>{
    console.log(`app is running on ${port}....`);
})
