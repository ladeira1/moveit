import styles from '../styles/components/Countdown.module.css'

import { useCountdown } from '../hooks/useCountdown'


const Countdown = () => {
  const { 
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown 
  } = useCountdown()

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

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
              onClick = {resetCountdown}
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