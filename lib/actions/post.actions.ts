"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/dbmodels/user.model";
import Image from "../database/dbmodels/image.model";
import { redirect } from "next/navigation";
import Post from "../database/dbmodels/post.model";
import { AddPostParams, UpdateImageParams } from "@/types";

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

//UPDATE IMAGE
// TODO: THIS IS DEMO FUNCTION ONLY
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Image not found, or no permissions");
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}

// DELETE IMAGE
// TODO: THIS IS DEMO FUNCTION ONLY
export async function deleteImage(imageId: string) {
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);
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
export async function getImageById(imageId: string) {
  try {
    await connectToDatabase();

    const image = await populateUser(Image.findById(imageId));
    if (!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}
