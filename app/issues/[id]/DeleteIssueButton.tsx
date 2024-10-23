import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const DeleteIssueButton = ({issueId}: { issueId: number}) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Confirm Deletion
                </AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue? This action cannot be undone
                </AlertDialog.Description>

                <Flex gap={'3'} mt={'4'} justify='end'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant='solid' color='red'>Delete</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
     
    );
};

export default DeleteIssueButton;   