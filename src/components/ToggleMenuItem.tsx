import { MenuItem, Typography } from '@mui/material';
import { LinkInterface as Link } from './Link';
import { useNavigate } from 'react-router-dom';

export const ToggleMenuItem = (props: Link) => {
  const navigate = useNavigate();
  const { text, link } = props;
  return (
    <MenuItem
      onClick={() => {
        navigate(`${link}`);
      }}
    >
      <Typography textAlign="center">{text}</Typography>
    </MenuItem>
  );
};
