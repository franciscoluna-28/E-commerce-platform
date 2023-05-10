import { useState } from "react";
import { useProductStore } from "../store/products";

//TODO Improve the hooks here
// Probably turning all of this into some sort of useReducer, maybe
export default function AddProductForm() {
  const { addProduct } = useProductStore();
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = { name, imageURL, category, price };

    // TODO Optimize this logic PLEASE
    try {
      addProduct(product);
      setMessage("Product added successfully!");
    } catch (error) {
      console.log(error);
      setMessage("Failed to add product.");
    }

    setName("");
    setImageURL("");
    setCategory("");
    setPrice("");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = parseFloat(e.target.value);
    setPrice(isNaN(priceValue) ? "" : priceValue);
  };


  // TODO Assign types here
  return (
    <>
      <form className="flex justify-center m-auto" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            className="border-red-500"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={handlePriceChange} />
        </label>
        <br />
        <button type="submit">Add Product</button>
        {message && <div>{message}</div>}
        <p>UWU</p>
      </form>
    </>
  );
}
