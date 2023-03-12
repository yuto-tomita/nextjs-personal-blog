import React from 'react'
import { Text } from '@components/ui'
import { NextSeo } from 'next-seo'
import { profileMessage } from '@lib/constant/ProfileMessage'
import Image from 'next/image'

const Home = () => {
  const texts = profileMessage.split(/(\n)/).map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item.match(/\n/) ? <br /> : item}
      </React.Fragment>
    )
  })

  return (
    <>
      <NextSeo description={profileMessage} />

      <div className="w-6/12 m-auto mt-10">
        <div className="rounded-full overflow-hidden w-40 h-40 relative">
          <Image
            src="/MyProfileImage.jpg"
            alt="my profile image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <Text variant="title" className="mt-10">
          <span className="border-b border-stone-400">
            Profile
          </span>
        </Text>

        <Text variant="text" className="mt-6 w-5/6">
          {texts}
        </Text>
      </div>

      <div className="w-6/12 m-auto mt-10 pb-10">
        <Text variant="title">
          <span className="border-b border-stone-400">
            SNS
          </span>
        </Text>
        <div className="flex flex-col mt-6 gap-2">
          <a href="https://github.com/yuto-tomita">
            Github
          </a>
          <a href="https://twitter.com/qualidea04">
            Twitter
          </a>
          <a href="https://qiita.com/tommy0218">
            Qiita
          </a>
        </div>
      </div>
    </>
  )
}

export default Home
