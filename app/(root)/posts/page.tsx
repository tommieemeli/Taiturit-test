import Header from "@/components/shared/Header";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import React from "react";
import { getAllPosts } from "@/lib/actions/post.actions";
import PostCards from "@/components/shared/PostCards";

const PostsPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId ?? "");

  // TODO: Should take PostType as param
  const posts = await getAllPosts();

  return (
    <>
      <Header title="Selaa ja löydä" subtitle="Selaa ilmoituksia" />

      <PostCards posts={posts} />
    </>
  );
};

export default PostsPage;
