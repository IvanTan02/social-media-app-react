import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

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

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title" {...register('title')} />
      <p>{errors.title?.message}</p>
      <textarea placeholder="Description" {...register('description')} />
      <p>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};
