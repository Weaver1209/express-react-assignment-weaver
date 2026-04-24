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
app.get("/comments/:id", async (req, res) => {
    try {
        const snippetId = req.params.id;
        const snippet = await Snippet.findById(snippetId);
        res.json(snippet);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Server error" });
    }
})
app.post("/comments/:id", async (req, res) => {
    try {
        const snippetId = req.params.id;
        const { text, commenter_id } = req.body;

       
        const snippet = await Snippet.findById(snippetId);
        if (!snippet) {
            return res.status(404).json({ error: "Snippet not found" });
        }

      
        snippet.comments.push({ text: text, commenter_id: commenter_id });
        
       
        const updatedSnippet = await snippet.save();
        
       
        res.status(201).json(updatedSnippet);
    } catch (error) {
        console.error("Error saving comment:", error);
        res.status(500).json({ error: "Server error" });
    }
});
app.get("/profile/:id",async (req,res)=>{
    try{
        const userid= req.params.id;
        const mySnippets = await Snippet.find({ authorid: userid });
        const myComments = await Snippet.find({ "comments.commenter_id" : userid})
        res.json({
            mySnippets: mySnippets,
            myComments: myComments
        });
    }catch(error){
        console.error("Error fetching profile data:", error);
        res.status(500).json({ error: "Server error while loading profile" });
    }
})
app.delete("/profile/snippet/:id", async (req, res) => {
    try {
        const snippetId = req.params.id;
        const deletedSnippet = await Snippet.findByIdAndDelete(snippetId);        
        res.status(200).json({ message: "Snippet deleted successfully!" });
    } catch (error) {
        console.error("Error deleting snippet:", error);
        res.status(500).json({ error: "Server error" });
    }
});
app.delete("/profile/snippet/:snippetId/comments/:commentId", async (req, res) => {
    try {
        const { snippetId, commentId } = req.params;
        const updatedSnippet = await Snippet.findByIdAndUpdate(
            snippetId,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );
        res.status(200).json(updatedSnippet);
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Server error" });
    }
});
app.listen(30000)