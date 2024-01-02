// チェックボックス + タイトル 用コンポーネント

import styles from './selectbox.module.css'

import CheckBox from "../atoms/checkbox";
import Title from "../atoms/title";

export default function SelectBox({
  children,
  checked = false
}: {
  children: React.ReactNode,
  checked: boolean
}) {
  return (
    <div className={styles.selectbox}>
      <CheckBox checked={checked} />
      <Title size="titleSm">{children}</Title>
    </div>
  )
}