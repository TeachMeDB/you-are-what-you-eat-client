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

export default function PayDialog(props){

    console.log("最终付款价格："+props.final_price);
    console.log("结账订单IDs："+props.orderIds);

    const [itvl,setItvl]=React.useState(10000000);

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

      const [website,setWebsite]=React.useState<QRcode>({qr_code:"https://www.baidu.com/"});

      const getAllData=React.useCallback(async()=>{
        try{
        // const info:PayInfo={final_price:props.final_price,order_ids:props.orderIds};

         let ws=await payApi.getQRstring( props.orderIds[0], props.final_price);
         console.log(ws)
         setWebsite(ws);//刷新二维码
            
        }catch(err){
          console.error(err);
        }
      },[isMountedRef]);
      
      
      React.useEffect(()=>{
        getAllData();
      },[getAllData]);
   

    let ok:boolean=false;//ok=true代表所有订单支付完成

    const updateState = React.useCallback(async () => {
      try{
        console.log("一次轮询");
      
      const status0=await orderPriceApi.getOrderStatus(props.orderIds[0]);
      if(status0.order_status==="已支付") ok=true;//给ok一个变true的机会
      else if(status0.order_status==="支付失败"){
        let ws=await payApi.getQRstring(props.orderIds[0], props.final_price);
          console.log(ws);
          setWebsite(ws);//刷新二维码
      }

      for(let i=1;i<props.orderIds.length;i++){
        const status = await orderPriceApi.getOrderStatus(props.orderIds[i]);
       
        if(status.order_status!=="已支付"){//说明还有没支付的订单
            ok=false;//不能退出，保持不动
        }
        if(status.order_status==="支付失败"){
          //刷新页面，重新渲染二维码
          let ws=await payApi.getQRstring(props.orderIds[0], props.final_price);
          console.log(ws);
          setWebsite(ws);//刷新二维码
        }
      }

      if(ok===true){
        return(
          <React.Fragment>
          <Button size="large"
            onClick={handleClickOpen}>直接去付款</Button>
          <Dialog  open={open} fullScreen={true}>
          
          <CssBaseline/>
          <Link href="/cleantable"><a>√&nbsp;完成</a></Link>
         
          </Dialog>
          
          </React.Fragment>
      
      );
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
      onClick={handleClickOpen}>直接去付款</Button>
    <Dialog  open={open} fullScreen={true}>
    
    <CssBaseline/>
    <Container maxWidth="sm" 
               sx={{textAlign:"center"}}>
            <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
            <Typography variant="h5">扫码付款</Typography>
            <p>&nbsp;</p>
     <QRCode value={website.qr_code}
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


