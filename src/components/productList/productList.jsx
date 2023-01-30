import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../../context/productsContext";

const ProductList = () => {
  const { products, fetchProducts } = useContext(productsContext),
    isProduct = !products;
  let navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const pushToDetailPage = (id) => {
    navigate(`/product/${id}`);
  };

  if (isProduct) return <p>Загрузка...</p>;

  return (
    <div>
      {products?.length &&
        products.map((product) => (
          <div key={product.id} onClick={() => pushToDetailPage(product.id)}>
            <p>{product.name}</p>
            <img
              src={product.colors[0]?.images[0]}
              width={160}
              height={200}
              alt="product image"
            />
          </div>
        ))}
    </div>
  );
};

export default ProductList;
