import { AddShoppingCart } from "@mui/icons-material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { SxProps, Box, Fab, Menu, Typography, Button, Divider, Grid, IconButton, List, ListItem, createTheme, Stack } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useRef, useState } from "react";
import { Minus, Plus } from "pages/orderdishes";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';

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
    if(props.status=="制作中")
        return (<Stack direction="row">
        <AcUnitIcon color="primary" fontSize="small"/>
        <Typography color="#9C9CAC" >
            &nbsp;制作中</Typography>
        </Stack>);
    else if(props.status=="已上菜")
        return (<Stack direction="row">
         <AcUnitIcon color="secondary" fontSize="small"/>
         <Typography color="#9C9CAC" >
            &nbsp;已上菜</Typography>
        </Stack>);
}


export default function OrderList(){

const dishes=InitOrderDish();

if (dishes==[])
return( <Typography textAlign={"center"} lineHeight={4} color="#9C9C9C">
   暂无
</Typography>);

else 
return (
    <ThemeProvider theme={theme}>{
        dishes.map((dish,index)=>
       <List>  
          <ListItem>
          <Grid container spacing={0}>
          <Grid item xs={2.5}> 
          <img src= {dish.picture} width={60} height={60}
               style={{borderRadius:10}} />
            </Grid>
           <Grid item xs={6}>
            <Typography variant="body1" color="#123456"  lineHeight={2}>
            {dish.dishname}
            </Typography>
            <Typography variant="body1" color="red"  >
        ￥{dish.price*dish.ordernum}
       </Typography>
            </Grid>


            <Grid item xs={3}>
           <Typography color="#9C9CAC" lineHeight={2.1}>
            &nbsp;&nbsp;&nbsp;&nbsp;份数：{dish.ordernum}</Typography>
           <Status status={dish.status}/>
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
       结账</Button>
    </ThemeProvider>
);
}