import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const slug = router.query.slug;
	console.log(router)
  return (
		<div>
			<p>Post: {slug}</p>
			[router]
		</div>
	)
};

export default Post;