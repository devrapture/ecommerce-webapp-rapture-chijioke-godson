import apis from "@/services/api-services";
import type { ProductListResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useProductList = (
  search: string,
  minValue: number,
  maxValue: number,
) => {
  const _search = search?.trim()?.toLowerCase();

  return useQuery({
    queryKey: ["productList"],
    queryFn: async (): Promise<ProductListResponse[]> => {
      const res = await apis.productList();
      return res.data as ProductListResponse[];
    },
    select: (data) =>
      data
        ?.filter((item) => {
          const matchesSearch =
            item?.title?.toLowerCase()?.includes(_search) ||
            item?.category?.toLowerCase()?.includes(_search);

          const itemPrice = parseFloat(item.price.toString());
          const matchesPriceRange =
            itemPrice >= minValue && itemPrice <= maxValue;

          return matchesSearch && matchesPriceRange;
        })
        ?.map((item) => ({
          ...item,
          price: (item?.price * (1 + 2.2 / 100))?.toFixed(2),
          quantity: item?.rating?.count,
        })),
  });
};
