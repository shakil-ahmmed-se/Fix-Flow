"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";


type IssueForm = z.infer<typeof createIssueSchema>
//  

const NewIssuesPage = () => {
  const router = useRouter();
  const { register, handleSubmit, control, formState:{errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [isSubmitting, setSubmitting] = useState(false)
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async(data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues/", data);
      router.push("/issues"); 
    } catch (error) {
      setSubmitting(false);
      setError("Failed to create issue. Please try again later.");
      console.log(error)
    }
  })

  return (
    <div className="max-w-xl m-auto ">
      {error && (
        <Callout.Root  color="red">
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <h1 className="text-2xl">Create New Issues</h1>
        <TextField.Root
          radius="large"
          placeholder="Enter Issues.."
          variant="soft"
          size="3"
          className="mb-4"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issues Description.." {...field} />
          )}
        />
       <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
  );
};

export default NewIssuesPage;
