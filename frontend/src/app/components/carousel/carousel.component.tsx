"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "./carousel.component.scss";
function CarouselComponent() {
  return (
    <section id="carousell-section">
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
          <Image
            src="/images/banner1.png"
            width={1000}
            height={573}
            alt="banner"
          />
        </div>

        <div>
          <Image
            src="/images/banner2.png"
            width={1000}
            height={573}
            alt="banner"
          />
        </div>

        <div>
          <Image
            src="/images/banner3.png"
            width={1000}
            height={573}
            alt="banner"
          />
        </div>

        <div>
          <Image
            src="/images/banner4.png"
            width={1000}
            height={573}
            alt="banner"
          />
        </div>
      </Carousel>
    </section>
  );
}

export default CarouselComponent;
