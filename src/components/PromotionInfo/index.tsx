import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DishInfo from '../DishInfo/index';
import { Container, Grid, List, ListItem, Stack, Typography } from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';

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
  

export default function PromoInfo(props){
    // const str="/static/images/status/promo_"+props.id+".png";
    let dishes=props.dishes;
    console.log("看看活动菜品图片");
    console.log(props.dishes);
    for (let i=0;i<props.dish_all.length;i++){
      for(let j=0;j<props.dishes.length;j++){
          if(props.dish_all[i].dishid===props.dishes[j].dish.dish_id){
            // props.dish_all[i].picture=props.dishes[j].dish.dish.dish_picture
            dishes[j].dish.dish_picture=props.dish_all[i].picture;
          }
      }
    }
    return(
        <ThemeProvider theme={theme}>
        <img src= {props.pic} width="100%" height="100%"/>
        {/* <Typography color="#696969" lineHeight={4}>&nbsp;&nbsp;&nbsp;活动促销菜品</Typography> */}
        <Container sx={{textAlign:"center"}}>{
        props.dishes.map((dish,index)=>
       <List>  
          <ListItem>
          <Grid container spacing={0}>
          <Grid item xs={2.5}> 

          <img src= {dish.dish.dish_picture} width={60} height={60}
               style={{borderRadius:10}} />
            </Grid>
           <Grid item xs={6}>
            
            <Typography variant="body1" color="#123456"  lineHeight={2}>
            {dish.dish.dish_name}
            </Typography>

            <Grid container >
                <Grid item xs={6}>
            <Typography variant="body1"  color="gray" sx={{textDecorationLine:'line-through'}}>
       原价: ￥{dish.dish.dish_price} 
       </Typography></Grid>

       <Grid item xs={6}>
       <Typography variant="body1"  color="red">
       &nbsp;&nbsp;&nbsp;现价: ￥{dish.dish.dish_price*dish.discount} 
       </Typography>
       </Grid>
       </Grid>

            </Grid>

            </Grid>
          </ListItem>
        {/* <Divider /> */}
        </List>
      )}
      <Typography color="#BCBCBC" fontSize="5">&nbsp;* 每次下单至多参加一个活动哦</Typography>
        </Container>
        </ThemeProvider>
    );
}