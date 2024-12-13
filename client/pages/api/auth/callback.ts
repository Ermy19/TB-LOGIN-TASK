import { handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res);
  } catch (error) {
    const err = error as { status?: number; code?: string; message: string };
    res.status(err.status || 500).json({
      code: err.code,
      error: err.message
    });
  }
}