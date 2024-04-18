"use client";

import { CustomField } from "@/components/shared/CustomField";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postTypeOptions } from "@/constants";
import { addPost } from "@/lib/actions/post.actions";
import { debounce } from "@/lib/utils";
import { JobPostTypes, PostFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const jobPostformSchema = z.object({
  publicId: z.string(),
  jobDescription: z.string(),
  jobType: z.number(),
  keyWords: z.string(),
});

const PostForm = ({ data = null, userId }: PostFormProps) => {
  const [post, setPost] = useState(data);

  const [newPostType, setNewPostType] = useState<JobPostTypes | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const intialValues = {
    jobDescription: Boolean(data) ? data?.jobDescription : "",
    jobType: data?.jobType,
    keyWords: Boolean(data) ? data?.keyWords : "",
  };

  // define form
  const form = useForm<z.infer<typeof jobPostformSchema>>({
    resolver: zodResolver(jobPostformSchema),
    defaultValues: intialValues,
  });

  // define a submite handler
  async function onSubmit(values: z.infer<typeof jobPostformSchema>) {
    console.log("Values ", values);

    try {
      const newPost = await addPost({
        post: {
          jobDescription: "",
          jobType: "",
          keyWords: "",
        },
        userId,
        path: "/",
      });

      if (newPost) {
        form.reset();
        setPost(newPost);
        router.push(`/transformations/${newPost._id}`);
      }
    } catch (error) {
      console.log("Error here: ", error);
    }

    setIsSubmitting(false);
  }

  type JobTypeKey = keyof typeof postTypeOptions;

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const postType = postTypeOptions[value as JobTypeKey];
    setPost((prevState: any) => ({
      ...prevState,
      jobType: postType.type,
    }));

    return onChangeField(value);
  };

  const onInputChangeHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      return onChangeField(value);
    }, 1000);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="keyWords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nimi</FormLabel>
              <FormControl>
                <Input placeholder="Kokonimi" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomField
          control={form.control}
          name="jobType"
          formLabel="Ilmoituksen tyyppi"
          className="w-fill"
          render={({ field }) => (
            <Select
              onValueChange={(value) =>
                onSelectFieldHandler(value, field.onChange)
              }
            >
              <SelectTrigger className="select-field">
                <SelectValue placeholder="Valitse ilmoituksen tyyppi" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(postTypeOptions).map((key) => (
                  <SelectItem key={key} value={key} className="select-item">
                    {postTypeOptions[key as JobTypeKey].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <div className="prompt-field">
          <CustomField
            control={form.control}
            name="jobDescription"
            formLabel="Lisää työnkuvaus"
            className="w-full"
            render={({ field }) => (
              <Input
                value={field.value}
                className="input-field"
                onChange={(e) =>
                  onInputChangeHandler(e.target.value, field.onChange)
                }
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {"Julkaise"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
