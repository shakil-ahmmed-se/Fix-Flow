
'use client'
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuesPage = () => {
    return (
        <div className='max-w-xl m-auto space-y-4'>
            <h1 className='text-2xl'>Create New Issues</h1>
            <TextField.Root radius="large" placeholder='Enter Issues..' variant="soft" size='3' className='mb-4'>
            </TextField.Root>    
            <SimpleMDE  placeholder="Issues Description.." />
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuesPage;