import mongoose,{Schema} from "mongoose";

const PHRSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name:{
    type: String,//cloudinary image url
    required: true, 
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  }
});

const phr=mongoose.model("PHR", PHRSchema);
export default phr;
