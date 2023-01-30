import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductSlider from "../productSlider/productSlider";
import { productsContext } from "../../context/productsContext";

const ProductItem = () => {
  const {
    productDetail,
    productSizes,
    selectProductColor,
    sendProduct,
    fetchProductDetail,
    fetchProductSizes,
    addProductToCart,
    changeProductColor,
    changeSendProduct,
  } = useContext(productsContext);

  const isProduct = !productDetail,
    isSize = !sendProduct.size,
    { id } = useParams();

  useEffect(() => {
    fetchProductDetail(id);
    fetchProductSizes();
  }, [id]);

  const changeColor = (color) => {
    changeProductColor(color);
    saveChoose({ size: "", color: color.name });
  };

  const saveChoose = (value) => {
    const obj = {
      ...sendProduct,
      ...value,
      product: productDetail.name,
      price: selectProductColor.price,
    };
    changeSendProduct(obj);
  };

  const isBtnDisabled = useCallback(
    (type, id) => {
      if (type === "colors") return id == selectProductColor.id;
      if (type === "sizes") return selectProductColor?.sizes.includes(id);
    },
    [selectProductColor]
  );

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

      <button disabled={isSize} onClick={() => addProductToCart(sendProduct)}>
        В корзину
      </button>
    </div>
  );
};

export default ProductItem;
