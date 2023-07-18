// import AddToCartModel from "@/src/components/AddToCartModel";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";


const AddToCartModel = dynamic(
  () => import("@/components/AddToCartModel"), 
  { loading: () => <p>Carregando...</p> }
);


export default function Product(){

  const router = useRouter();

  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true)
  }


  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>
        Add to cart
      </button>

      {
        isAddToCartModalVisible && <AddToCartModel />
      }
    </div>
  );
}