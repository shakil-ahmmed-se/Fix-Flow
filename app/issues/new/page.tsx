"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuesPage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>();
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issues Description.." {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuesPage;
