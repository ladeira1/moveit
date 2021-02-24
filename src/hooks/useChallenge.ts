import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

export const useChallenge = () => useContext(ChallengesContext)