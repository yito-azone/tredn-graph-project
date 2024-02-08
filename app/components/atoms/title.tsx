// タイトル用コンポーネント

type Props = {
  children: React.ReactNode;
  size: "lg" | "md" | "sm";
};

export default function Title(props: Props) {
  const { children, size } = props;
  return (
    <div
      className={`${
        size === "lg" ? "titleLg" : size === "md" ? "titleMd" : "titleSm"
      }`}
    >
      {children}
    </div>
  );
}
