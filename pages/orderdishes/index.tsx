import SidebarLayout from '@/layouts/SidebarLayout';
import { styled } from '@mui/material/styles';
import {Grid,Box,Stack, ButtonBase, SvgIcon } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DishInfo from '../../src/components/DishInfo/index'
import DishInfoDialog from '../../src/components/DishInfoDialog/index'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';

interface DishProps{
    dishname:string;
    picture:string;
    price:number;
    ordernum:number;
    rate:number;
}

const InitialDish=():Array<DishProps>=>{
return [
    {
        dishname:"清炒土豆丝",
        price:9,
        picture:"/static/images/status/potato.png",
        ordernum:1,
        rate:4.7
    },
    {
        dishname:"番茄炒蛋",
        price:5.5,
        picture:"/static/images/status/tomato.png",
        ordernum:1,
        rate:4.6
    },
    {
        dishname:"炒洋葱",
        price:100.01,
        picture:"/static/images/status/onion.png",
        ordernum:0,
        rate:4.3
    },
    {
        dishname:"北京烤鸭",
        price:40,
        picture:"/static/images/status/duck.jpg",
        ordernum:0,
        rate:4.9
    },
    {
        dishname:"干锅花菜",
        price:51,
        picture:"/static/images/status/broc.jpg",
        ordernum:0,
        rate:4.0
    },
    {
        dishname:"土豆牛肉",
        price:13238936,
        picture:"/static/images/status/beef.jpg",
        ordernum:0,
        rate:3.9
    },
    {
        dishname:"新疆羊肉串",
        price:13238936,
        picture:"/static/images/status/muttonchuan.jpg",
        ordernum:0,
        rate:4.7
    },
    {
        dishname:"鱼豆腐",
        price:13238936,
        picture:"/static/images/status/tofu.png",
        ordernum:0,
        rate:4.7
    },
    {
        dishname:"虾仁粉丝煲",
        price:13238936,
        picture:"/static/images/status/fans.jpg",
        ordernum:0,
        rate:4.7
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/tomato.png",
        ordernum:0,
        rate:4.7
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/potato.png",
        ordernum:0,
        rate:4.7
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/onion.png",
        ordernum:0,
        rate:4.7
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/broc.jpg",
        ordernum:0,
        rate:4.7
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/tofu.png",
        ordernum:0,
        rate:4.7
    }
]
}

export const Plus=(props)=>{
     return(
      <SvgIcon >
  <path fill="#98313e" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
     </SvgIcon>);
   
     
}
export const Minus=(props)=>{
  return(
    props.ordernum>0 &&
  <SvgIcon >
  <path fill="#98313e" d="M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
   </SvgIcon>
   );
}

class MainPanel extends React.Component<any,any>{

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
        <ImageList sx={{ width: '100%', height: '100%' }} cols={3} gap={10}>
          {/* <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">December</ListSubheader>
          </ImageListItem> */}
          {this.state.dishes.map((item) => (
            <ImageListItem key={item.picture}>
              <img
                src={item.picture}
                alt={item.dishname}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.dishname}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.dishname}`}
                  >
                    <DishInfoDialog />
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      )

//         return(
// <Box sx={{minWidth:100}}>
//  <Grid container spacing={1}> 
//     {
//       this.state.dishes.map((dish,index)=>
//       <Grid item xs={4} key={index}>
//         <Card sx={{ minWidth:320 }} >
//       <CardMedia
//         component="img"
//         height="140" 

//         image={dish.picture}
//         alt={dish.dishname}
//       />
//       <CardContent>
        
//         <Grid container spacing={1}>
//         <Grid item xs={9}>
//         <Typography gutterBottom variant="h5" component="div">
//           {dish.dishname}
//         </Typography>
//         </Grid>

//         <Grid item xs={3}>
//           <Stack direction="row">
//        <Box >
//        <SvgIcon fontSize="small">
//          <path fill="#FFD700" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
//        </SvgIcon></Box>
//         <Typography variant="body2" color="#9C9C9C" >
//          &nbsp;&nbsp;{dish.rate.toFixed(1)}
//         </Typography>
//         </Stack>
//         </Grid>
//         </Grid>

//         <Typography variant="body2" color="text.secondary">
//         {dish.price} 元/份
//         </Typography>

//       </CardContent>
//       <Grid container spacing={2}>
//         <Grid item xs={8}>
//           <CardActions>

//             <Stack direction="row" >
//             <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
//             this.handleClickMinus(index);}}>
//             <Minus ordernum={dish.ordernum}/>
//             </IconButton> 

//             <Typography variant="body1" color="#123456"  lineHeight={3}>
//             {dish.ordernum>0?dish.ordernum:"  "}
//             </Typography>
//             <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
//             this.handleClickPlus(index);
//             }}>
//             <Plus ordernum={dish.ordernum}/>
//             </IconButton>
//             </Stack>

//           </CardActions>
//         </Grid>
//         <Grid item xs={4}>
//           <DishInfoDialog />
//         </Grid>
//       </Grid>
      
//      </Card> </Grid>
     
  
//      )
//     }
//     </Grid> 
//     </Box>


//         );
    }
}

function Dishpanel(){
  return (
    <MainPanel/>
  );
}


 Dishpanel.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dishpanel;
