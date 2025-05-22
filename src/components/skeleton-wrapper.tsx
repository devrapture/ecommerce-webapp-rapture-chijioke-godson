import { Text } from "@mantine/core";
import { type FC, type PropsWithChildren, type ReactNode } from "react";

interface Props {
  isLoading: boolean;
  Loader: FC | ReactNode;
  isEmpty?: boolean;
}

const SkeletonWrapper = ({
  isLoading,
  Loader,
  children,
  isEmpty,
}: PropsWithChildren<Props>) => {
  if (isLoading) {
    // Check if Loader is a function component
    if (typeof Loader === "function") {
      return <Loader />;
    }
    // Otherwise, just return the ReactNode directly
    return Loader;
  }

  if (isEmpty) {
    return (
      <Text className="my-10 text-center text-2xl font-bold">
        No Item found
      </Text>
    );
  }

  return <>{children}</>;
};

export default SkeletonWrapper;
