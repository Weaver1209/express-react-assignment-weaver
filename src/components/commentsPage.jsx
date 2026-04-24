import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CommentPage() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [snippet, setSnippet] = useState({
        code: "",
        authorid: "",
        comments: [] 
    });

    const [newCommentText, setNewCommentText] = useState("");

    useEffect(() => {
        const fetchcomment = async () => {
            try {
                const response = await axios.get(`http://localhost:30000/comments/${id}`);
                setSnippet(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchcomment();
    }, [id]);

    const PostComment = async () => {
        if (!newCommentText.trim()) return;
        try {
            const response = await axios.post(`http://localhost:30000/comments/${id}`, {
                text: newCommentText,
                commenter_id: localStorage.getItem("shame_uuid")
            });

            
            setSnippet(response.data);
            setNewCommentText(""); 
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <div className="comment-page">
            
            <div className="layout">
                <div className="code-layout">
                    <h2>Anonynmous</h2>
                    <pre><code>{snippet.code}</code></pre>
                </div>

                
                <div className="comment-layout">
                    <h2>Comments ({snippet.comments.length})</h2>
                    
                    <div className="detail-comments-list">
                        {snippet.comments.map((c, index) => (
                            <div key={index} className="single-comment">
                                <strong>Anonymous:</strong> {c.text}
                            </div>
                        ))}
                    </div>
                    <div className="comment-input">
                        <input 
                            type="text" 
                            placeholder="Type your roast here..."
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}

                        />
                        <button onClick={PostComment}>
                            Post comment
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}