import Header from "@/components/shared/Header";
import { PostType } from "@/constants";
import { getPostById } from "@/lib/actions/post.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const PostsDetailsPage = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const post = await getPostById(id);
  console.log("Post from postdetails ", post);

  return (
    <>
      <Header
        title={`Ilmoituksenne on lisätty!`}
        subtitle={`Lisääjä: ${post.name}`}
      />
      <section className="mt-5 flex flex-wrap gap-4">
        {post.jobDescription && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Työnkuvaus:</p>
              <p className=" capitalize text-purple-400">
                {post.jobDescription}
              </p>
            </div>
          </>
        )}

        {post.jobType && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Ilmoituksen tyyppi:</p>
              <p className=" capitalize text-purple-400">
                {post.jobType === PostType.jobPosting
                  ? "Työnhaku ilmoitus"
                  : "Työnhaku ilmoitus"}
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default PostsDetailsPage;
