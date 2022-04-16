import { NextApiRequest, NextApiResponse } from "next";
import { sampleUserData } from "../../../utils/sample-data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json([])
      return;
    case 'POST':
      res.status(201).json({})
      return;
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
};

export default handler;
