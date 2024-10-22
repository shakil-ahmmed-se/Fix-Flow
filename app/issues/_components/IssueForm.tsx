"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";
import { Issues } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;
//

interface Props {
  issue?: Issues
}

const IssueForm = ({issue}: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
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
    <div className="max-w-xl m-auto ">
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
