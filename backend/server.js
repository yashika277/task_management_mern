require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnection = require("./database/dbConnection")
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary");
const { errorMiddleware } = require("./middlewares/error")
const userRouter = require("./routes/user.route")
const taskRouter = require("./routes/task.route")



const app = express();

//for body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// fileUpload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",

}))

//CORS
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

//for cookie
app.use(cookieParser());


// app.get("/", (req, res) => {
//     res.json({
//         message: "server start"
//     })
// })

/* ------------------------------- cloudinary ------------------------------- */
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/task", taskRouter)
app.use(errorMiddleware)

dbConnection();

app.listen(process.env.PORT, () => {
    console.log(`server listening on port: ${process.env.PORT}`);

})
