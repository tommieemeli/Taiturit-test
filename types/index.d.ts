/* eslint-disable no-unused-vars */

import { IPost } from "@/lib/database/dbmodels/post.model";

// ====== USER PARAMS
declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== ADD POST PARAMS
declare type AddPostParams = {
  post: {
    jobDescription: string;
    jobTitle: string;
    jobType: PostType;
    name: string;
  };
  userId: string;
  path: string;
};

// ===== UPDATE POST PARAMS
declare type UpdatePostParams = {
  post: {
    _id: string;
    jobDescription: string;
    jobType: PostType;
    name: string;
  };
  userId: string;
  path: string;
};

declare type JobPostTypes = {
  jobSeeking?: boolean;
  jobPosting?: boolean;
};

// ====== TRANSACTION PARAMS
declare type CheckoutTransactionParams = {
  plan: string;
  credits: number;
  amount: number;
  buyerId: string;
};

declare type CreateTransactionParams = {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  buyerId: string;
  createdAt: Date;
};

// ====== URL QUERY PARAMS
declare type FormUrlQueryParams = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

declare type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

declare type RemoveUrlQueryParams = {
  searchParams: string;
  keysToRemove: string[];
};

declare type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type PostFormProps = {
  userId: string;
  data?: IPost | null;
};
