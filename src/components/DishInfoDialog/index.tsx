import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DishInfo from '../DishInfo/index';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';


const theme = createTheme({
  palette: {
    primary: {
      main: "#98313e",
    },
    secondary:{
      main:"rgba(255, 255, 255, 0.74)"
    }
  },
});
declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: {
        main:string;
      }
    };
  }

  interface ThemeOptions {
    palette?: {
      primary?: {
        main?:string;
      }
    };
  }
}


export default function DishInfoDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
       <ThemeProvider theme={theme}>
        <Button color="secondary" variant="outlined" onClick={handleClickOpen}>选规格</Button>
      {/* <InfoIcon /> */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        // scroll="body"
      >
        <DialogContent style={{padding: '0'}}>
          <DishInfo 
            dish={props.dish}
            hdInfoOpen={handleClickOpen}
            hdInfoClose={handleClose}
            handleClickPlus={props.hdPlus}
            handleClickMinus={props.hdMinus}
            handleDishSaltChange={props.hdSalt}
            handleDishSpicyChange={props.hdSpicy}
            handleDishSweetChange={props.hdSweet}
          />
        </DialogContent>
        
        <DialogActions style={{padding:'0'}}>
          <Button 
            style={{
              width:"100%",
              backgroundColor:"#98313e",
              color:'white',
              borderRadius:'0',
            }}
            onClick={handleClose}
          >确定</Button>
        </DialogActions>
      </Dialog>
       </ThemeProvider>
    </React.Fragment>
  );
}
