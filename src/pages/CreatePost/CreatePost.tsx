import { CreateForm } from './CreateForm';

export const CreatePost = () => {
  const styles = { marginTop: '5em' };
  return (
    <div style={styles}>
      <h1>Create Post</h1>
      <CreateForm />
    </div>
  );
};
