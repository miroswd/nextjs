import { useRouter } from "next/router"

export default function Product() {
  const router = useRouter();

  return(
    <h1>Product: {router.query.slug}</h1>
  )
}