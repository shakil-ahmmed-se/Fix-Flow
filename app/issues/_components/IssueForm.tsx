"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issues } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;
//

interface Props {
  issue?: Issues
}

const IssueForm = ({issue}: Props) => {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors },} = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if(issue)
        await axios.patch(`/api/issues/${issue.id}`, data)
      else
        await axios.post("/api/issues/", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("Failed to create issue. Please try again later.");
      console.log(error);
    }
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="text-2xl">
          {issue? 'Edit This Issue': 'Create New Issues'}
        </h1>
        <TextField.Root
          radius="large"
          defaultValue={issue?.title}
          placeholder="Enter Issues.."
          variant="soft"
          size="3"
          className="mb-4"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issues Description.." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue? 'Update Issue': 'Submit New Issue'}  {' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
