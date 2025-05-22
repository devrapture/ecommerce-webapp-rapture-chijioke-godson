"use client";
import ProductsSkeleton from "@/components/products-skeleton";
import SkeletonWrapper from "@/components/skeleton-wrapper";
import { useProductList } from "@/hooks/query/use-product";
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
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import Image from "next/image";
import numeral from "numeral";
import { useState, type ChangeEvent } from "react";

const HomepageClient = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(search, 200);
  const { data, isLoading } = useProductList(debouncedSearchValue);
  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  return (
    <>
      <Group className="justify-end">
        <TextInput placeholder="Search products" onChange={handleSearch} />
      </Group>
      <SkeletonWrapper isLoading={isLoading} Loader={<ProductsSkeleton />} isEmpty={!data?.length}>
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
