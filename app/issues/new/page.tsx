import React from 'react';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(()=> import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const NewIssuePage = () => {
  return (
    <IssueForm/>
  );
};

export default NewIssuePage;