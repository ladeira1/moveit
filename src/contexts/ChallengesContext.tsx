import { createContext, ReactNode, useState } from 'react'
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
  }

  const resetChallenge = () => {
    setActiveChallenge(null)
  }

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
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}

export default ChallengesProvider
