import { Box, Flex, Group, Text } from "@mantine/core";
import type { PropsWithChildren } from "react";
import PageWrapper from "./pagewrapper";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex className="flex-col">
      <Box component="nav" className="fixed z-50 h-10 w-full bg-white">
        <PageWrapper>
          <Group className="h-full justify-between">
            <Text>Rappy Store</Text>
          </Group>
        </PageWrapper>
      </Box>
      <Box className="min-h-screen flex-1 pt-10">
        <PageWrapper>{children}</PageWrapper>
      </Box>
    </Flex>
  );
};

export default MainLayout;
