import type { NextPage } from 'next'
import { Container } from '@components/ui'
import Image from 'next/image'
import style from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Container>
      <div className={style.image}>
        <Image src="/MyProfileImage.jpeg" alt="my profile image" layout="fill" objectFit="cover" />
      </div>
    </Container>
  )
}

export default Home
