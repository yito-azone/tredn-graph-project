// グラフ種別選択用コンポーネント

import { graphTypes } from '@/app/utils/graph-options';

export default function SelectType({
  onChange
}: {
  readonly onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <select onChange={e => onChange(e)}>
      {graphTypes.map(graphType => (
        <option
          key={graphType.type}
          value={graphType.type}
        >
          {graphType.name}
        </option>
      ))}
    </select>
  )
}

