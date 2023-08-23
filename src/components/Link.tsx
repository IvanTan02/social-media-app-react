import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export interface LinkInterface {
  text: string;
  link: string;
}

export const Link = (props: LinkInterface) => {
  const { text, link } = props;
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(`${link}`);
      }}
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      {text}
    </Button>
  );
};
