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
  const [maxWidth] = React.useState('xs');

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
      <InfoIcon onClick={handleClickOpen}/>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        scroll="body"
      >
        <DialogContent style={{padding: '0'}}>
          <DishInfo 
            dish={props.dish}
            handleClickPlus={props.hdPlus}
            handleClickMinus={props.hdMinus}
            index={props.index}
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
