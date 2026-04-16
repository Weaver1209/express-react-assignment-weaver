//import react from "react"
import {useState} from "react"
function snip(info){
    const[showcomment,setshowcomment] = useState(false)
    return(
        
        <div className="snip-card" onClick={()=>{
            setshowcomment(true)
            Comment(info.comment)}}>
          <h1 className="name">Anonymous</h1>
          <pre className="code"><code>{info.code}</code></pre>
       </div>
    )
}
export default snip
function Comment(comment){

}