import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [mySnippets, setMySnippets] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const myId = localStorage.getItem("shame_uuid");

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!myId) return;
            try {
                const response = await axios.get(`http://localhost:30000/profile/${myId}`);
                setMySnippets(response.data.mySnippets);
                setMyComments(response.data.myComments);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfileData();
    }, [myId]);
    const DeleteSnippet = async (snippetId) => {
        try {
            await axios.delete(`http://localhost:30000/profile/snippet/${snippetId}`);
            const response = await axios.get(`http://localhosat:30000/profile/${myId}`)
            setMySnippets(response.data.mySnippets);
        } catch (error) {
            console.error("Error deleting snippet:", error);
        }
    };

    const DeleteComment = async (snippetId, commentId) => {
        try {
            await axios.delete(`http://localhost:30000/profile/snippet/${snippetId}/comments/${commentId}`);
            const response = await axios.get(`http://localhost:30000/profile/${myId}`);
            setMyComments(response.data.myComments);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };
    return (
    <div className="profile-page">
        <div className="profile-header">
            <h1>My Profile</h1>
        </div>

        <div className="profile-layout">
            <div className="profile-column">
                <h2>Snippets</h2>
             
                {mySnippets.map((snippet) => (
                    <div key={snippet._id} className="snip-card">
                        <pre><code>{snippet.code}</code></pre>
                        <button 
                            className="delete-btn" 
                            onClick={() => DeleteSnippet(snippet._id)}
                        >
                            Delete Snippet
                        </button>
                    </div>
                ))}
            </div>
            <div className="profile-column">
                <h2>Comments </h2>
                {myComments.map((snippet) => (
                    <div key={snippet._id} className="profile-card">
                        <p className="context-text">On Snippet: {snippet.code}</p>                        
                        {snippet.comments
                            .filter(c => c.commenter_id === myId)
                            .map((myComment) => (
                                <div key={myComment._id} className="my-single-comment">
                                    <p>"{myComment.text}"</p>
                                    <button 
                                        className="delete-btn comment-delete" 
                                        onClick={() => DeleteComment(snippet._id, myComment._id)}
                                    >
                                        Delete Roast
                                    </button>
                                </div>
                        ))}
                    </div>
                ))}
            </div>
            
        </div>
    </div>
);




}