"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";


type IssueForm = z.infer<typeof createIssueSchema>
//  

const NewIssuesPage = () => {
  const router = useRouter();
  const { register, handleSubmit, control, formState:{errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState("");

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
        onSubmit={handleSubmit(async(data) => {
          try {
            await axios.post("/api/issues/", data);
            router.push("/issues");
          } catch (error) {
            setError("Failed to create issue. Please try again later.");
            console.log(error)
          }
        })}
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
        {errors.title && <Text color="red">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issues Description.." {...field} />
          )}
        />
        {errors.description && <Text as="p" color="red">{errors.description.message}</Text>}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuesPage;
