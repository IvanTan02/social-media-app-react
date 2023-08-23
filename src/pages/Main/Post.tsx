// REACT
import { Post as PostInterface } from './Home';
import { addDoc, getDocs, deleteDoc, collection, query, where, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

// MATERIAL UI
import { Card, CardContent, Typography, CardActions, Button, Box, alpha } from '@mui/material';
import { grey } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

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
    <Card sx={{ backgroundColor: grey[800], m: 2 }}>
      <CardContent sx={{ ml: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 30, color: grey['A100'], textAlign: 'start' }}>
            {post.title}
          </Typography>
          <Typography
            sx={{ color: alpha(grey['A100'], 0.5), ml: 1, fontSize: 20, fontWeight: 200 }}
          >
            @{post.username}
          </Typography>
        </Box>
        <Typography
          sx={{ color: grey['A100'], textAlign: 'start', fontSize: 18, fontWeight: 300, mt: 1 }}
          variant="h5"
          component="div"
        >
          {post.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={addLike} disabled={hasUserLiked ? true : false}>
          <ThumbUpIcon />
        </Button>
        <Typography sx={{ color: grey['A100'], mr: -1 }}>
          {likes && <p>Likes: {likes.length}</p>}
        </Typography>
        <Button onClick={removeLike} disabled={hasUserLiked ? false : true}>
          <ThumbDownIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

// {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
