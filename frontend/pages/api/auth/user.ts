import { NextApiRequest, NextApiResponse } from "next";

import axios, { AxiosError } from "axios";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie || "");

    const access = cookies.access || false;

    if (!access) {
      return res.status(401).json({
        message: "Login first to load user",
      });
    }

    try {
      const response = await axios.get(`${process.env.API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.data) {
        return res.status(200).json({
          user: response.data,
        });
      }
    } catch (error) {
      const err = error as AxiosError
        if(err.response){
          res.status(err.response.status).json({
            error: "Something went wrong while retrieving user",
          });
        }
    }
  }
};
