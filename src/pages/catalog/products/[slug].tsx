import { client } from "@/lib/prismic";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring";
import Prismic from "prismic-javascript";
import PrismicDom from "prismic-dom";
import Link from "next/link";
import { Document } from "prismic-javascript/types/documents";

interface Params extends ParsedUrlQuery {
  slug: string;
}



interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps  {
  category: Document;
  products: Document[]
}


export default function Category({ products, category }: CategoryProps) {
  const router = useRouter();


  if (router.isFallback) {
    // indicates whether the page is in the process of static rendering
    return <p>Carregamento...</p>
  }

  return(
    <div>
      <h1>{PrismicDom.RichText.asText(category.data.title)}</h1>
      
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/products/${product.uid}`}>
            {PrismicDom.RichText.asText(product.data.title)}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  )
}

// generating static page to dynamic page
export const getStaticPaths: GetStaticPaths = async () => {

  // const response = await fetch(`http://localhost:3333/categories`)
  // const categories : { id: string }[] = await response.json();


  const categories = await client().query([
    Prismic.Predicates.at("document.type", "category")
  ]);

  const paths = categories.results.map(category => {
    return {
      params: { slug: category.uid }
    }
  })

  return {
    paths, // which are the categories
    fallback: true // when the first user call the new route will be generated the static page
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params as Params;

  const category = await client().getByUID('category', String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.at("my.product.category", category.id)
  ]);
  
  // const response = await fetch(`http://localhost:3333/products?category_id=${slug}`)
  // const products = await response.json();
 
  return {
    props: {
      category,
      products: products.results
    },
    revalidate: 60 // seconds
  }

}