import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa"
import { useProductStore } from "~/store/products";

// Product type
export interface ProductProps {
  price: number;
  id: number;
  name: string;
  imageURL: string;
}
export interface ProductPropsNotID {
  price: number | string;
  name: string;
  imageURL: string;
}

export default function Product({ price, id, name, imageURL }: ProductProps) {
  const { deleteProduct } = useProductStore();

  function handleProductDelete(id: number){
    deleteProduct(id)
  }


  return (

    // Basic card layout
    // TODO Change the UI design (add the user, enhanced buttons, etc)
    <li key={id}>
    <div className="mx-auto max-w-2xl">
      <div className="max-w-fit rounded-lg border-2 bg-white p-8 shadow-md duration-300 hover:shadow-xl">
        <Image alt="E-Commerce Product" className="max-h-fit rounded-md" width={256} height={256} src={imageURL}/>
        <h3 className="text-projectBlack mt-2 text-left text-4xl font-bold">
          {name}
        </h3>
        <h4 className="text-projectBlack text-left text-2xl">{price}$</h4>
        <button className="bg-blue-500 my-2 flex h-12 w-full items-center justify-center gap-2 rounded-md text-xl font-semibold text-white hover:brightness-90">
          Add to Cart <FaShoppingCart className="text-xl text-white" />
        </button>
        <button onClick={() => handleProductDelete(id)} className="bg-red-500 my-2 flex h-12 w-full items-center justify-center gap-2 rounded-md text-xl font-semibold text-white hover:brightness-90">
          Delete product
        </button>
      </div>
    </div>
    </li>
  );
}
