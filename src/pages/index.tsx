import SEO from "@/components/SEO";
import { Title } from "@/styles/pages/Home";
import { GetServerSideProps } from "next";

// import math from "../lib/math"

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

  async function handleSum(){
    // load lib only when needed
    const { sum } = (await import('@/lib/math')).default;

    alert(sum(5, 4))

    console.log("NEXT_PUBLIC:", process.env.NEXT_PUBLIC_API_URL)
    console.log("API_URL:", process.env.API_URL)

  }


  return (
    <div>
      <SEO 
        image="banner.jpeg"
        title="DevCommerce - your best e-commerce"
        shouldExcludeTitleSuffix
      />

      <Title>Products</Title>

      {recommendedProducts.map(recommendedProduct => (
        <li key={recommendedProduct.id}>
          {recommendedProduct.title}
        </li>
      ))}


      <button onClick={handleSum}>
        Sum!
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

 // TTFB:2s -> Time To First Byte: 2 seconds (delay to show content)

 const response = await fetch(`${process.env.API_URL}/recommended`)
 const recommendedProducts = await response.json();

 return {
  props: {
    recommendedProducts
  }
 }

}