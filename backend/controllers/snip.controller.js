import { Snippet } from "../models/snips.model.js";

export const getAllSnippets = async (req, res) => {
    let allSnippets = await Snippet.find();
    res.json(allSnippets);
};

export const createSnippet = async (req, res) => {
    try {
        const { code, authorid } = req.body;
        const newsnip = new Snippet({ authorid, code });
        const savedsnip = await newsnip.save();
        res.status(201).json(savedsnip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getSnippetComments = async (req, res) => {
    try {
        const snippetId = req.params.id;
        const snippet = await Snippet.findById(snippetId);
        res.json(snippet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const addComment = async (req, res) => {
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
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userid = req.params.id;
        const mySnippets = await Snippet.find({ authorid: userid });
        const myComments = await Snippet.find({ "comments.commenter_id": userid });
        
        res.json({
            mySnippets: mySnippets,
            myComments: myComments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while loading profile" });
    }
};

export const deleteSnippet = async (req, res) => {
    try {
        const snippetId = req.params.id;
        await Snippet.findByIdAndDelete(snippetId);        
        res.status(200).json({ message: "Snippet deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { snippetId, commentId } = req.params;
        const updatedSnippet = await Snippet.findByIdAndUpdate(
            snippetId,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );
        res.status(200).json(updatedSnippet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};