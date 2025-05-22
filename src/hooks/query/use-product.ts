import apis from "@/services/api-services";
import type { ProductListResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useProductList = (search: string) => {
  const _search = search?.trim()?.toLowerCase();
  return useQuery({
    queryKey: ["productList"],
    queryFn: async (): Promise<ProductListResponse[]> => {
      const res = await apis.productList();
      return res.data as ProductListResponse[];
    },
    select: (data) =>
      data
        ?.filter(
          (item) =>
            item?.title?.toLowerCase()?.includes(_search) ||
            item?.category?.toLowerCase()?.includes(_search),
        )
        ?.map((item) => ({
          ...item,
          price: (item?.price * (1 + 2.2 / 100))?.toFixed(2),
        })),
  });
};
