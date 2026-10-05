import '../src/index.css'
import '../src/App.css'

// Next.js consumes this export as route metadata; it is not a component.
// oxlint-disable-next-line react/only-export-components
export const metadata = {
  title: 'Limit | Interactive climate simulator',
  description: 'Explore climate emergency responses and test educational policy scenarios for a warming world.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
