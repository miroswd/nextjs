import { useEffect, useState } from "react"
import { Title } from "../styles/pages/Home"


interface IProduct {
  id: string;
  title: string;
}


export default function Home() {

  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  // when it doesn't need to be indexed for search engines
  useEffect(() => {
    fetch("http://localhost:3333/recommended").then(response => {
      response.json().then(data => {
        setRecommendedProducts(data)
      })
    })
  }, [])

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