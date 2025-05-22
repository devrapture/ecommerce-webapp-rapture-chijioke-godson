import { Container } from "@mantine/core";
import type { PropsWithChildren } from "react";

const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Container
      fluid
      className="!h-full !max-w-[100%] lg:!max-w-[960px] xl:!max-w-[90%]"
    >
      {children}
    </Container>
  );
};

export default PageWrapper;
