import { useRouter } from 'next/router';
import App from './index';

const Blog = () => {
  const router = useRouter();
  const { bid } = router.query;
  return <App bid={bid} />;
};

export default Blog;
