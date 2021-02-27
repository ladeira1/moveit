import UserContext from '../contexts/UserContext'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserContext>
      <Component {...pageProps} />
    </UserContext>
  )
}

export default MyApp


