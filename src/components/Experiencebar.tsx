import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar = () => {
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width: '60%'}} />
        <span className={styles.currentExperience} style={{left: '50%'}}>
          300 xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  )
}

export default ExperienceBar