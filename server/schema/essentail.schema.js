import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const essentialSchema = new Schema({
  title:{
    type: String,
    required: true
  },
    image: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true  
    },
    type: {
        type: String,
        required: true
    }
});

const Essential = mongoose.model('Essential', essentialSchema);

export default Essential;
