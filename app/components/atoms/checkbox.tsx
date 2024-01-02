// チェックボタン用コンポーネント
export default function CheckBox({
  checked = false
}: {
  checked: boolean
}) {
  return (
    <input type="checkbox" className="checkBox" checked={checked} />
  )
}