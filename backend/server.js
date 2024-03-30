const express = require("express")
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')


const socketServer = require('./SocketServer');

const auth = require('./routes/auth');
const msg = require('./routes/messages');
const invitation = require("./routes/friendInv");

require("dotenv").config();
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use((req,res,next) => {
    console.log(req.path , req.method);
    next();
})

app.use('/api/auth' , auth);
app.use('/api/testing', msg);
app.use('/api/friend', invitation); 

const server = http.createServer(app);
socketServer.registerSocketServer(server)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(process.env.PORT || 5000 , () => {
            console.log("listening to the port")
        })
    })
    .catch((err) => {
        console.log(err);

    }) 