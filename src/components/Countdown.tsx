import { useEffect, useState } from 'react'
import styles from '../styles/components/Countdown.module.css'

const Countdown = () => {
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  const startCountdown = () => {
    setIsActive(true)
  }

  useEffect(() => {
    if(isActive && time > 0) {
      setTimeout(() => setTime(currentTime => currentTime - 1), 1000)
    }
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

      <button 
        type="button" 
        className={styles.countdownButton}
        onClick = {startCountdown}
      >
        Iniciar um ciclo
      </button>
    </>
  )
}

export default Countdown