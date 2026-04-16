import express from "express"
import {Snippet} from "./models/snips.model.js";
import cors from "cors"
import mongoose from "mongoose";
import 'dotenv/config'
const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.db_url)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("DB Error:", err));
app.get("/",async(req,res) =>{
    let allSnippets = await Snippet.find() 
    res.json(allSnippets)
})

app.post("/",async (req,res)=>{
    try {
        const{code,authorid}= req.body
        const newsnip= new Snippet({
            authorid,code
        })
        const savedsnip = await newsnip.save()
        res.status(201).json(savedsnip);

    }catch (error) {
    console.error("Error saving snippet:", error);
    res.status(500).json({ error: 'Server error' });
  }
})
app.get("/comment/{:id}",async(req,res)=>{
    let comments = await Comment.find({authorid: id})
    res.json(comments)
})

app.listen(30000)