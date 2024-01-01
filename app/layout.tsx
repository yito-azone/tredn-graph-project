import './globals.css'

export const metadata = {
  title: '都道府県別の総人口推移グラフ',
  description: '都道府県別の総人口推移グラフを表示するSPA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
