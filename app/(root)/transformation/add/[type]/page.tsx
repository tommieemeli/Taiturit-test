import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { SearchParamProps } from "@/types";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const transformation = transformationTypes[type];
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId ?? "");
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10"></section>
    </>
  );
};

export default AddTransformationTypePage;
