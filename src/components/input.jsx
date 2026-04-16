import {useState} from "react"
import axios from "axios"
function Input(){
   const[value,setValue]= useState("")
    
    return(
        <div className="input">
            <textarea id="box" type="text" placeholder="paste your code" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={async()=>{
                try {
            const response = await axios.post("http://localhost:30000", {
                code: value,
                authorid: localStorage.getItem("shame_uuid")
            });
            setValue(""); 
            
        } catch (error) {
            console.error("Error posting snippet:", error);
        }
            }}>submit</button>

        </div>
    )
}
export default Input
