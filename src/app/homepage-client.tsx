"use client";
import ProductsSkeleton from "@/components/products-skeleton";
import SkeletonWrapper from "@/components/skeleton-wrapper";
import {useProductFilters} from "@/hooks/logic/use-product-filters"
import {
  Badge,
  Button,
  Card,
  Group,
  Rating,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Box,
} from "@mantine/core";
import Image from "next/image";
import numeral from "numeral";
import { NumberInput } from "@mantine/core";

const HomepageClient = () => {
  const {
    search,
    minValue,
    maxValue,
    data,
    isLoading,
    handleSearch,
    handleMinRangeValue,
    handleMaxRangeValue,
  } = useProductFilters();

  return (
    <>
      <Box className="sticky top-10 z-10 rounded-md bg-white/80 p-2 shadow-sm backdrop-blur-sm">
        <Group className="items-end sm:justify-end">
          <TextInput placeholder="Search products" onChange={handleSearch} />
          <Box>
            <Text>Price Range</Text>
            <Group className="items-end">
              <NumberInput
                label="Min value"
                value={minValue}
                onChange={handleMinRangeValue}
                min={5}
              />
              <Text>-</Text>
              <NumberInput
                label="Max value"
                value={maxValue}
                onChange={handleMaxRangeValue}
                min={10}
              />
            </Group>
          </Box>
        </Group>
      </Box>
      <SkeletonWrapper
        isLoading={isLoading}
        Loader={<ProductsSkeleton />}
        isEmpty={!data?.length}
      >
        <SimpleGrid className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {data?.map((item) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={item?.id}
              className="transition-allduration-200 h-full cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.12)] ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
            >
              <Card.Section className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  height={200}
                  width={200}
                  className="h-[200px] w-full object-center"
                />
                <Badge
                  variant="filled"
                  size="sm"
                  className="absolute top-2 left-2"
                >
                  {item.category}
                </Badge>
              </Card.Section>

              <Stack gap="xs" className="mt-3 flex-1">
                <Text size="sm" fw={600} lineClamp={2}>
                  {item.title}
                </Text>

                <Group justify="space-between" align="center">
                  <Text size="lg" fw={700} c="blue">
                    {numeral(item?.price).format("$0,0.00")}
                  </Text>

                  <Group gap={4} align="center">
                    <Rating
                      value={item.rating.rate}
                      fractions={2}
                      readOnly
                      size="sm"
                    />
                    <Text size="xs" c="dimmed">
                      ({item?.rating?.count})
                    </Text>
                  </Group>
                </Group>

                <Button fullWidth variant="filled" className="mt-auto">
                  Add to Cart
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </SkeletonWrapper>
    </>
  );
};
export default HomepageClient;
