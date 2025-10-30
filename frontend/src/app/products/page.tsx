import { Product } from "../models/product.zod";
import ServerPORT from "../utils/port.util";
import "./page.scss";
import CardComponent from "./../components/card/card-component";

type PageProps = {
  searchParams: { category: "men" | "women" | "accessories" };
};

async function fetchProductByCategory(category: string) {
  const url = ServerPORT + "product/" + category;
  const response = await fetch(url);
  const jsonResponse: Promise<{
    success: boolean;
    data: Product[];
    message: string;
  }> = await response.json();
  return (await jsonResponse).data;
}

async function Page({ searchParams }: PageProps) {
  const category = (await searchParams).category;
  const productByCategory: Product[] = await fetchProductByCategory(category);
  return (
    <main id="product-page">
      <h3 className="header-title">{category.toUpperCase()}'S PRODUCTS</h3>
      <CardComponent productData={productByCategory}></CardComponent>
    </main>
  );
}

export default Page;
