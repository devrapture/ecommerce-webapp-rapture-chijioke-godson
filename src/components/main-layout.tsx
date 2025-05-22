"use client";

import { Badge, Box, Flex, Group, Text } from "@mantine/core";
import type { PropsWithChildren } from "react";
import PageWrapper from "./pagewrapper";
import { useCartStore } from "@/app/store/cart";
import Link from "next/link";

const MainLayout = ({ children }: PropsWithChildren) => {
  const { totalItems } = useCartStore();
  return (
    <Flex className="flex-col">
      <Box component="nav" className="fixed z-50 h-10 w-full bg-white">
        <PageWrapper>
          <Group className="h-full justify-between">
            <Link href="/">Rappy Store</Link>
            {totalItems() ? (
              <Link href="/cart">
                <Group className="gap-x-1">
                  <Text>cart</Text>
                  <Badge color="blue" circle>
                    {totalItems()}
                  </Badge>
                </Group>
              </Link>
            ) : null}
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
