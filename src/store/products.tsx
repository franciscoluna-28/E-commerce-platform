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
  deleteProduct: (productId: number) => void;
}

interface ApiResponse {
  products: ProductProps[];
}

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const newProduct = response.data.product;
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteProduct: (productId: number) => {
    axios
      .delete(`http://localhost:5000/products/delete-by-id/${productId}`)
      .then(() => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  },
}));

export const useProducts = () => {
  const { products, isLoading, hasError, searchQuery, setSearchQuery, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }
    
    const query = searchQuery.toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(query));
  }, [searchQuery, products]);

  return {
    products,
    filteredProducts,
    isLoading,
    hasError,
    searchQuery,
    setSearchQuery,
  };
};
