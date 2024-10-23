"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const deleteIssue = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch{
      setError(true);
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone
          </AlertDialog.Description>

          <Flex gap={"3"} mt={"4"} justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={deleteIssue}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {/* another dialog box */}

        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Error
                </AlertDialog.Title>
                <AlertDialog.Description>
                    An error occurred while deleting the issue. Please try again later.
                </AlertDialog.Description>
                <Button color="gray" variant="soft" mt={'4'} onClick={()=>setError(false)}>Ok</Button>
            </AlertDialog.Content>
        </AlertDialog.Root>

    </>
  );
};

export default DeleteIssueButton;
