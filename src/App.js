import React from "react";
import ProductsContextProvider from "./context/productsContext";
import RoutesPages from "./Routes"

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProductsContextProvider>
          <RoutesPages />
        </ProductsContextProvider>
      </header>
    </div>
  );
}
