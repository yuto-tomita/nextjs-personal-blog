import { FC } from 'react'
import { SocialProfileJsonLd } from 'next-seo'
import style from './Footer.module.css'

const Footer: FC = () => {
	return (
		<>
			<div className={style.footerContainer}>
				<div className={style.icons}>
					hogehoge
				</div>
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