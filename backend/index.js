const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const mongodb = require("mongodb")
const authRoutes = require("./Routes/AuthRoutes");
const app = express();
const cookieParser = require("cookie-parser")


app.listen(3500,() => {
    console.log("Server has started on Port 3500 Successfully")
});

mongoose.connect("mongodb+srv://hci-access:Mongo1234@hci-project.vrvfgjv.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connection to DB Successful");
})
.catch((err) => {
    console.log(err.message)
})

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use("/Profile", authRoutes);