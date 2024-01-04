import Header from './components/organisms/header'
import './globals.css'
import Favicon from '/public/favicons/favicon.ico';

export const metadata = {
  title: '都道府県別の総人口推移グラフ',
  description: '都道府県別の総人口推移グラフを表示するSPA',
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
