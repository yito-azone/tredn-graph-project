import axios from "axios";

import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const prefCode = searchParams.get("prefCode");

  const res = await axios.get(
    `${process.env.APIURL}/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.APIKEY,
      },
    }
  );
  const data = await res.data.result;
  return NextResponse.json({
    data,
  });
}
