// タイトル用コンポーネント

type Props = {
  children: React.ReactNode;
  size: 'titleLg' | 'titleMd' | 'titleSm'
}

export default function Title(props: Props) {
  const { children, size } = props;
  return <div className={size}>{children}</div>
}