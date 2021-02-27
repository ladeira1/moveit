import { createContext, ReactNode, useEffect, useState } from 'react'
import { useChallenge } from '../hooks/useChallenge'

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

let timer: NodeJS.Timer;

export const CountdownContext = createContext({} as CountdownContextData)

const CountdownProvider: React.FC<CountdownProviderProps> = ({ children }) => {
  const { startNewChallenge } = useChallenge()

  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const startCountdown = () => {
    setIsActive(true)
  }

  const resetCountdown = () => {
    setIsActive(false)
    setTime(25 * 60)
    setHasFinished(false)
    window.clearTimeout(timer)
  }

  useEffect(() => {
    if(isActive && time > 0) {
      timer = setTimeout(() => {
        setTime(currentTime => currentTime - 1)
      }, 1000)
    } else if(isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }

    return () => window.clearTimeout(timer) 
  }, [isActive, time]) 
  
  return (
    <CountdownContext.Provider value ={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}

export default CountdownProvider