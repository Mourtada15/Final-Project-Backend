import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  location: string;
  email: string;
  password: string;
  savedProducts: mongoose.Schema.Types.ObjectId[] | null;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      message: "Please enter a valid email address."
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  savedProducts: {
    type: [{
      type: mongoose.Schema.Types.ObjectId, // I need to populate
      ref: "Product",
    }],
    default: [] 
  }
}, { timestamps: true })

export default mongoose.model<IUser>('User', userSchema);