import { useChallenge } from '../hooks/useChallenge'
import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar = () => {
  const { experience, remainingExperience } = useChallenge()
  const percentageExperience = Math.round(experience * 100) / remainingExperience

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width: `${percentageExperience}%`}} />
        <span className={styles.currentExperience} style={{left: '50%'}}>
         {experience} xp
        </span>
      </div>
      <span>{remainingExperience} xp</span>
    </header>
  )
}

export default ExperienceBar