'use client'

// 都道府県の一覧、グラフを表示する用のコンポーネント

import styles from './main-area.module.css'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import SelectBox from "../molecules/selectbox";
import axios from "axios";
import PrefecturesTitleArea from '../molecules/prefectures-title-area';
import MainGraphArea from './main-graph-area';
import { GraphValue } from '@/app/type/resas-api-type';

type Prefecture = {
  prefCode: number;
  prefName: string;
  checked: boolean;
  graphValue?: any;
}

type GraphType = 'population' | 'newAgeCount' | 'middleAgeCount' | 'oldAgeCount';

export default function MainArea() {
  const router = useRouter();
  // 都道府県の一覧を格納
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  // 選択されたグラフ種別を格納
  const [graphType, setGraphType] = useState<GraphType>('population');
  // グラフ表示用の値を格納
  const [graphValue, setGraphValue] = useState<GraphValue[]>([]);

  // 



  // チェックボックスがクリックされた際に都道府県の引数に渡された種類のグラフ表示のための値を取得
  const onClickCheckBox = (prefecture: Prefecture, graphType: GraphType) => {
    // useState内のchecked状態を更新
    const newPrefectures: Prefecture[] = prefectures;
    const index = newPrefectures.findIndex(item => item.prefName === prefecture.prefName)
    newPrefectures[index].checked = !newPrefectures[index].checked;
    console.log(newPrefectures);
    setPrefectures(newPrefectures);

    // チェックボックスに入力した値がtrueならグラフ用データを追加、falseなら削除
    if (newPrefectures[index].checked) {
      // 指定された都道府県のグラフ表示用データ取得
      axios.get(`${process.env.NEXT_PUBLIC_URL}/api/v1/population/composition/perYear?prefCode=${prefecture.prefCode}&cityCode=-`, {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_APIKEY
        }
      })
        .then((res) => {
          const value: GraphValue[] = graphValue;
          const result: GraphValue = res.data.result.data;
          result.prefCode = prefecture.prefCode;
          value.push(result);
          console.log(value);
          setGraphValue(value)
        })
    } else {
      const value: GraphValue[] = graphValue;
      const index = value.findIndex(item => item.prefCode === prefecture.prefCode)
      value.splice(index, 1);
      console.log(value);
      setGraphValue(value)
    }
    router.refresh();
  }

  useEffect(() => {
    // RESAS APIから都道府県の一覧を取得
    axios.get(`${process.env.NEXT_PUBLIC_URL}/api/v1/prefectures`, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_APIKEY
      }
    })
      .then((res) => {
        const result = res.data.result
        if (!result) return
        result.map((item: Prefecture) => {
          item.checked = false
        })
        setPrefectures(result)
      })
      .catch((error) => { })
  }, []);
  return (
    <>
      <section className={styles.selectArea}>
        <PrefecturesTitleArea />
        <ul className={styles.selectAreaList}>
          {prefectures.length > 0 && prefectures.map((prefecture) => (
            <li key={prefecture.prefCode}
              className={styles.prefectureItem}
              onClick={() => onClickCheckBox(prefecture, graphType)}
            >
              <SelectBox checked={prefecture.checked}>{prefecture.prefName}</SelectBox>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.graphArea}>
        <MainGraphArea graphType={graphType} graphValue={graphValue} />
      </section>
    </>
  )
}