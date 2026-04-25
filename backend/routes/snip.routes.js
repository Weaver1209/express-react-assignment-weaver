import express from "express";
import { 
    getAllSnippets, 
    createSnippet, 
    getSnippetComments, 
    addComment, 
    getProfile, 
    deleteSnippet, 
    deleteComment 
} from "../controllers/snip.controller.js";

const router = express.Router();

router.get("/", getAllSnippets);
router.post("/", createSnippet);
router.get("/comments/:id", getSnippetComments);
router.post("/comments/:id", addComment);
router.get("/profile/:id", getProfile);
router.delete("/profile/snippet/:id", deleteSnippet);
router.delete("/profile/snippet/:snippetId/comments/:commentId", deleteComment);

export default router;