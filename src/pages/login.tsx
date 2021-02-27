import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks/userUser'
import styles from '../styles/pages/Login.module.css'

interface LoginProps {
  user: string | null
}

const Login = ({ user }: LoginProps) => {
  const { searchForGithubUser } = useUser()
  const router = useRouter()

  const [githubUsername, setGithubUsername] = useState('')

  const login = async () => {
    await searchForGithubUser(githubUsername)
    router.push('/')
  }

  useEffect(() => {
    if(user) {
      router.push('/')
    }
  }, [])

  return (
    <div className={styles.container}>
      <img src="simbolo.png" alt="Favicon" />
      <section className={styles.content}>
        <div className={styles.form}>
          <img src="logo-full.svg" alt="Logo" />
          <h1>Bem-vindo</h1>
          <div className={styles.subtitle}>
            <img src="/icons/github.svg" alt="Github Icon" />
            <p>Faça login com seu Github para começar</p>
          </div>
          <label htmlFor="githubUser">
            <input 
              type="text" 
              value={githubUsername} 
              onChange={e => setGithubUsername(e.target.value)}
              placeholder="Digite seu username"
            />
            <img 
              onClick={login}
              className={githubUsername? styles.available : styles.unavailable}
              src="/icons/arrow-right.svg" 
              alt="Confirmar" 
            />
          </label>
        </div>
      </section>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = context.req.cookies;

  return {
    props: {
     user: user? user : null,
    }
  }
}