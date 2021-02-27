import Head from 'next/head'
import { GetServerSideProps } from 'next'

import ChallengeBox from '../components/ChallengeBox'
import CompletedChallenges from '../components/CompletedChallenges'
import Countdown from '../components/Countdown'
import ExperienceBar from'../components/Experiencebar'
import Profile from '../components/Profile'

import styles from '../styles/pages/Home.module.css'

import ChallengesProvider from '../contexts/ChallengesContext'
import CountdownProvider from '../contexts/CountdownContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/userUser'

interface HomeProps {
  user: string | null
  level: number
  experience: number
  completedChallenges: number
}

export default function Home({ user, level, experience, completedChallenges }: HomeProps) {
  const { searchForGithubUser } = useUser()
  const router = useRouter()


  const validateUser = async () => {
    if(!user) {
      router.push('/login')
    }

    await searchForGithubUser(user)
  }

  useEffect(() => {
    validateUser()
  }, [])

  return (
    <ChallengesProvider 
      level={level}
      experience={experience}
      completedChallenges={completedChallenges}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
        
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, level, experience, completedChallenges } = context.req.cookies;

  return {
    props: {
      user: user? user : null,
      level: Number(level),
      experience: Number(experience),
      completedChallenges: Number(completedChallenges),
    }
  }
}