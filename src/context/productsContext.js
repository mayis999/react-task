import React, { useReducer } from "react";
import { getProduct, getProducts, getSizes } from "../services/api";

const initialState = {
  products: null,
  productDetail: null,
  productSizes: [],
  selectProductColor: null,
  sendProduct: {
    product: "",
    color: "",
    size: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
        selectProductColor: action.payload.colors[0],
      };
    case "SET_PRODUCT_SIZES":
      return {
        ...state,
        productSizes: action.payload,
      };
    case "CHANGE_PRODUCT_COLOR":
      return {
        ...state,
        selectProductColor: action.payload,
      };
    case "CHANGE_SEND_PRODUCT":
      return {
        ...state,
        sendProduct: action.payload,
      };
    default:
      return state;
  }
};

export const productsContext = React.createContext();

export default function ProductsContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();

      dispatch({
        type: "SET_PRODUCTS",
        payload: products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProductDetail = async (id) => {
    try {
      const productDetail = await getProduct(id);

      dispatch({
        type: "SET_PRODUCT_DETAIL",
        payload: productDetail,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProductSizes = async (id) => {
    try {
      const productSizes = await getSizes();

      dispatch({
        type: "SET_PRODUCT_SIZES",
        payload: productSizes,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeProductColor = async (color) => {
    dispatch({
      type: "CHANGE_PRODUCT_COLOR",
      payload: color,
    });
  };

  const changeSendProduct = async (value) => {
    dispatch({
      type: "CHANGE_SEND_PRODUCT",
      payload: value,
    });
  };

  const addProductToCart = (product) => {
    alert(JSON.stringify(product, null, 2));
  };

  const propsValue = {
    products: state.products,
    productDetail: state.productDetail,
    productSizes: state.productSizes,
    selectProductColor: state.selectProductColor,
    sendProduct: state.sendProduct,
    fetchProducts,
    fetchProductDetail,
    fetchProductSizes,
    addProductToCart,
    changeProductColor,
    changeSendProduct,
  };

  return (
    <productsContext.Provider value={propsValue}>
      {props.children}
    </productsContext.Provider>
  );
}
