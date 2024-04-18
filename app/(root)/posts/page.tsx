import Header from "@/components/shared/Header";
import PostForm from "@/components/shared/PostForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import React from "react";

const PostsPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId ?? "");

  return (
    <>
      <Header
        title="Tänne tulee työpaikka ja työnhaku ilmoitukset joskus.."
        subtitle="Coming 'soon'... :D"
      />
    </>
  );
};

export default PostsPage;
