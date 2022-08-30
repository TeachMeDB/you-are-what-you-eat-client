import SidebarLayout from '@/layouts/SidebarLayout';
import { styled } from '@mui/material/styles';
import {Grid,Box,Stack, ButtonBase, SvgIcon, Button,Container, Paper, CardActionArea, createTheme, ThemeProvider, Dialog, Alert, Snackbar, Typography, CssBaseline, Link } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as React from 'react';

import { useRefMounted } from '@/hooks/useRefMounted';
import QRCode from 'qrcode.react';
import { url } from 'inspector';
import { payApi } from '@/queries/payQRcode';
import { orderPriceApi } from '@/queries/orderPrice';
import {  QRcode } from '@/models/pay_qrcode';
import { CollectionsBookmarkRounded } from '@mui/icons-material';
import CleanDialog from '../Clean';

export default function PayDialog(props){

    console.log("最终付款价格："+props.final_price);
    console.log("结账订单IDs："+props.orderIds);

    const [itvl,setItvl]=React.useState(10000000);

    const [openClean,setOpenClean]=React.useState(false);
    const [open, setOpen] = React.useState(false);
    if(open==true&&itvl>3000){
      setItvl(3000);
    }
    console.log(open);
    console.log(itvl);

    // else itvl=3000;
    const isMountedRef = useRefMounted();
    const handleClickOpen = () => {
        // itvl=3000;
       
        setOpen(true);
        setItvl(3000);
        console.log(itvl);
        console.log(open);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const [website,setWebsite]=React.useState<QRcode>({qrcode:"https://www.baidu.com/"});

      const getAllData=React.useCallback(async()=>{
        try{
        // const info:PayInfo={final_price:props.final_price,order_ids:props.orderIds};
 
         let ws=await payApi.getQRstring( props.orderIds[0], props.final_price);
         console.log("得到的二维码url:"+ws.qrcode);
         setWebsite(ws);//刷新二维码
            
        }catch(err){
          console.error(err);
        }
      },[isMountedRef]);
      
      
      React.useEffect(()=>{
        getAllData();
      },[getAllData]);
   

    //   console.log("table_id:"+props.table_id);
    // let ok:boolean=false;//ok=true代表所有订单支付完成

    const updateState = React.useCallback(async () => {
      try{
        console.log("一次轮询"+website.qrcode);
        // console.log(website);
      const status0=await orderPriceApi.getOrderStatus(props.orderIds[0]);
      console.log(status0.order_status);
      if(status0.order_status==="已支付"){
        console.log("支付完成！！");
        if(!openClean) setOpenClean(true);//跳转到清理桌面
          console.log("打开清理组件"+openClean);
      }

      }catch(err){
        console.error(err);
      }

    }, []);

    React.useEffect(() => {
      // console.log("vewce!!!!"+itvl);
      setInterval(updateState,3000);//设置轮询时间间隔
    }, [updateState]);

   
    
//支付未完成
   return (
    <React.Fragment>
   
    <Button size="large"
    variant="contained"
      onClick={handleClickOpen}>直接去付款</Button>
    <Dialog  open={open} fullScreen={true}>
    
    <CssBaseline/>
    <CleanDialog open={openClean} fullScreen={true}/>
    {/* <CleanDialog open={true} fullScreen={true}/> */}
    <Container maxWidth="sm" 
               sx={{textAlign:"center"}}>
            <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
            <Typography variant="h5">扫码付款</Typography>
            <p>&nbsp;</p>
     <QRCode value={website.qrcode}
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


