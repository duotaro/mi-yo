import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <main className='bg-black antialiased' style={{ 
      backgroundImage: 'url(/image/top-bg.png)', 
      backgroundSize: 'contain'
    }}>{children}</main>
    </>
  )
}