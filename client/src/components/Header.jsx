// Material-ui components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// JS Styles
import styles from 'assets/js/components/HeaderStyles';

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();

  const { currentUser } = props;

  return (
    <AppBar position="static" style={{background: "white", color: "black"}}>
      <Toolbar style={{maxWidth: '960px',width: '100%', margin: '0 auto'}}>
        <Typography variant="h6" className={classes.title}>
          Quizeo
        </Typography>
        {
          currentUser
            ? <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            : <Button color="inherit" variant="outlined">Login/Register</Button>
        }
      </Toolbar>
    </AppBar>
  )
}
