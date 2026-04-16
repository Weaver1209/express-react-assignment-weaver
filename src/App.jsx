import {useState,useEffect}from 'react'
import axios from "axios"
import Snip from "./components/snippet.jsx"
import Input from "./components/input.jsx"
import UUID from  "./components/uuid.js"
function  App(){
  UUID();
  const [allSnips , setallSnips] = useState([])
  useEffect(()=>{
    const fetchSnips = async () => {
            try {
                const response = await axios.get("http://localhost:30000");
                setallSnips(response.data); 
            } catch (error) {
                console.error("Error fetching snippets:", error);
            }
        };

        fetchSnips();
  },[])
  
  return(
    <>
     <div className="header">
       <h1 id='heading'>Wall of Shame</h1>
       <img id='profile' src={"./assets/profile.jpg"} alt='profile'></img>
     </div>
     <div className='snips'>
       { allSnips.map((snippet) => (
                        <Snip code={snippet.code} id={snippet._id} comment={snippet.comment} />
       ))}</div>
     <Input />
    </>
  )
}
export default App
