//import react from "react"
import {useState} from "react"
import { useNavigate } from "react-router-dom"
function snip(info){
    const navigate= useNavigate()
    return(
        
        <div className="snip-card" onClick={() => navigate(`/snippet/${info.id}`)} style={{ cursor: 'pointer' }}>
            
          <h1 className="name">Anonymous</h1>
          <pre className="code"><code>{info.code}</code></pre>
       </div>
    )
}
export default snip
