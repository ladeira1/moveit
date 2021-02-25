import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json' 

interface Challenge {
  type: 'eye' | 'body'
  description: string
  amount: number
}

interface ChallengesProviderProps {
  children: ReactNode
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
}

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData)

const ChallengesProvider: React.FC<ChallengesProviderProps> = ({ children }) => {
  const [level, setLevel] = useState(1)
  const [experience, setExperience] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const levelUp = () => {
    setLevel(currentLevel => currentLevel + 1)
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

  useEffect(() => {
    Notification.requestPermission()
  }, [])

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
        completeChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}

export default ChallengesProvider
