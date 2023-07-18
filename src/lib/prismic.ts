// Settings to connect with prismic api
import Prismic from "prismic-javascript"

export const apiEndpoint = process.env.PRISMIC_API;

export const client = (req = null) => {

  const options  = req ? { req } : null;

  return Prismic.client(apiEndpoint, options)
}