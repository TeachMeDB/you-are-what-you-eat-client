import React, { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, styled, createTheme,ThemeProvider, Box, Grid, Typography, Alert, Snackbar } from '@mui/material'

import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import InfoIcon from '@mui/icons-material/Info';

import PromoInfo from '../PromotionInfo';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PromotionInfo from '../PromotionInfo';
import { useRefMounted } from '@/hooks/useRefMounted';
import { OrderInfo } from '@/models/order_list';
import { orderApi } from '@/queries/order';
import { Promotions } from '@/models/promtions';
import { promoApi } from '@/queries/promo';

const theme = createTheme({
    palette: {
      primary: {
        main: "#98313e",
      },
      secondary:{
        main:"#F8F8FF",
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
  
interface DishProps{
    dish_id:number,
    dish_name:string,
    dish_price:number,
    dish_description:string,
    dish_picture:string
  }
  
  interface DishesProps{
    dish:DishProps,
    discount:number
  }
  interface PromotionProps{
       promotion_id:number,
       description:string,
       dishes:Array<DishesProps>
  }
  
  // const InitialPromo=():Array<PromotionProps>=>{
  //   return [
  //     {
  //       promotion_id:101,
  //       description:"情人节特惠",
  //       dishes:[
  //       {
  //          dish:{
  //             dish_id:101,
  //             dish_name:"清炒土豆丝",
  //             dish_price:9,
  //             dish_description:"简单的做法，极致的美味",
  //             dish_picture:"/static/images/status/potato.png"
  //           },
  //          discount:0.8
  //       }
  //       ]
  //     },
  //     {
  //       promotion_id:102,
  //       description:"新品西餐抢先尝",
  //       dishes:[
  //       {
  //          dish:{
  //             dish_id:102,
  //             dish_name:"番茄炒蛋",
  //             dish_price:5.5,
  //             dish_description:"有点甜",
  //             dish_picture:"/static/images/status/tomato.png"
  //          },
  //          discount:0.8
  //       },
  //       {
  //         dish:{
  //            dish_id:101,
  //            dish_name:"清炒土豆丝",
  //            dish_price:9,
  //            dish_description:"简单的做法，极致的美味",
  //            dish_picture:"/static/images/status/potato.png"
  //          },
  //         discount:0.5
  //      },
  //      {
  //        dish:{
  //           dish_id:108,
  //           dish_name:"鱼豆腐",
  //           dish_price:20,
  //           dish_description:"简单的做法，极致的美味",
  //           dish_picture:"/static/images/status/tofu.png"
  //         },
  //        discount:0.95
  //     },
  //     {
  //       dish:{
  //          dish_id:107,
  //          dish_name:"新疆羊肉串",
  //          dish_price:40,
  //          dish_description:"简单的做法，极致的美味",
  //          dish_picture:"/static/images/status/muttonchuan.jpg"
  //        },
  //       discount:0.95
  //    }
  //       ]
  //     },
  //     {
  //       promotion_id:103,
  //       description:"疯狂星期四",
  //       dishes:[
  //       {
  //          dish:{
  //             dish_id:102,
  //             dish_name:"番茄炒蛋",
  //             dish_price:5.5,
  //             dish_description:"有点甜",
  //             dish_picture:"/static/images/status/tomato.png"
  //          },
  //          discount:0.8
  //       },
  //       {
  //         dish:{
  //            dish_id:104,
  //            dish_name:"北京烤鸭",
  //            dish_price:100,
  //            dish_description:"绝对正宗",
  //            dish_picture:"/static/images/status/duck.jpg"
  //          },
  //         discount:0.9
  //      }
  //       ]
  //     }
  //   ];
  // }
  

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundRepeat:'no-repeat',
    backgroundSize:"cover"
  }));


  function Backgrd(props){

    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);

    const handleOpenSuccess = () => {
      console.log("打开success");
      setOpenSuccess(true);
    };
    
    const handleCloseSuccess = () => {
    
      console.log("关闭success");
      setOpenSuccess(false);
    };


    const [open, setOpen] = React.useState(false);
    const [fullWidth] = React.useState(true);
  
    const handleClickOpen = () => {
      setOpen(true);
      console.log(props);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    // const str="/static/images/status/promo_"+props.id+".png";
    return(
        <React.Fragment>
        <Snackbar open={openSuccess} anchorOrigin={{ vertical:'top', horizontal:'center' }} 
      autoHideDuration={6000} onClose={handleCloseSuccess}>
      <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
        已选择活动{props.id}
      </Alert>
    </Snackbar>

       <ThemeProvider theme={theme}>
    <Item sx={{
                        minHeight:450,
                        backgroundImage:`url(${props.pic})`,
                    }}  onClick={handleClickOpen}>

                <Grid container spacing={0}>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}>
                <Typography lineHeight={24}>&nbsp;</Typography>

                    </Grid>
                </Grid>
                </Item>

        <Dialog
         fullWidth={fullWidth}
         open={open}
         onClose={handleClose}
         scroll="body"
       >
         <DialogContent style={{padding: '0'}}>
          {/* <h1>Hello!</h1> */}
          <PromotionInfo id={props.id} dishes={props.dishes} pic={props.pic} dish_all={props.dish_all}/>

          
         </DialogContent>
         <DialogActions style={{padding:'0'}}>
           <Button 
             style={{
               width:"100%",
               backgroundColor:"#98313e",
               color:'white',
               borderRadius:'0',
             }}
             onClick={()=>{
              props.handlePromo(props.id);
              console.log("选中活动id:"+props.id);
              handleClose();
              handleOpenSuccess();
            }}
           >参与活动</Button>
         </DialogActions>
       </Dialog>
       
       </ThemeProvider>

        </React.Fragment>
    );
    }

export default function PromotionAd(props){

console.log(props.handlePromo);

// const initPromo=InitialPromo();

const [promotions,setPromo]=useState<Promotions[]>([]);

const isMountedRef = useRefMounted();

const getAllData=useCallback(async()=>{
  try{
    let newPromos= await promoApi.getPromos();
    console.log("让我们看看有哪些活动！");
    if(isMountedRef()){
       setPromo(newPromos);
      
       console.log(promotions);
    }
  }catch(err){
    console.error(err);
  }
},[isMountedRef]);


useEffect(()=>{
  getAllData();
},[getAllData]);


    return (
        <Carousel>{
                promotions.map((promo, index) =>
               <Backgrd id={promo.promotion_id} 
                        dishes={promo.dishes}
                        dish_all={props.dish_all}
                        handlePromo={props.handlePromo}
                        pic={promo.picture}
                        />)
        }
        </Carousel>
    );
}


