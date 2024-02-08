// ヘッダー用コンポーネント
import styles from "./header.module.css";

import Title from "../atoms/title";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        <Title size="lg">都道府県別の総人口推移グラフ</Title>
      </h1>
    </header>
  );
}
