import { useRouter } from 'next/router'
import { useChallenge } from '../hooks/useChallenge'
import { useUser } from '../hooks/userUser'
import styles from '../styles/components/Profile.module.css'

const Profile = () => {
  const routes = useRouter()
  const { level } = useChallenge()
  const { name, image, logout } = useUser()

  const handleLogout = () => {
    logout()
    routes.push('/login')
  }

  return (
    <div className={styles.profileContainer}>
      <img src={image} alt="user" />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
      <button type="button" onClick={handleLogout}>
        <img src="/icons/log-out.svg" alt="Logout" />
      </button>
    </div>
  )
}

export default Profile