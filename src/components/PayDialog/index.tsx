import SidebarLayout from '@/layouts/SidebarLayout';
import { styled } from '@mui/material/styles';
import {Grid,Box,Stack, ButtonBase, SvgIcon, Button,Container, Paper, CardActionArea, createTheme, ThemeProvider, Dialog, Alert, Snackbar, Typography, CssBaseline } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as React from 'react';

import { useRefMounted } from '@/hooks/useRefMounted';
import QRCode from 'qrcode.react';
import { url } from 'inspector';

export default function PayDialog(props){

    console.log("最终付款价格："+props.final_price);

    const [open, setOpen] = React.useState(false);
    const isMountedRef = useRefMounted();
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    //   const getAllData=React.useCallback(async()=>{
    //     try{
    //      let website=await payApi.getQRstring(props.final_price);
    //      console.log(website);
            
    //     }catch(err){
    //       console.error(err);
    //     }
    //   },[isMountedRef]);
      
      
    //   React.useEffect(()=>{
    //     getAllData();
    //   },[getAllData]);

   return (
    <React.Fragment>
    <Button size="large"
      onClick={handleClickOpen}>直接去付款</Button>
    <Dialog  open={open} fullScreen={true}>
    
    <CssBaseline/>
    <Container maxWidth="sm" 
               sx={{textAlign:"center"}}>
            <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
            <Typography variant="h5">扫码付款</Typography>
            <p>&nbsp;</p>
     <QRCode value="https://www.baidu.com/" 
             level="H"
             size={200}
             imageSettings={{
                src:'static/images/status/zfb.jpg',
                width:40,
                height:40,
                excavate:true
             }}
             />
     
     </Container>
   
    </Dialog>
    
    </React.Fragment>
   );
}
