import Image from "next/image";
import Banner from "./components/home-components/Banner";
import Hero from "./components/home-components/Hero";
import FeatureProduct from "./components/home-components/FeatureProduct";
import Hero2 from "./components/home-components/Hero2";
import BestSelling from "./components/home-components/BestSelling";
import ShippingDetails from "./components/home-components/ShippingDetails";
import Testimonials from "./components/home-components/Testimonials";
import Newsletter from "./components/home-components/Newsletter";

export default function Home() {
  return (
    <>
    <Banner/>
    <Hero/>
    <FeatureProduct/>
    <Hero2/>
    <BestSelling/>
    <ShippingDetails/>
    <Testimonials/>
    <Newsletter/>
    </>
  );
}
