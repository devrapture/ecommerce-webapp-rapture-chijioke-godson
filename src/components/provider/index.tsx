"use client";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getQueryClient } from "./tanstack-query-provider";
import { theme } from "@/lib/theme";

function TanstackQueryProvider({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <TanstackQueryProvider>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </TanstackQueryProvider>
  );
};

export default Provider;
