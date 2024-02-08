'use client'

// 都道府県の一覧、グラフを表示する用のコンポーネント

import styles from './main-area.module.css';

import { GraphValue, Prefecture } from '@/app/type/resas-api-type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import PrefecturesTitleArea from '../molecules/prefectures-title-area';
import SelectBox from "../molecules/selectbox";
import MainGraphArea from './main-graph-area';

import { initOption, replaceGraphTitle } from '@/app/utils/graph-options';
import * as Highcharts from 'highcharts';
import SelectType from '../atoms/select-type';
import Title from '../atoms/title';

export default function MainArea() {
  const router = useRouter();
  // 都道府県の一覧を格納
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  // 選択されたグラフ種別を格納
  const [graphType, setGraphType] = useState<string>('population');
  // グラフ表示用の値を格納
  const [options, setOptions] = useState<Highcharts.Options>(initOption);
  const [graphValues, setGraphValues] = useState<GraphValue[]>([]);
  const [series, setSeries] = useState<Highcharts.SeriesOptionsType[]>([]);

  // 初期描画からグラフを外す
  const [isCheckedPrefecture, setIsCheckedPrefecture] = useState(false);

  // チェックボックスがクリックされた際に都道府県の引数に渡された種類のグラフ表示のための値を取得
  const onClickCheckBox = (prefecture: Prefecture, graphType: string) => {

    // useState内のchecked状態を更新
    const newPrefectures: Prefecture[] = prefectures;
    const index = newPrefectures.findIndex(item => item.prefName === prefecture.prefName)
    newPrefectures[index].checked = !newPrefectures[index].checked;
    setPrefectures(newPrefectures);

    // チェックボックスに入力した値がtrueならグラフ用データを追加、falseなら削除
    if (newPrefectures[index].checked) {
      // 指定された都道府県のグラフ表示用データ取得
      const getSelectPrefecture = async () => {
        const res = await fetch(`/api/select-prefecture?prefCode=${prefecture.prefCode}`)
        const jsonData = await res.json();
        const values: GraphValue[] = graphValues;
        const result: GraphValue = {
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
          data: jsonData.data.data
        }
        values.push(result);
        setGraphValues(values)

        const newSeries = series;
        const seriesNumber: number[] = []
        result.data.find((val) => val.label === replaceGraphTitle(graphType))!.data.map(item => seriesNumber.push(item.value))

        const item: Highcharts.SeriesOptionsType = {
          type: 'line',
          name: prefecture.prefName,
          data: seriesNumber
        }

        newSeries.push(item);
        setSeries(newSeries);

        // グラフ表示用のオプション更新
        const newOptions = options;
        if (newOptions) {
          newOptions.title!.text = replaceGraphTitle(graphType);
          newOptions.series = newSeries;
        }
        setOptions(newOptions);

        // グラフ表示
        if (!isCheckedPrefecture) {
          setIsCheckedPrefecture(true);
        }
        router.refresh();
      };
      getSelectPrefecture();

    } else {
      // 指定された都道府県のデータをグラフから削除
      const value: GraphValue[] = graphValues;
      const index = value.findIndex(item => item.prefCode === prefecture.prefCode)
      value.splice(index, 1);
      setGraphValues(value)

      // グラフ表示用のオプション更新
      const newSeries = series;
      const seriesIndex = series.findIndex(item => item.name === prefecture.prefName)
      newSeries.splice(seriesIndex, 1);
      setSeries(newSeries);

      const newOptions = options;
      // const optionIndex = newOptions.series?.findIndex(item => item.name === prefecture.prefName)
      // newOptions.series?.splice(optionIndex!, 1);
      newOptions.series = newSeries;
      setOptions(newOptions);
      router.refresh();
    }
  }

  // 表示グラフの種別変更
  const onChangeGraphType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 既存グラフオプションを削除
    const newOptions = options;
    newOptions.series = []

    // 選択された種別のオプションで書き換え
    graphValues.map(value => {
      const seriesNumber: number[] = []
      value.data.find((val) => val.label === replaceGraphTitle(e.target.value))!.data.map(item => seriesNumber.push(item.value))
      newOptions.title!.text = replaceGraphTitle(e.target.value);
      newOptions.series!.push({
        type: 'line',
        name: value.prefName,
        data: seriesNumber
      })
    })
    setOptions(newOptions);

    // グラフ種別をステートに保存
    setGraphType(e.target.value);

    router.refresh();
  }

  // 初期描画
  useEffect(() => {
    // RESAS APIから都道府県の一覧を取得
    const getAllPrefectures = async () => {
      const res = await fetch('/api/prefectures');
      const result = await res.json();
      if (!result) return
      result.data.map((item: Prefecture) => {
        item.checked = false
      })
      setPrefectures(result.data)
    }
    getAllPrefectures();
  }, []);

  return (
    <>
      <section className={styles.selectArea}>
        <div className={styles.mainHeaderArea}>
          <PrefecturesTitleArea />
          <div className={styles.selectTypebox}>
            <Title size="sm">グラフ種別：</Title>
            <SelectType onChange={(e) => onChangeGraphType(e)} />
          </div>
        </div>
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
        {isCheckedPrefecture && <MainGraphArea options={options} />}
      </section>
    </>
  )
}