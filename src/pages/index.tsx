import { useEffect, useState } from "react"
import { Title } from "../styles/pages/Home"
import { GetServerSideProps } from "next";


interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}


export default function Home({ recommendedProducts }: HomeProps) {
  /*
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  // when it doesn't need to be indexed for search engines
  useEffect(() => {
    fetch("http://localhost:3333/recommended").then(response => {
      response.json().then(data => {
        setRecommendedProducts(data)
      })
    })
  }, []);
  */

  return (
    <div>
      <Title>Products</Title>

      {recommendedProducts.map(recommendedProduct => (
        <li key={recommendedProduct.id}>
          {recommendedProduct.title}
        </li>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

 // TTFB:2s -> Time To First Byte: 2 seconds (delay to show content)

 const response = await fetch("http://localhost:3333/recommended")
 const recommendedProducts = await response.json();

 return {
  props: {
    recommendedProducts
  }
 }

}