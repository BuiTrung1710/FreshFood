import defaultProductImg from "../assets/imgs/product_img_default.png";

export const formatImg = (image) =>{
    return image ? `http://localhost:8080${image}` : defaultProductImg;
};