import express from "express"
import cookieParser from 'cookie-parser'
import path from 'path'
const app = express()
import userRoutes from "./routes/usersRoute.js"
import postRoutes from './routes/postRoute.js'


import uploadRoutes from './routes/uploadRoutes.js'
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
dotenv.config()
connectDB()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)


app.use(`/api/upload`, uploadRoutes)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`the server running at port ${port}`))