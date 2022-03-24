import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ShortenedResponse } from "../../types/ShortenedResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShortenedResponse | any>
) {
  try {
    if (req.method === "POST") {
      const endpoint = process.env.API_ENDPOINT || "";
      const { url } = req.body;

      const response = await axios.post<ShortenedResponse>(endpoint, { url });

      res.send(response.data);
    } else {
      res.status(400).send("Method not allowed");
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500);
  }
}
