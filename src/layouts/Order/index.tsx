import { AddShoppingCart } from "@mui/icons-material";
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
import { DishInfo, OrderInfo } from "@/models/order_list";
import { OrderTotPrice } from '@/models/orderTotPrice'
import { orderPriceApi } from "@/queries/orderPrice";


const theme = createTheme({
    palette: {
      primary: {
        main:"#ffeb3b",
      },
      secondary:{
        main:"#33eb91",
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

  const InitOrderDish=():Array<OrderDishProps>=>{
    return [
       
        {
            dishname:"番茄炒蛋",
            price:5.5,
            picture:"/static/images/status/tomato.png",
            ordernum:1,
            status:"已上菜"
        },
         {
            dishname:"清炒土豆丝",
            price:9,
            picture:"/static/images/status/potato.png",
            ordernum:1,
            status:"已上菜"
        },
        {
            dishname:"虾仁粉丝煲",
            price:25.5,
            picture:"/static/images/status/fans.jpg",
            ordernum:2,
            status:"制作中"
        } ,
      {
          dishname:"北京烤鸭",
          price:40,
          picture:"/static/images/status/duck.jpg",
          ordernum:1,
          status:"制作中"
      },
        {
          dishname:"炒洋葱",
          price:48,
          picture:"/static/images/status/onion.png",
          ordernum:1,
          status:"制作中"
      },
      {
          dishname:"干锅花菜",
          price:51,
          picture:"/static/images/status/broc.jpg",
          ordernum:1,
          status:"制作中"
      }
      ]
    }
  
function Status(props){
// 需要根据status调整color
        return (
        <Stack direction="row">
        <AcUnitIcon color="primary" fontSize="small"/>
        <Typography color="#9C9CAC" >
            &nbsp;{props.status}</Typography>
        </Stack>
        );
}


export default function OrderList(){

const initOrder:OrderInfo={dish_info:[]};
const initPrice:OrderTotPrice={orderTotalPrice:0};

const [price,setPrice]=useState<OrderTotPrice>(initPrice);
const [dishes,setDishes]=useState<OrderInfo>(initOrder);
const isMountedRef = useRefMounted();

const getAllData=useCallback(async()=>{
  try{
    let order=await orderApi.getOrderList('EHKwcQm2Jbl');
    let orderPrice=await orderPriceApi.getOrderPrice('EHKwcQm2Jbl');
    if(isMountedRef()){
        setDishes(order);
        console.log(orderPrice);
        setPrice(orderPrice);
    }
  }catch(err){
    console.error(err);
  }
},[isMountedRef]);


useEffect(()=>{
  getAllData();
},[getAllData]);

if (dishes==initOrder){
return( 
  <Box sx={{minHeight:135}}>
<Typography textAlign={"center"} lineHeight={4} color="#9C9C9C">
   暂无
</Typography>
</Box>);
}
else
return (
  <>
  <ThemeProvider theme={theme}>{
            dishes.dish_info.map((item,index)=>
           <List>  
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
          )}

           <Button 
              style={{
                width:"100%",
                backgroundColor:"#98313e",
                color:"white",
                borderRadius:"0"
              }}>
            ￥{price.orderTotalPrice}&nbsp;
           结账</Button>
        </ThemeProvider>
       
          </>
);

}