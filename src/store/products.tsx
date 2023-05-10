import create from "zustand";
import axios from "axios";
import { useEffect, useMemo } from "react"
import type { ProductProps, ProductPropsNotID } from "~/components/product";


interface ProductState {
  products: ProductProps[];
  isLoading: boolean;
  hasError: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchProducts: () => void;
  addProduct: (product: ProductPropsNotID) => void;
}

interface ApiResponse {
  products: ProductProps[];
}

// Declaring the state for the products using Zustand as well as the
// Main functionalities that I'm expecting
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: true,
  hasError: false,
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  fetchProducts: () => {
    axios
      .get<ApiResponse>("http://localhost:5000/products/get-all")
      .then((response) => {
        set({ products: response.data.products, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        set({ isLoading: false, hasError: true });
      });
  },
  addProduct: (product: ProductPropsNotID) => {
    axios
      .post("http://localhost:5000/products/add", product)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const newProduct = response.data.product;
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
}));


// Final function to use products
export const useProducts = () => {
  const { products, isLoading, hasError, searchQuery, setSearchQuery, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // We're using memo here to avoid loading the products that we already have
  // multiple times, improving our performance
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }
    
    const query = searchQuery.toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(query));
  }, [searchQuery, products]);

  // And finally we return the declared properties of the store
  return {
    products,
    filteredProducts,
    isLoading,
    hasError,
    searchQuery,
    setSearchQuery,
  };
};
