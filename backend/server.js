require("dotenv").config()
const express = require("express")
const cors = require("cors")    
const path = require("path")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const incomeRoutes = require("./routes/incomeRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const job = require("./config/cron")

const app = express()

if(process.env.NODE_ENV === 'production') job.start()
//middleware handling 

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET","PUT","POST","DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
    })
)

app.use(express.json())

connectDB()
app.get("/api/health", (req,res) =>{
    res.status(200).json({status:"ok"})
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

//server upload folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on ${PORT}`));
