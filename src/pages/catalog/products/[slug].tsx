import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  slug: string;
}



interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps  {
  products: IProduct[]
}


export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  return(
    <div>
      <h1>{router.query.slug}</h1>
      
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>

    </div>
  )
}

// generating static page to dynamic page
export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch(`http://localhost:3333/categories`)
  const categories : { id: string }[] = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id }
    }
  })

  return {
    paths, // which are the categories
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {

  const { slug } = context.params as Params;
  
  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`)
  const products = await response.json();
 
  return {
    props: {
      products
    },
    revalidate: 5 // seconds
  }

}