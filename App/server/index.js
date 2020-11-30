import express from 'express';
import bodyParsser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routs/posts.js'


const app= express();



app.use(bodyParsser.json({limit: "30mb", extended: true}))
app.use(bodyParsser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use('/posts', postRoutes);


const CONNECTION_URL="mongodb+srv://Mohammed_1996:07712326526Al@cluster0.zvtx6.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(PORT, ()=>console.log(`server running ${PORT}`)))
.catch((err) => console.log(err))

mongoose.set('useFindAndModify', false);
