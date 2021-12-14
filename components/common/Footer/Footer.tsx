import { FC } from 'react'
import { SocialProfileJsonLd } from 'next-seo'
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons'
import style from './Footer.module.css'

const Footer: FC = () => {
	const transitionToGithub = () => {
		window.open('https://github.com/yuto-tomita', '_blank')
	}

	const transitionToTwitter = () => {
		window.open('https://twitter.com/qualidea04')
	}

	return (
  <>
    <div className={style.footerContainer}>
      <div className={style.icons}>
        <div onClick={transitionToGithub}>
          <GithubOutlined className={style.githubIcon} />
        </div>
        <div onClick={transitionToTwitter}>
          <TwitterOutlined className={style.twitterIcon} />
        </div>
      </div>
      <p className={style.creator}>
        created_by: yuto-tomita
      </p>
    </div>
    <SocialProfileJsonLd
      type="Person"
      name="冨田 優斗"
      url="https://nextjs-personal-blog-elqgxu4dl-tommy-personal-blog.vercel.app/"
      sameAs={[
					'https://twitter.com/qualidea04',
					'https://github.com/yuto-tomita'
				]}
    />
  </>
	)
}

export default Footer