import { useChallenge } from '../hooks/useChallenge'
import styles from '../styles/components/Profile.module.css'

const Profile = () => {
  const { level } = useChallenge()

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/ladeira1.png" alt="user" />
      <div>
        <strong>Joao Ladeira</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile