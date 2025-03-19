import Banner from "../banner/Banner";
import { ImageInner } from "../imginner/ImgInner";
import SectionContent from "../sectioncontent/SectionContent";
import { Delivery } from "../delivery/Delivery";
import HotContent from "../hotcontent/HotContent";
import ProductHome from "../product-home/ProductHome";
import DescriptionShop from "../description/DescriptionShop";
import { BannerColTab } from "../bannercoltab/BannerColtab";

const Content = () => {
  return (
    <>
      <Banner />
      <SectionContent />
      <DescriptionShop/>
      <HotContent/>
      <ImageInner />
      <Delivery />
      <ProductHome/>
      <BannerColTab />
    </>
  );
};
export default Content;
