import Header from "@/components/shared/Header";
import PostForm from "@/components/shared/PostForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import React from "react";
import MyPostsList from "@/components/shared/MyPostsList";
import { getAllPosts } from "@/lib/actions/post.actions";

const MyPosts = async () => {
  const { userId } = auth();

  // TODO: GetAllPostsByUserIdAsync()
  const posts = await getAllPosts();

  return (
    <>
      <Header title="Omat ilmoitukset" />

      {posts.length > 0 && userId !== undefined ? (
        <MyPostsList posts={posts} />
      ) : (
        <></>
      )}
    </>
  );
};

export default MyPosts;
