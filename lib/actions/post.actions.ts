"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/dbmodels/user.model";
import { redirect } from "next/navigation";
import Post, { IPost } from "../database/dbmodels/post.model";
import { AddPostParams, UpdatePostParams } from "@/types";

export async function addPost({ post, userId, path }: AddPostParams) {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) throw new Error("User not found");

    const newPost = await Post.create({
      ...post,
      author: author._id,
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    handleError(error);
  }
}

//UPDATE POST
export async function updatePost({ post, userId, path }: UpdatePostParams) {
  try {
    await connectToDatabase();

    const postToUpdate = await Post.findById(post._id);

    if (!postToUpdate || postToUpdate.author.toHexString() !== userId) {
      throw new Error("Post not found, or no permissions");
    }

    const updatedPost = await Post.findByIdAndUpdate(postToUpdate._id, post, {
      new: true,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedPost));
  } catch (error) {
    handleError(error);
  }
}

// DELETE POST
export async function deletePost(postId: string) {
  try {
    await connectToDatabase();

    await Post.findByIdAndDelete(postId);
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

const populateUser = (query: any) =>
  query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName",
  });

// GET BY ID
export async function getPostById(postId: string) {
  try {
    await connectToDatabase();

    const post = await populateUser(Post.findById(postId));
    if (!post) throw new Error("Post not found");

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    handleError(error);
  }
}
