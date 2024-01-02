"use client";
import axios from "axios";
import { Prefectures } from "../type/resas-api-type";

// RESAS APIから都道府県の一覧を取得
export const getAllPrefectures = (): Prefectures[] | any => {
  let prefectures: Prefectures[];
  axios
    .get(`${process.env.NEXT_PUBLIC_URL}/api/v1/prefectures`, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_APIKEY,
      },
    })
    .then((res) => {
      console.log(res);
      prefectures = res.data.result;
      console.log(prefectures);

      return prefectures;
    });
};
