import { PostType } from "@/constants";
import { Schema, model, models, Document } from "mongoose";

export interface IPost extends Document {
  jobDescription: string;
  jobType: PostType;
  keyWords: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureUrl: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
  config: { type: Object },
  transformationUrl: { type: String },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },

  jobDescription: { type: String, required: true },
  jobType: { type: PostType, required: true },
  keyWords: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = models?.Post || model("Post", PostSchema);
export default Post;
