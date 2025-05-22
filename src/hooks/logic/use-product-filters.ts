import { useState, type ChangeEvent,  } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useProductList } from "../query/use-product";

export const useProductFilters = () => {
  const [search, setSearch] = useState("");
  const [minValue, setMinValue] = useState(5);
  const [maxValue, setMaxValue] = useState(10000000);

  const [debouncedSearchValue] = useDebouncedValue(search, 200);
  const [debouncedMinValue] = useDebouncedValue(minValue, 200);
  const [debouncedMaxValue] = useDebouncedValue(maxValue, 200);

  const { data, isLoading } = useProductList(
    debouncedSearchValue,
    debouncedMinValue,
    debouncedMaxValue,
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleMinRangeValue = (value: number | string) => {
    setMinValue(value as number);
  };

  const handleMaxRangeValue = (value: number | string ) => {
    setMaxValue(value as number);
  };

  return {
    search,
    minValue,
    maxValue,
    debouncedSearchValue,
    debouncedMinValue,
    debouncedMaxValue,
    data,
    isLoading,
    handleSearch,
    handleMinRangeValue,
    handleMaxRangeValue,
  };
};
