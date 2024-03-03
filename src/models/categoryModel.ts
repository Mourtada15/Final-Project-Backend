import mongoose, { Schema, Document, ObjectId } from "mongoose";

// Interface for Category data
export interface ICategory extends Document {
  name: string;
  subCategories: ObjectId[];
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    subCategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    }],
  },
  { timestamps: true }
);

categorySchema.pre("find", function (next) {
  this.populate(["subCategories"]);
  next();
});

categorySchema.pre("findOne", function (next) {
  this.populate(["subCategories"]);
  next();
});

export default mongoose.model<ICategory>("Category", categorySchema);
