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
import { PostType, postTypeOptions } from "@/constants";
import { addPost } from "@/lib/actions/post.actions";
import { JobPostTypes, PostFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const jobPostformSchema = z.object({
  jobDescription: z.string(),
  jobType: z.any(),
  name: z.string(),
});

const PostForm = ({ data = null, userId }: PostFormProps) => {
  const [post, setPost] = useState(data);
  console.log("Post ", post);

  const [newPostType, setNewPostType] = useState<JobPostTypes | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const intialValues = {
    jobDescription: Boolean(data) ? data?.jobDescription : "",
    jobType: data?.jobType,
    name: Boolean(data) ? data?.name : "",
  };

  const form = useForm<z.infer<typeof jobPostformSchema>>({
    resolver: zodResolver(jobPostformSchema),
    defaultValues: intialValues,
  });

  async function onSubmit(values: z.infer<typeof jobPostformSchema>) {
    setIsSubmitting(true);
    console.log("Form values ", values);

    try {
      const newPost = await addPost({
        post: {
          jobDescription: values.jobDescription ?? "",
          jobType: post?.jobType,
          name: values.name ?? "",
        },
        userId,
        path: "/",
      });

      if (newPost) {
        form.reset();
        setPost(newPost);
        router.push(`/ilmoitus/${newPost._id}`);
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
      jobType: postType.type as PostType,
    }));

    return onChangeField(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
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

        <CustomField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lisää työnkuvaus</FormLabel>
              <FormControl>
                <Input placeholder="Kuvaus" {...field} />
              </FormControl>
              <FormDescription>
                {"Kuvailea työtä jota haet/tarjoat"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
