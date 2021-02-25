import { useChallenge } from '../hooks/useChallenge'
import { useCountdown } from '../hooks/useCountdown'
import styles from '../styles/components/ChallengeBox.module.css'


const ActiveChallengeBox = ({ activeChallenge }) => {
  const { resetChallenge, completeChallenge } = useChallenge()
  const { resetCountdown } = useCountdown()

  const handleChallengeSucceeded = () => {
    completeChallenge()
    resetCountdown()
  }

  const handleChallengeFailed = () => {
    resetChallenge()
    resetCountdown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      <div className={styles.challengeActive}>
        <header>Ganhe {activeChallenge?.amount}xp</header>
        <main>
          <img src={`icons/${activeChallenge?.type}.svg`} alt="Body"/>
          <strong>Novo desafio</strong>
          <p>Levante e faça uma caminhada de 3 minutos.</p>
        </main>
        <footer>
          <button 
            type="button"
            className={styles.challengeFailedButton}
            onClick={handleChallengeFailed}
          >
            Falhei
          </button>
          <button 
            type="button"
            className={styles.challengeSucceededButton}
            onClick={handleChallengeSucceeded}
          >
            Completei
          </button>
        </footer>
      </div>
    </div>
  )
}


const InactiveChallengeBox = () => (
  <div className={styles.challengeBoxContainer}>
    <div className={styles.challengeNotActive}>
      <strong>Finalize um ciclo para receber um desafio</strong>
      <p>
        <img src="icons/level-up.svg" alt="Level up" style={{height: '40px'}}/>
        <span>Avance de nível completando desafios.</span>
      </p>
    </div>
  </div>
)


const ChallengeBox = () => {
  const { activeChallenge } = useChallenge()

  return activeChallenge? 
    <ActiveChallengeBox activeChallenge={activeChallenge} /> 
    : 
    <InactiveChallengeBox />
}

export default ChallengeBox