import mongoose from "mongoose"

const snipschema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    authorid:{
        type:String,
        required:true,
        index:true
    },
    comments: [{
        text: String,
        commenter_id: String,}]
})
export const Snippet= mongoose.model('Snippet', snipschema);