import { useEffect, useState } from 'react'
import styles from '../styles/components/Countdown.module.css'

import { useChallenge } from '../hooks/useChallenge'

let timer: NodeJS.Timer;

const Countdown = () => {
  const { startNewChallenge } = useChallenge()

  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [initialTime, setInitialTime] = useState<number | null>(null)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
  const cronometerMinutes = 25 * 60 + 1

  const startCountdown = () => {
    setIsActive(true)
    setInitialTime(Date.now())
  }

  const stopCountdown = () => {
    setIsActive(false)
    setTime(25 * 60)
    window.clearTimeout(timer)
  }

  useEffect(() => {
    if(isActive && time > 0 && initialTime) {
      timer = setTimeout(() => {
        setTime(cronometerMinutes - Math.floor((Date.now()) - initialTime) / 1000)
      }, 1000)
    } else if(isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }

    return () => window.clearTimeout(timer) 
  }, [isActive, time]) 

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
          <img 
            style={{marginLeft: '5px'}}
            src="icons/check.svg" 
            alt="Check" 
          />
        </button>
      ) : (
        <>
          {isActive? (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick = {stopCountdown}
            >
              Abandonar ciclo
            </button>
            ) :(
            <button 
              type="button" 
              className={styles.countdownButton}
              onClick = {startCountdown}
            >
              Iniciar um ciclo
            </button>
            )
          }
        </>
      )}

      
    </>
  )
}

export default Countdown