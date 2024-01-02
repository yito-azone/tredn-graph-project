// 都道府県のタイトルエリア用コンポーネント
import styles from './prefectures-title-area.module.css'

import Title from "../atoms/title";

export default function PrefecturesTitleArea() {
  return (
    <div className={styles.titleArea}>
      <Title size="titleMd">都道府県</Title>
    </div>
  )
}