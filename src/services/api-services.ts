import { server } from "@/lib/axios-util";

const apis = {
  productList: () => server.get("/products"),
};

export default apis;
