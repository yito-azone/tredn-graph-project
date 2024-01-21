import axios from "axios";

import { NextResponse } from "next/server";

export async function GET() {
  const res = await axios.get(`${process.env.APIURL}/api/v1/prefectures`, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.APIKEY,
    },
  });
  const data = await res.data.result;
  return NextResponse.json({
    data,
  });
}
