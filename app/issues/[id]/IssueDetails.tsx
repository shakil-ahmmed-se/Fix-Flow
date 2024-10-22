import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issues } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

// interface Props {
//     issue: 
// }

const IssueDetails = ({issue}:{issue: Issues}) => {
  return (
    <>
      <Heading as="h2" className="me-3">
        {issue.title}
      </Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text className="text-sm">{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="mt-5">
        <ReactMarkdown>{issue.description}</ReactMarkdown> <br />
      </Card>
    </>
  );
};

export default IssueDetails;
