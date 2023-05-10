import React from "react";
import { useProducts } from "../../store/products";
import Product from "../product";

const Products = () => {
  const { filteredProducts, isLoading, hasError} = useProducts();

  return (
    <div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
        <Product key={product.id} {...product}/>
          ))}
        </ul>
      )}

      
      {hasError && <div>There was an error loading the products.</div>}
    </div>
  );
};

export default Products;