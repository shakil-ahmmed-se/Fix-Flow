import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="w-1/2">
      <Skeleton/>
      <Flex className="space-x-3" my="2">
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className="mt-5" mt='4'>
       <Skeleton/>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
