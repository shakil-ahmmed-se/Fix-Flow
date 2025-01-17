import { issueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";

// interface Props {
//     params: {params: {id: string}}
// }

export async function PATCH(request: NextRequest, {params}:{params:{id: string}}){
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const issue = await prisma.issues.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!issue)
        return NextResponse.json({error: 'Issue not found'}, {status: 404})

    const updatedIssue = await prisma.issues.update({
        where: {id: parseInt(params.id)},
        data: {
            title: body.title?? issue.title,
            description: body.description?? issue.description,
        }
    })
    return NextResponse.json(updatedIssue, {status: 200})
}
// delete issue

export async function DELETE(request: NextRequest, {params}:{params: {id: string}}){
    const issue = await prisma.issues.findUnique({
        where: {id: parseInt(params.id)}
    });

    if(!issue)
        return NextResponse.json({error: 'Issue not found'}, {status: 404})

    await prisma.issues.delete({
        where: {id: issue.id}

    })
    return NextResponse.json({})

}