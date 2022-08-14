import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Card, TextField } from '@mui/material';


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


export default function TableInfoDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('xs');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    console.log(data);
  }

  return (
    <React.Fragment>
       <ThemeProvider theme={theme}>
        <Button sx={{ mt: 2}} style={{textAlign: "center",fontSize:"30px",color:"rgba(0,0,0,0.6)"}} onClick={handleClickOpen}>当前桌号：{props.tableId}</Button>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
        >
            <DialogContent style={{padding: '0'}}>
                <Box>
                    <Card sx={{ minWidth: 75 , m: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="请输入当前桌号"
                            autoFocus
                            onChange={props.handleTableChange}
                        />
                    </Card>
                </Box>
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
