
import prisma from '@/prisma/client';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusBadge from '../components/IssueStatusBadge';

const IssuesPage = async () => {
    const issues = await prisma.issues.findMany();
    return (

        <>
           <div className='mb-4'>

                <Button ><Link href='/issues/new'>New Issues</Link></Button>
           </div>
           <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue =>(
                        <Table.Row key={issue.id}>
                            <Table.Cell>{issue.title}</Table.Cell>
                            <Table.Cell><IssueStatusBadge status={issue.status}/></Table.Cell>
                            <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
           </Table.Root>
        
        </>
    );
};

export default IssuesPage;