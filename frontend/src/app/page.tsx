import CarouselComponent from "./components/carousel/carousel.component";
import CardComponent from "./components/card/card-component";
import { Product } from "./models/product.zod";
import "./page.scss";
import ServerPORT from "./utils/port.util";

async function fetchAllProducts() {
  const productDataPromise = await fetch(ServerPORT + "product", {
    method: "get",
  });
  const rData: Promise<{ success: boolean; data: Product[]; message: string }> =
    await productDataPromise.json();
  return (await rData).data;
}

export default async function Page() {
  const productData: Product[] = await fetchAllProducts();

  return (
    <main>
      <CarouselComponent></CarouselComponent>
      <div className="trending-fashion-container">
        <h2>Trending Fashion</h2>
        <CardComponent productData={productData}></CardComponent>
      </div>
    </main>
  );
}
