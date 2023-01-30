import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductSlider from "../productSlider/productSlider";
import { productsContext } from "../../context/productsContext";
import { getProduct, getSizes } from "../../services/api";

const DetailPage = () => {
  const { productDetail, productSizes, fetchProductDetail, fetchProductSizes } =
    useContext(productsContext);

  const [selectProductColor, setSelectProductColor] = useState(null),
    [sendProduct, setSendProduct] = useState({
      product: "",
      color: "",
      size: "",
    }),
    isProduct = !productDetail || !selectProductColor,
    { id } = useParams();

  useEffect(() => {
    fetchProductDetail(id);
    fetchProductSizes();
  }, [id]);

  useEffect(async () => {
    await getProduct(id).then((res) => {
      setSelectProductColor(res?.colors[0]);
      setSendProduct((prev) => ({
        ...prev,
        product: res.name,
        color: res.colors[0].name,
      }));
    });
  }, [id]);

  const changeColor = (color) => {
    saveChoose({ size: "" });
    setSelectProductColor(color);
    saveChoose({ color: color.name });
  };

  const saveChoose = (value) => {
    setSendProduct((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const isBtnDisabled = useCallback(
    (type, id) => {
      if (type === "colors") return id == selectProductColor.id;
      if (type === "sizes") return selectProductColor?.sizes.includes(id);
    },
    [selectProductColor]
  );

  const sendProductToCart = (product) => {
    alert(JSON.stringify(product, null, 2));
  };

  if (isProduct) return <p>Загрузка....</p>;

  return (
    <div>
      <p>{productDetail.name}</p>
      <p>{selectProductColor.description}</p>
      <p>{selectProductColor.price} $</p>

      <ProductSlider images={selectProductColor.images} />

      <div>
        {productDetail.colors?.length &&
          productDetail.colors.map((color) => (
            <button
              key={color.id}
              disabled={isBtnDisabled("colors", color.id)}
              onClick={() => changeColor(color)}
            >
              {color.name}
            </button>
          ))}
      </div>

      <div>
        {productSizes?.length &&
          productSizes?.map((size) => (
            <button
              key={size.id}
              disabled={isBtnDisabled("sizes", size.id)}
              onClick={() => saveChoose({ size: size.label })}
            >
              {size.label} ({size.number})
            </button>
          ))}
      </div>

      <button
        disabled={!sendProduct.size}
        onClick={() => sendProductToCart(sendProduct)}
      >
        В корзину
      </button>
    </div>
  );
};

export default DetailPage;
