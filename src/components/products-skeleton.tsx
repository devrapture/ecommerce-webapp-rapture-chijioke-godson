import { Card, Group, Skeleton, Stack } from "@mantine/core";
import Repeater from "./repeater";

const ProductsSkeleton = () => {
  return (
    <Repeater
      count={8}
      className="my-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4"
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section className="relative">
          {/* Image skeleton */}
          <Skeleton height={200} />

          {/* Category badge skeleton */}
          <Skeleton
            width={80}
            height={20}
            radius="xl"
            className="absolute top-2 left-2"
          />
        </Card.Section>

        <Stack gap="xs" className="mt-3">
          {/* Title skeleton - 2 lines */}
          <Stack gap={4}>
            <Skeleton height={16} width="90%" />
            <Skeleton height={16} width="70%" />
          </Stack>

          {/* Price and rating section */}
          <Group justify="space-between" align="center" className="mt-2">
            <Skeleton height={20} width={60} />

            <Group gap={4} align="center">
              <Skeleton height={16} width={80} />
              <Skeleton height={14} width={30} />
            </Group>
          </Group>

          {/* Add to cart button skeleton */}
          <Skeleton height={36} radius="sm" className="mt-3" />
        </Stack>
      </Card>
    </Repeater>
  );
};

export default ProductsSkeleton;
