import SidebarLayout from '@/layouts/SidebarLayout';
import { styled } from '@mui/material/styles';
import {Grid,Box,Stack, ButtonBase, SvgIcon } from '@mui/material';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DishInfo from '../../src/components/DishInfo/index'
import MaxWidthDialog from '../../src/components/DishInfoDialog/index'

interface DishProps{
    dishname:string;
    picture:string;
    price:number;
    ordernum:number;
}

const InitialDish=():Array<DishProps>=>{
return [
    {
        dishname:"清炒土豆丝",
        price:9,
        picture:"/static/images/status/potato.png",
        ordernum:1
    },
    {
        dishname:"番茄炒蛋",
        price:5.5,
        picture:"/static/images/status/tomato.png",
        ordernum:1
    },
    {
        dishname:"炒洋葱",
        price:100.01,
        picture:"/static/images/status/onion.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:40,
        picture:"/static/images/status/dave.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:51,
        picture:"/static/images/status/xrk.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png",
        ordernum:0
    }
]
}

export const Plus=(props)=>{
     return(
      <SvgIcon >
  <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
     </SvgIcon>);
   
     
}
export const Minus=(props)=>{
  return(
    props.ordernum>0 &&
  <SvgIcon >
  <path fill="currentColor" d="M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
   </SvgIcon>
   );
}

class MainPanel extends React.Component<any,any>{
 //  dishes:Array<DishProps>= InitialDish();
   constructor(props){
    super(props);
    this.state={dishes:InitialDish()};
   this.handleClickPlus=this.handleClickPlus.bind(this);
   this.handleClickMinus=this.handleClickMinus.bind(this);
   }
    handleClickPlus(index:number){
      this.setState(function(state){
          this.state.dishes[index].ordernum++;
          return{dishes:state.dishes};
      });
    }

    handleClickMinus(index:number){
      this.setState(function(state){
          if(this.state.dishes[index].ordernum>0)
              this.state.dishes[index].ordernum--;
          return{dishes:state.dishes};
      });
    }

    render(){
        return(
<Box sx={{minWidth:100}}>
 <Grid container spacing={1}> 
    {
      this.state.dishes.map((dish,index)=>
      <Grid item xs={4} key={index}>
        <Card sx={{ minWidth:320 }} >
      <CardMedia
        component="img"
        height="140" 

        image={dish.picture}
        alt={dish.dishname}
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
          {dish.dishname}
        </Typography>

        <Typography variant="body2" color="text.secondary">
        {dish.price} 元/份
        </Typography>

      </CardContent>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CardActions>

            <Stack direction="row" >
            <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            this.handleClickMinus(index);}}>
            <Minus ordernum={dish.ordernum}/>
            </IconButton> 

            <Typography variant="body1" color="#123456"  lineHeight={3}>
            {dish.ordernum>0?dish.ordernum:"  "}
            </Typography>
            <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            this.handleClickPlus(index);
            }}>
            <Plus ordernum={dish.ordernum}/>
            </IconButton>
            </Stack>

          </CardActions>
        </Grid>
        <Grid item xs={4}>
          <MaxWidthDialog />
        </Grid>
      </Grid>
      
     </Card> </Grid>
     
  
     )
    }
    </Grid> 
    </Box>


        );
    }
}

function Dishpanel(){
  return (
    <MainPanel/>
  );
}


 Dishpanel.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dishpanel;
