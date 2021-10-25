import express from 'express';
import bodyParsser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routs/posts.js'
import userRoutes from './routs/users.js'


const app= express();
dotenv.config()



app.use(bodyParsser.json({limit: "30mb", extended: true}))
app.use(bodyParsser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes)


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(PORT, ()=>console.log(`server running ${PORT}`)))
.catch((err) => console.log(err))

mongoose.set('useFindAndModify', false);
