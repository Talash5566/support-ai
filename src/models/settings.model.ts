import { model ,models, Schema } from "mongoose";
import mongoose from "mongoose";
interface settingsschema {
    ownerId : string,
    buisnessName : string,
    suppportEmail : string,
    knowledge : string
}

const settingsSchema = new Schema<settingsschema>({
    ownerId:{
        type:String,
        required:true,
        unique:true
    },
    buisnessName:{
        type:String,
        
    },
    suppportEmail:{
        type:String,
      
    },
    knowledge:{
        type:String,
       
    }
},{timestamps:true})

const Settings = mongoose.models.Settings || model("Settings",settingsSchema)

export default Settings