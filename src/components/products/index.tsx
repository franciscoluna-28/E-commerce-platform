import React from "react";
import { useProducts } from "../../store/products";
import Product from "../product";

const Products = () => {
  const { filteredProducts, isLoading, hasError} = useProducts();

  return (
    <div className="">

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="mt-6">
          <ul className="flex gap-6">
          {filteredProducts.map((product) => (

        <Product key={product.id} {...product}/>
          ))}
          </ul>
        </section>
      )}

      
      {hasError && <div>There was an error loading the products.</div>}
    </div>
  );
};

export default Products;