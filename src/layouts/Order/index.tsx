import { AddShoppingCart, PriceChangeRounded } from "@mui/icons-material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { SxProps, Box, Fab, Menu, Typography, Button, Divider, Grid, IconButton, List, ListItem, createTheme, Stack } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus } from "pages/orderdishes";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useRefMounted } from "@/hooks/useRefMounted";
import { orderApi } from '@/queries/order';
import { DishInfo, OrderIds, OrderInfo } from "@/models/order_list";
import { OrderStatus, OrderTotPrice } from '@/models/orderTotPrice'
import { orderPriceApi } from "@/queries/orderPrice";
import RatingDialog from "@/components/rating";
import { light } from "@mui/material/styles/createPalette";


const theme = createTheme({
    palette: {
      primary: {
        main:"#ffeb3b",//黄色，制作中
      },
      secondary:{
        main:"#33eb91",
      },
      info:{
        main:"#FF6A6A"//红，待处理
      },
      success:{
        main:"#90EE90"//绿,已完成
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
  

  interface OrderDishProps{
    dishname:string;
    price:number;
    picture:string;
    ordernum:number;
    status:string;
  }

  // const InitOrderDish=():Array<OrderDishProps>=>{
  //   return [
       
  //       {
  //           dishname:"番茄炒蛋",
  //           price:5.5,
  //           picture:"/static/images/status/tomato.png",
  //           ordernum:1,
  //           status:"已上菜"
  //       },
  //        {
  //           dishname:"清炒土豆丝",
  //           price:9,
  //           picture:"/static/images/status/potato.png",
  //           ordernum:1,
  //           status:"已上菜"
  //       },
  //       {
  //           dishname:"虾仁粉丝煲",
  //           price:25.5,
  //           picture:"/static/images/status/fans.jpg",
  //           ordernum:2,
  //           status:"制作中"
  //       } ,
  //     {
  //         dishname:"北京烤鸭",
  //         price:40,
  //         picture:"/static/images/status/duck.jpg",
  //         ordernum:1,
  //         status:"制作中"
  //     },
  //       {
  //         dishname:"炒洋葱",
  //         price:48,
  //         picture:"/static/images/status/onion.png",
  //         ordernum:1,
  //         status:"制作中"
  //     },
  //     {
  //         dishname:"干锅花菜",
  //         price:51,
  //         picture:"/static/images/status/broc.jpg",
  //         ordernum:1,
  //         status:"制作中"
  //     }
  //     ]
  //   }
  
function Status(props){
// 需要根据status调整color

  let color='info';//待处理 
  console.log(props.status);
  if(props.status==="制作中") color="primary";
  else if(props.status==="已完成") color="success";

        return (
        <Stack direction="row">
        <AcUnitIcon color={color} fontSize="small"/>
        <Typography color="#9C9CAC" >
            &nbsp;{props.status}</Typography>
        </Stack>
        );
}



export default function OrderList(props){

const initOrder:OrderInfo={dish_info:[]};
const initPrice:OrderTotPrice={orderTotalPrice:0};

// const [price,setPrice]=useState<OrderTotPrice>(initPrice);
const [dishes,setDishes]=useState<OrderInfo>(initOrder);
const isMountedRef = useRefMounted();

const orderId:string[]=props.orderIds;
const [price,setPrice]=useState<OrderTotPrice>(initPrice);

//如果没有任何订单，返回“暂无”
if(orderId.length===0||props.load===false){
  console.log(orderId);
  return( 
    <Box sx={{minHeight:720}}>
  <Typography textAlign={"center"} lineHeight={4} color="#9C9C9C">
     暂无
  </Typography>
  </Box>);
}

let orderPrice:OrderTotPrice=initPrice;

const getAllData=useCallback(async()=>{
  try{
  
     orderPrice=await orderPriceApi.getOrderPrice(orderId[0]);
//测试订单支付状态api
    //  let orderStatus=await orderPriceApi.getOrderStatus(orderId[0]);
    
    // console.log(orderStatus);

    if(orderId.length>1){
      for(let i=1;i<orderId.length;i++){

        let newPrice=await orderPriceApi.getOrderPrice(orderId[i]);

        orderPrice.orderTotalPrice +=newPrice.orderTotalPrice;
      }
      // if(price!=orderPrice){
      //   console.log(price);
      //   console.log(orderPrice);
      
      // }
    }

    console.log("debug");
    console.log(orderPrice);
    console.log(orderId);

    let upload={
      order_id:orderId
     }as OrderIds;
    
     const conduct=async()=>{
         console.log(upload);
         return orderApi.getOrderList(upload);
     }
    
     conduct().then((value)=>{
      // alert("读取所有订单"+value);
      console.log(value);
      // dishes=value;
      if(dishes!=value) {setDishes(value);  setPrice(orderPrice);}
     }).catch((value)=>{
         alert("读取订单失败："+value);
     });

     
     if(isMountedRef()){
     
    }
  }catch(err){
    console.error(err);
  }
},[isMountedRef]);


useEffect(()=>{
  getAllData();
},[getAllData]);

//  if(dishes!=orderinfo&&orderinfo!=initOrder) setDishes(orderinfo);


if (dishes==initOrder){
return( 
  <Box sx={{minHeight:720}}>
<Typography textAlign={"center"} lineHeight={4} color="#9C9C9C">
   暂无
</Typography>
</Box>);
}

return (
  <>
  <ThemeProvider theme={theme}>
    <Box sx={{minHeight:683}}>{
            dishes.dish_info.map((item,index)=>
           <List >  
              <ListItem>
              <Grid container spacing={0}>
              <Grid item xs={2.5}> 
              <img src= {item.dish_picture} width={60} height={60}
                   style={{borderRadius:10}} />
                </Grid>
               <Grid item xs={6}>
                <Typography variant="body1" color="#123456"  lineHeight={2}>
                {item.dish_name}
                </Typography>
                <Typography variant="body1" color="red"  >
            ￥{item.dish_price*item.dish_num}
           </Typography>
                </Grid>
    
    
                <Grid item xs={3}>
               <Typography color="#9C9CAC" lineHeight={2.1}>
                &nbsp;&nbsp;&nbsp;&nbsp;份数：{item.dish_num}</Typography>
               <Status status={item.dish_status}/>
                </Grid>
                </Grid>
              </ListItem>
            {/* <Divider /> */}
            </List>
          )}</Box>

          </ThemeProvider>

          <RatingDialog dishes={dishes}
             orderTotalPrice={price.orderTotalPrice}
             orderIds={props.orderIds}/>
       
          </>
);

}