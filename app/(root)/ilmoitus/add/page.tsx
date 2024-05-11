import Header from "@/components/shared/Header";
import PostForm from "@/components/shared/PostForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import React from "react";

const AddPostPage = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId ?? "");

  return (
    <>
      <Header
        title="Lisää taituri ilmoitus"
        subtitle="Lisää joko työnhaku- tai työntarjousilmoitus"
      />

      <section className="mt-10">
        <PostForm userId={user._id} />
      </section>
    </>
  );
};

export default AddPostPage;
