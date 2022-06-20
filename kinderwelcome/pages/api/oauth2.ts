import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface IAuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface IUserInfoResponse {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? "";
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? "";
const GOOGLE_ACCESS_TOKEN_ENDPOINT =
  process.env.GOOGLE_ACCESS_TOKEN_ENDPOINT ?? "";
const GOOGLE_USER_INFO_ENDPOINT = process.env.GOOGLE_USER_INFO_ENDPOINT ?? "";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const queryParams = {
    code: req.query.code,
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    client_secret: GOOGLE_CLIENT_SECRET,
    grant_type: "authorization_code",
  };

  try {
    const accessTokenRes: AxiosResponse<IAuthResponse> = await axios({
      method: "post",
      url: GOOGLE_ACCESS_TOKEN_ENDPOINT,
      params: queryParams,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, scope, expires_in, token_type } = accessTokenRes.data;

    const userInfoRes = await axios.get<IUserInfoResponse>(
      GOOGLE_USER_INFO_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log({ userInfoRes: userInfoRes.data });
  } catch (e) {
    console.log(e);
  }

  res.statusCode = 200;
  res.writeHead(301, { Location: "/" });

  res.end();
};
