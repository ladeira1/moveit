import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json' 
import LevelUpModal from '../components/LevelUpModal'

interface Challenge {
  type: 'eye' | 'body'
  description: string
  amount: number
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  experience: number
  completedChallenges: number
}

interface ChallengesContextData {
  level: number
  experience: number
  remainingExperience: number
  completedChallenges: number
  activeChallenge: Challenge
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
}

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData)

const ChallengesProvider = ({ children, ...rest }: ChallengesProviderProps) => {
  const [level, setLevel] = useState(rest.level?? 1)
  const [experience, setExperience] = useState(rest.experience?? 0)
  const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const levelUp = () => {
    setLevel(currentLevel => currentLevel + 1)
    setIsLevelUpModalOpen(true)
  }

  const startNewChallenge = () => {
    const randomChalengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChalengeIndex]

    setActiveChallenge(challenge)
    
    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  const resetChallenge = () => {
    setActiveChallenge(null)
  }

  const completeChallenge = () => {
    if(!activeChallenge) return

    const { amount } = activeChallenge
    let finalExperience = experience + amount

    if(finalExperience >= remainingExperience) {
      finalExperience -= remainingExperience
      levelUp()
    }

    setExperience(finalExperience)
    setActiveChallenge(null)
    setCompletedChallenges(currentCompletedChallenges => currentCompletedChallenges + 1)
  }

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('experience', String(experience))
    Cookies.set('completedChallenges', String(completedChallenges))
  }, [level, experience, completedChallenges])

  const remainingExperience = Math.pow((level + 1) * 4, 2)
  
  return (
    <ChallengesContext.Provider value={{ 
      level, 
      experience, 
      remainingExperience,
      completedChallenges,
      activeChallenge,
      levelUp, 
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}

export default ChallengesProvider
