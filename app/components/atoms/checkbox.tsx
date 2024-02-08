// チェックボタン用コンポーネント
export const CheckBox = ({ checked = false }: { checked: boolean }) => {
  return <input type="checkbox" className="checkBox" checked={checked} />;
};
