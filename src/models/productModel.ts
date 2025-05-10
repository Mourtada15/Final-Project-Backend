import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  condition: string;
  description: string;
  image: string;
  subCategoryID: mongoose.Schema.Types.ObjectId | null;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    enum: ['New', 'Used - like new', 'Used - good', 'Used - fair' ],
    default: 'New',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    // required: true
  },
  subCategoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  }
}, { timestamps: true });

// Create a text index on the title and description fields
productSchema.index({ title: 'text', description: 'text' });

productSchema.pre("find", function (next) {
  this.populate(["subCategoryID"]);
  next();
});

productSchema.pre("findOne", function (next) {
  this.populate(["subCategoryID"]);
  next();
});

export default mongoose.model<IProduct>('Product', productSchema);