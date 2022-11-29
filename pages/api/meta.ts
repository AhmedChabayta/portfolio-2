import { metaQuery } from './../../sanity/query';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../sanity/sanity';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const data: any = await sanityClient.fetch(metaQuery);
    res.status(200).json({ data });
  }
}
