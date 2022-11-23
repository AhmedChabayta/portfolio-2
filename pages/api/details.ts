// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity/sanity';
import { Personal } from '../../types/typings';

const query = groq`
*[_type=="personal"]{
  name,
  email,
  address,
  images,
  phoneNumber,
  title,
  "project": *[_type=='project']{
  description,
  image,
  linkToBuild,
  technologies,
  title,
},
  "skill": *[_type=='skill']{
  image,
  progress,
  title
  ,},
  "social": *[_type=='social']{
  title, url}
}
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const data: Personal[] = await sanityClient.fetch(query);
    res.status(200).json({ data });
  }
}
