import SidebarLayout from '@/layouts/SidebarLayout';
import { styled } from '@mui/material/styles';
import {Grid,Box,Stack, ButtonBase, SvgIcon, SxProps,FormControl } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DishInfo from '../../../src/components/DishInfo/index'
import DishInfoDialog from '../../../src/components/DishInfoDialog/index'

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { AddShoppingCart } from '@mui/icons-material';
import ShoppingCartFab from '../../../src/layouts/ShoppingCart/index';
import TextField from '@mui/material/TextField';
import {ChangeEvent} from 'react';

import {nowDishTag} from '../../../src/layouts/SidebarLayout/Sidebar/SidebarMenu/index'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import PromotionAd from '../../../src/components/PromotionAd/index';

import { dishesApi } from '@/queries/dishes';
import { DishHavethetag, DishesInfo } from '@/models/dishes_info';

import { useRefMounted } from 'src/hooks/useRefMounted';
import { useState, useCallback, useEffect } from 'react';

interface DishProps{
    dishid:number;
    dishname:string;
    picture:string;
    price:number;
    ordernum:number;
    rate:number;
    description:string;
    dishsalt:string;
    dishspicy:string;
    dishsweet:string;
    searched:boolean;
}

const InitialDish=(dishes):Array<DishProps>=>{
  console.log("+++++++++++++");
  console.log(dishes);
  // let dishesAll = [];
  // for(let i = 0;i < dishes.dish_havethetag.length; i++) {
  //   let dish = [];
  //   dish["dishid"] = dishes.dish_havethetag[i].dish_id;
  //   dish["dishname"] = dishes.dish_havethetag[i].dish_name;
  //   dish["picture"] = dishes.dish_havethetag[i].dish_picture;
  //   dish["price"] = dishes.dish_havethetag[i].dish_price;
  //   dish["rate"] = dishes.dish_havethetag[i].dish_rate;
  //   dish["description"] = dishes.dish_havethetag[i].dish_description;

  //   dish["ordernum"] = 1;
  //   dish["dishsalt"] = "正常盐";
  //   dish["dishspicy"] = "不辣";
  //   dish["dishsweet"] = "少糖";
  //   dish["searched"] = true;

  //   dishesAll.push(dish);
  // }
  // console.log(dishesAll);
  // return dishesAll;
  return [
      {
          dishid:1,
          dishname:"清炒土豆丝",
          price:9,
          picture:"/static/images/status/potato.png",
          ordernum:1,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:2,
          dishname:"番茄炒蛋",
          price:5.5,
          picture:"/static/images/status/tomato.png",
          ordernum:1,
          rate:4.6,
          description:"有点甜",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:3,
          dishname:"炒洋葱",
          price:10,
          picture:"/static/images/status/onion.png",
          ordernum:0,
          rate:4.3,
          description:"让人眼前一亮",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:4,
          dishname:"北京烤鸭",
          price:106,
          picture:"/static/images/status/duck.jpg",
          ordernum:1,
          rate:4.9,
          description:"正宗烤鸭，现烤现卖",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:5,
          dishname:"干锅花菜",
          price:51,
          picture:"/static/images/status/broc.jpg",
          ordernum:1,
          rate:4.0,
          description:"烈火中盛开的...花菜",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:6,
          dishname:"土豆牛肉",
          price:40,
          picture:"/static/images/status/beef.jpg",
          ordernum:1,
          rate:3.9,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:7,
          dishname:"新疆羊肉串",
          price:30,
          picture:"/static/images/status/muttonchuan.jpg",
          ordernum:1,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:8,
          dishname:"鱼豆腐",
          price:20,
          picture:"/static/images/status/tofu.png",
          ordernum:0,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:9,
          dishname:"虾仁粉丝煲",
          price:60,
          picture:"/static/images/status/fans.jpg",
          ordernum:0,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:10,
          dishname:"歪比巴卜",
          price:20,
          picture:"/static/images/status/tomato.png",
          ordernum:0,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:11,
          dishname:"歪比巴卜",
          price:97,
          picture:"/static/images/status/potato.png",
          ordernum:0,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:12,
          dishname:"歪比巴卜",
          price:13238936,
          picture:"/static/images/status/onion.png",
          ordernum:0,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:13,
          dishname:"歪比巴卜",
          price:13238936,
          picture:"/static/images/status/broc.jpg",
          ordernum:0,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
      },
      {
          dishid:14,
          dishname:"歪比巴卜",
          price:13238936,
          picture:"/static/images/status/tofu.png",
          ordernum:0,
          rate:4.7,
          description:"简单的做法，极致的美味",
          dishsalt:"正常盐",
          dishspicy:"不辣",
          dishsweet:"少糖",
          searched:true,
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
    // console.log("----------");
    // console.log(props.dishes);
    this.state={dishes:InitialDish(props.dishes)};
   this.handleClickPlus=this.handleClickPlus.bind(this);
   this.handleClickMinus=this.handleClickMinus.bind(this);
   }
    handleClickPlus(dishid:number){
      let index=0;
      for(let i = 0;i<this.state.dishes.length;i++){
        if(this.state.dishes[i].dishid == dishid){
          index=i;
          break;
        }
      }
      // console.log(index);
      // console.log(this.state.dishesShow);
      // console.log("click plus-----------");
      let dishes = this.state.dishes;
      dishes[index].ordernum++;
      // console.log(this.state.dishes);
      this.setState({
        dishes:dishes
      });
      console.log(nowDishTag);
      // this.setState(function(state){
      //     this.state.dishes[index].ordernum++;
      //     return{dishes:state.dishes};
      // });
    }

    handleClickMinus(dishid:number){
      let index=0;
      for(let i = 0;i<this.state.dishes.length;i++){
        if(this.state.dishes[i].dishid == dishid){
          index=i;
          break;
        }
      }
      // console.log(index);
      let dishes = this.state.dishes;
      dishes[index].ordernum--;
      // console.log(this.state.dishes);
      this.setState({
        dishes:dishes
      });
      // this.setState(function(state){
      //     if(this.state.dishes[index].ordernum>0)
      //         this.state.dishes[index].ordernum--;
      //     return{dishes:state.dishes};
      // });
    }

    handleDishSaltChange = (event,dishid) => {
      let index=0;
      for(let i = 0;i<this.state.dishes.length;i++){
        if(this.state.dishes[i].dishid == dishid){
          index=i;
          break;
        }
      }

      // console.log(event.target.value);
      const dishes=this.state.dishes;
      dishes[index].dishsalt=event.target.value;
      this.setState({
          dishes
      });
    }
    handleDishSpicyChange = (event,dishid) => {
      let index=0;
      for(let i = 0;i<this.state.dishes.length;i++){
        if(this.state.dishes[i].dishid == dishid){
          index=i;
          break;
        }
      }

      // console.log(event.target.value);
      const dishes=this.state.dishes;
      dishes[index].dishspicy=event.target.value;
      this.setState({
          dishes
      });
    }

    handleDishSweetChange = (event,dishid) => {
      let index=0;
      for(let i = 0;i<this.state.dishes.length;i++){
        if(this.state.dishes[i].dishid == dishid){
          index=i;
          break;
        }
      }

      // console.log(event.target.value);
      const dishes=this.state.dishes;
      dishes[index].dishsweet=event.target.value;
      this.setState({
          dishes
      });
    }

    handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
      // console.log(this.props.dishes);
      let value = null;
  
      if (e.target.value !== null) {
        value = e.target.value;
      }
      // console.log(value);

      let dishes = this.state.dishes;

      for(let i = 0;i<dishes.length;i++){
        dishes[i].searched=true;
        if(value && !(dishes[i].dishname.includes(value))){
          dishes[i].searched=false;
        }
      }
      // console.log(dishes);
      this.setState({
        dishes: dishes
      })
      // console.log(this.state.dishes);
      // let dishes1 = this.state.dishes;

      // dishes1 = dishes1.filter((dish) => {
      //   let matches = true;
      //   if(value && !(dish.dishname.includes(value)))
      //   {
      //     matches=false;
      //   }
      //   return matches;
      // });
      // console.log(dishes1);
      // console.log(this.state.dishesShow);
      // console.log("search change-------------------");
      // this.setState({
      //   dishesShow: dishes
      // })
      // this.setState(function(){
      //     console.log("搜索的setstate触发了");
      //     return{dishesShow: dishes1};
      // });
    };

    render(){
      return(
        <>
         <PromotionAd/>
         <FormControl variant="outlined" style={{width:"99%"}} sx={{ mt: 1, ml: 1, minWidth: 120 }}>
          <TextField 
          id="outlined-basic" 
          label="搜索菜品名称" 
          variant="outlined"
          onChange={this.handleSearchChange} 
          />
        </FormControl>
        
        <ImageList sx={{ width: '100%', height: '100%' }} cols={3} gap={10}>
          {/* <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">December</ListSubheader>
          </ImageListItem> */}
          {this.state.dishes.map((item) => (
            item.searched &&
            <ImageListItem key={item.dishid}>
              <img
                src={item.picture}
                alt={item.dishname}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.dishname+"\n"}
                subtitle={item.price+" 元/份"}
                sx={{
                  height:100
                }}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.dishname}`}
                  >
                    <DishInfoDialog 
                      dish={item}
                      hdPlus={this.handleClickPlus}
                      hdMinus={this.handleClickMinus}
                      hdSalt={this.handleDishSaltChange}
                      hdSpicy={this.handleDishSpicyChange}
                      hdSweet={this.handleDishSweetChange}
                    />
                    {/* <InfoIcon /> */}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <ShoppingCartFab dishes={this.state.dishes}
                         hdPlus={this.handleClickPlus}
                         hdMinus={this.handleClickMinus}/>
        {/* <SearchFab handleSearchChange={this.handleSearchChange}/> */}
        {/* <FormControl 
          variant="outlined"
          style={{
            width:"12%",
            position: 'fixed',
            bottom: 30,
            left: -10,
            zIndex:'7',
            // color:"red"
            backgroundColor:"#eff1f5",
            padding:"10px 2px",
            borderRadius:"5px",
          }}
          sx={{ m: 1, minWidth: 100 }}
        >
          
          <TextField 
          id="outlined-basic" 
          label="搜索菜品名称" 
          variant="outlined"
          onChange={this.handleSearchChange} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            ),
          }}
          />
        </FormControl> */}
        </>
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
//           <DishInfoDialog 
//             dish={dish}
//           />
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

function Dishpanel({dishesTag}:{dishesTag}){
  
  const isMountedRef = useRefMounted();

  console.log('dishesTag: ', dishesTag.dishesTag);
  
  const [dishesInfo, setDishesInfo] = useState<DishHavethetag[] | null>(null);

  const getDishesInfo = useCallback(async () => {
    try {
      console.log("调用api了",dishesTag.dishesTag);
      const response = await dishesApi.getCategoryDishes(dishesTag.dishesTag,4);

      if (isMountedRef()) {
        setDishesInfo(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getDishesInfo();
  }, [getDishesInfo]);
  console.log(dishesInfo);
  if (!dishesInfo) {
    return null;
  }
  return (
    <MainPanel />
  );
}


 Dishpanel.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dishpanel;

// export async function getServerSideProps() {
//   console.log("api执行了一次");
//   console.log(nowDishTag);
//   const dishes= await dishesApi.getCategoryDishes(nowDishTag,4);


//   return { props: { dishes } }
// }

export async function getServerSideProps(context) {
  const dishesTag = context.query;

  return { props: { dishesTag } }
}