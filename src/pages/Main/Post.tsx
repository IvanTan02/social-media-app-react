import { Post as PostInterface } from './Home';
import { addDoc, getDocs, deleteDoc, collection, query, where, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
  post: PostInterface;
}

interface Like {
  id: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesCollection = collection(db, 'likes');

  const likesDoc = query(likesCollection, where('postId', '==', post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userWhoLiked, id: doc.id })));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesCollection, { userWhoLiked: user?.uid, postId: post.id });
      if (user)
        setLikes((likes) =>
          likes
            ? [...likes, { userId: user?.uid, id: newDoc.id }]
            : [{ userId: user?.uid, id: newDoc.id }]
        );
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const docToDelete = query(
        likesCollection,
        where('postId', '==', post.id),
        where('userWhoLiked', '==', user?.uid)
      );
      const likeDoc = await getDocs(docToDelete);
      const likeId = likeDoc.docs[0].id;
      const toDelete = doc(db, 'likes', likeId);
      await deleteDoc(toDelete);
      if (user) setLikes((likes) => likes && likes.filter((like) => like.id !== likeId));
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="post-header">
        <h2>{post.title}</h2>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
      </div>
      <div className="post-body">
        <p>{post.description}</p>
        {likes && <p>Likes: {likes.length}</p>}
      </div>
      <div className="post-author">
        <p>@{post.username}</p>
      </div>
    </div>
  );
};
