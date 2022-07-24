import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DishInfo from '../DishInfo/index';
import { Typography } from '@mui/material';

export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('xs');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Button variant="text" size="small" onClick={handleClickOpen}>
        <Typography lineHeight={3}  variant="h5">查看详情</Typography>
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        scroll="body"
      >
        <DialogContent>
          <DishInfo />
        </DialogContent>
        <DialogActions>
          <Button 
            style={{width:"100%",backgroundColor:"#f2d632"}}
            onClick={handleClose}
          >确定</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
