import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    res.json({ access_token: accessToken });
  } catch (error: any) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});