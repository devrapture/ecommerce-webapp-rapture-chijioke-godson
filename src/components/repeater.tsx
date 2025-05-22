import { cn } from "@/lib/utils";
import { Box } from "@mantine/core";
import { Fragment, type PropsWithChildren } from "react";
import { v4 as uuidv4 } from "uuid";
type Props = {
  count: number;
  className?: string;
};

const Repeater = ({ count, children, className }: PropsWithChildren<Props>) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <Box className={cn(className)}>
      {Array.from({ length: count }, (_) => (
        <Fragment key={uuidv4()}>{children}</Fragment>
      ))}
    </Box>
  );
};

export default Repeater;
