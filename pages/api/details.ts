// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../sanity/query';
import { sanityClient } from '../../sanity/sanity';
import { Personal } from '../../types/typings';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const data: Personal[] = await sanityClient.fetch(query);
    res.status(200).json({ data });
  }
}
