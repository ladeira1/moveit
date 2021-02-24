import { useChallenge } from '../hooks/useChallenge'
import styles from '../styles/components/CompletedChallenges.module.css'

const CompletedChallenges = () => {
  const { completedChallenges } = useChallenge()

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{completedChallenges}</span>
    </div>
  )
}

export default CompletedChallenges