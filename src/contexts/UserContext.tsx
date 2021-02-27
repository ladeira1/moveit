import axios from 'axios'
import Cookies from 'js-cookie'
import { createContext, ReactNode, useEffect, useState } from 'react'

interface UserContextData {
  name: string
  image: string
  searchForGithubUser: (username: string) => Promise<void>
  logout: () => void
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')


  const searchForGithubUser = async (username: string) => {
    const response = await axios.get(`https://api.github.com/users/${username}`)
   
    if(response.status === 200) {
      setName(response.data.name)
      setImage(response.data.avatar_url)
      Cookies.set('user', username)
    }
  }

  const logout = () => {
    Cookies.remove('user')
    setName('')
    setImage('')
  }

  return (
    <UserContext.Provider value ={{
      name,
      image,
      searchForGithubUser,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider