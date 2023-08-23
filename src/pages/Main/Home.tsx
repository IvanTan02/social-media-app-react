import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { Post } from './Post';

export interface Post {
  id: string;
  title: string;
  description: string;
  userId: string;
  username: string;
}

export const Home = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const postsCollection = collection(db, 'posts');

  const getPosts = async () => {
    const data = await getDocs(postsCollection);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const styles = { marginTop: '5em' };
  return (
    <div style={styles}>
      <h1>Home Page</h1>
      <div>
        {posts?.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};
