const express=require("express")
const cors=require("cors")
const auth=require("./routes/authRoutes")

const app=express()
app.use(cors())
app.use(express.json())

app.use("/api/auth",auth)

module.exports=app
