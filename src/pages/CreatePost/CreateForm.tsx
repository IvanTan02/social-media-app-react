import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

interface PostData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('A title to your post is required'),
    description: yup.string().required('A description to your post is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostData>({
    resolver: yupResolver(schema),
  });

  const postsCollection = collection(db, 'posts');

  const onCreatePost = async (data: PostData) => {
    await addDoc(postsCollection, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate('/');
  };

  const textFieldSx = {
    m: 2.5,
    width: '50%',
    color: 'white',
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <Box>
        <TextField
          sx={textFieldSx}
          id="post-title"
          label="Title"
          color="primary"
          focused
          helperText={errors.title?.message}
          {...register('title')}
          InputProps={{ style: { color: 'white' } }}
        />
      </Box>
      <Box>
        <TextField
          sx={textFieldSx}
          id="post-description"
          label="Description"
          helperText={errors.description?.message}
          multiline
          rows={4}
          color="primary"
          focused
          {...register('description')}
          InputProps={{ style: { color: 'white' } }}
        />
      </Box>

      <Button type="submit" variant="outlined">
        Post
      </Button>
    </form>
  );
};
