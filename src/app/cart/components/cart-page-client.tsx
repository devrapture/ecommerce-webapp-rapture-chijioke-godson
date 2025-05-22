"use client";

import { useCartStore } from "@/app/store/cart";
import { toast } from "@/components/ui/toast";
import { getQuantityOrder, isAddedToCart } from "@/lib/utils";
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Rating,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import Image from "next/image";
import numeral from "numeral";

const CartPageClient = () => {
  const mounted = useMounted();
  const {
    addToCart,
    items,
    updateQuantity,
    totalPrice,
    removeFromCart,
    totalItems,
    clearCart,
  } = useCartStore();
  const handleCheckout = () => {
    clearCart();
    toast({
      message: "Checkout successfully",
      variant: "success",
    });
  };
  if (!mounted) return null;
  if (!items?.length) {
    return <Text className="mt-10 text-center font-bold">No item in cart</Text>;
  }

  return (
    <Box className="mt-10">
      <SimpleGrid className="grid grid-cols-1 gap-10 xl:grid-cols-[2fr_1fr]">
        <Card
          radius="md"
          shadow="sm"
          padding="lg"
          withBorder
          className="h-fit xl:order-last"
        >
          <Text>Cart Summary</Text>

          <Group className="mt-5 justify-between">
            <Text>
              item&apos;s total(
              <Text span className="font-bold">
                {totalItems()}
              </Text>
              )
            </Text>
            <Text>{numeral(totalPrice()).format("$0,0.00")}</Text>
          </Group>

          <Button onClick={handleCheckout} className="mt-10">
            Checkout
          </Button>
        </Card>
        <SimpleGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {items?.map((item) => (
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
                  src={item?.image}
                  alt={item?.title}
                  height={200}
                  width={200}
                  className="h-[200px] w-full object-center"
                />
                <Badge
                  variant="filled"
                  size="sm"
                  className="absolute top-2 left-2"
                >
                  {item?.category}
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
                      value={item?.rating?.rate}
                      fractions={2}
                      readOnly
                      size="sm"
                    />
                    <Text size="xs" c="dimmed">
                      ({item?.rating?.count})
                    </Text>
                  </Group>
                </Group>
                {isAddedToCart(item?.id, items) ? (
                  <Group className="mt-auto">
                    <Button
                      size="xs"
                      onClick={() =>
                        updateQuantity(
                          item?.id,
                          // @ts-expect-error unknown
                          getQuantityOrder(item?.id, items) - 1,
                        )
                      }
                    >
                      -
                    </Button>
                    <Text>{getQuantityOrder(item?.id, items)}</Text>
                    <Button
                      size="xs"
                      onClick={() =>
                        updateQuantity(
                          item?.id,
                          // @ts-expect-error unknown
                          getQuantityOrder(item?.id, items) + 1,
                        )
                      }
                    >
                      +
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => removeFromCart(item?.id)}
                    >
                      Remove
                    </Button>
                  </Group>
                ) : (
                  <Button
                    onClick={() => addToCart(item)}
                    fullWidth
                    variant="filled"
                    className="mt-auto"
                  >
                    Add to Cart
                  </Button>
                )}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
};

export default CartPageClient;
