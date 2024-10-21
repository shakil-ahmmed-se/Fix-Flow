
'use client'
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface IssueForm  {
    title: string;
    description: string;
}


const NewIssuesPage = () => {
    const router = useRouter();
    const {register, handleSubmit, control} = useForm<IssueForm>();
  
    return (
        <form onSubmit={handleSubmit( async (data)=>{
            await axios.post('/api/issues', data );
            router.push('/issues')
        })}  className='max-w-xl m-auto space-y-4'>
            <h1 className='text-2xl'>Create New Issues</h1>
            <TextField.Root radius="large" placeholder='Enter Issues..' variant="soft" size='3' className='mb-4' {...register('title')}>
            </TextField.Root>    
            <Controller
            name='description'
            control={control}
            render={({field})=> <SimpleMDE  placeholder="Issues Description.." {...field}  />}
            />
            
            <Button >Submit New Issue</Button>
        </form>
    );
};

export default NewIssuesPage;