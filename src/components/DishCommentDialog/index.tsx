import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DishComment from './DishComment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
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


export default function DishCommentDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
       <ThemeProvider theme={theme}>
        <Button style={{color:"black",margin:"20px 0 0 16px"}} onClick={handleClickOpen}>全部评价（{props.dish.dishcomment.length}）条<ArrowForwardIosIcon sx={{ fontSize: 16 }}/></Button>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
        >
            <DialogContent style={{padding: '0'}}>
                <DishComment dish={props.dish}/>
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
            >返回主页</Button>
            </DialogActions>
        </Dialog>
       </ThemeProvider>
    </React.Fragment>
  );
}
