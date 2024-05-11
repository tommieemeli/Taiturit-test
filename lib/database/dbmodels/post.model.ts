import { PostType } from "@/constants";
import { Schema, model, models, Document } from "mongoose";

export interface IPost extends Document {
  jobDescription: string;
  jobType: PostType;
  name: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema({
  jobDescription: { type: String, required: true },
  jobType: { type: Number, required: true },
  name: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = models?.Post || model("Post", PostSchema);
export default Post;
