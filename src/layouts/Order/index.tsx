import { AddShoppingCart, PriceChangeRounded } from "@mui/icons-material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { SxProps, Box, Fab, Menu, Typography, Button, Divider, Grid, IconButton, List, ListItem, createTheme, Stack, Tooltip } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus } from "pages/orderdishes";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useRefMounted } from "@/hooks/useRefMounted";
import { orderApi } from '@/queries/order';
import { DishInfo,  OrderInfo } from "@/models/order_list";
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
if(orderId.length===0){
  console.log(orderId);
  return( 
    <Box sx={{minHeight:700}}>
  <Typography textAlign={"center"} lineHeight={4} color="#9C9C9C">
     暂无
  </Typography>
  </Box>);
}

let orderPrice:OrderTotPrice=initPrice;
let orderDishes:OrderInfo=initOrder;
const getAllData=useCallback(async()=>{
  try{
  
     orderPrice=await orderPriceApi.getOrderPrice(orderId[0]);
     orderDishes=await orderApi.getOrderList(orderId[0]);
     



//测试订单支付状态api
    //  let orderStatus=await orderPriceApi.getOrderStatus(orderId[0]);
    
    // console.log(orderStatus);

    if(orderId.length>1){
      console.log("订单id长度不会大于1了, 肯定是搞错了");
    }

    console.log("debug");
    console.log(orderPrice);
    console.log(orderId);

     
     if(isMountedRef()){
      //重新渲染页面
      // if(dishes!=orderDishes)setDishes(orderDishes);
      console.log(props.dishes);
      for(let i=0;i<props.dishes.length;i++){
        for(let j=0;j<orderDishes.dish_info.length;j++){
          if(props.dishes[i].dishid===orderDishes.dish_info[j].dish_id){
            console.log("id相等");
            orderDishes.dish_info[j].remark=props.dishes[i].dishsalt+", "+props.dishes[i].dishspicy+", "
            +props.dishes[i].dishsweet;
          }
        }
      }
      if(dishes!=orderDishes){
        console.log("re-render");
        console.log(dishes);
        console.log(orderDishes);
        setDishes(orderDishes);
      }
      if(price!=orderPrice)setPrice(orderPrice);


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
    <Box sx={{minHeight:653 ,maxHeight:683}}>{
            dishes.dish_info.map((item,index)=>
           <List >  
              <ListItem>
              <Grid container spacing={0}>
              <Grid item xs={2.5}> 
              
              <img src= {item.dish_picture} width={60} height={60}
                   style={{borderRadius:10}} />
            
                </Grid>
               <Grid item xs={6}>
               <Tooltip title={item.remark}>
                <Typography variant="body1" color="#123456"  lineHeight={2}>
                {item.dish_name}
                </Typography>
                  </Tooltip>
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
             orderIds={props.orderIds}
             username={props.username}
             table_id={props.table_id}/>
       
          </>
);

}