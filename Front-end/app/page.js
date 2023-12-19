import Earbuds from "@/components/home/Earbuds";
import Laptops from "@/components/home/Laptops";
import Mobiles from "@/components/home/Mobiles";
import New from "@/components/home/New";
import Overears from "@/components/home/Overears";
import Slider from "@/components/home/Slider";

export default function Home() {

  return <>
    <Slider />
    <New />
    <Laptops />
    <Mobiles />
    <Earbuds />
    <Overears />
  </>
}
