import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';

interface Props {
  display: DisplayProps;
}

interface DisplayProps {
  xs?: 'none' | 'block' | 'flex';
  sm?: 'none' | 'block' | 'flex';
  md?: 'none' | 'block' | 'flex';
  lg?: 'none' | 'block' | 'flex';
  xl?: 'none' | 'block' | 'flex';
}

export const Logo = (props: Props) => {
  const { display } = props;
  return (
    <>
      <AdbIcon sx={{ display: { ...display }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { ...display },
          fontFamily: 'Roboto',
          fontSize: '1.2em',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
          flexGrow: display.xs === 'flex' ? 1 : 0,
        }}
      >
        Twatter
      </Typography>
    </>
  );
};
