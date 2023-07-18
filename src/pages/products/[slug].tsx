// import AddToCartModel from "@/src/components/AddToCartModel";
import { client } from "@/lib/prismic";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import Prismic from "prismic-javascript";
import PrismicDom from "prismic-dom";
import Link from "next/link";
import { Document } from "prismic-javascript/types/documents";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";

interface Params extends ParsedUrlQuery {
  slug: string;
}


interface ProductProps  {
  product: Document
}


const AddToCartModel = dynamic(
  () => import("@/components/AddToCartModel"), 
  { loading: () => <p>Carregando...</p> }
);


export default function Product({product}: ProductProps){
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>
  }


  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true)
  }


  return (
    <div>
      <h1>{PrismicDom.RichText.asText(product.data.title)}</h1>


      {/* convert to html */}
  
      <div dangerouslySetInnerHTML={{__html: PrismicDom.RichText.asHtml(product.data.description)}}></div>
  
      <p>Price: ${product.data.price}</p>

      <img src={product.data.thumbnail.url} width="400" alt="product"/>

      <button onClick={handleAddToCart}>
        Add to cart
      </button>

      {
        isAddToCartModalVisible && <AddToCartModel />
      }
    </div>
  );
}



// users generate static page to dynamic page as they access the pages
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // which are the categories
    fallback: true // when the first user call the new route will be generated the static page
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params as Params;

  const product = await client().getByUID('product', String(slug), {});

 
  return {
    props: {
      product
    },
    revalidate: 5 // seconds
  }

}