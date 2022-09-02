import SidebarLayout from '@/layouts/SidebarLayout';
import { styled } from '@mui/material/styles';
import {Grid,Box,Stack, ButtonBase, SvgIcon, SxProps,
  FormControl, InputLabel, Select, MenuItem, ThemeProvider, createTheme } from '@mui/material';
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

import Alert from '@mui/material/Alert';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import NavigationIcon from '@mui/icons-material/Navigation';
import { AddShoppingCart } from '@mui/icons-material';
import ShoppingCartFab from '../../src/layouts/ShoppingCart/index';
import TextField from '@mui/material/TextField';
import {ChangeEvent} from 'react';

// import {nowDishTag} from '../../src/layouts/SidebarLayout/Sidebar/SidebarMenu/index'
import InputAdornment from '@mui/material/InputAdornment';

import PromotionAd from '../../src/components/PromotionAd/index';

import { dishesApi } from '@/queries/dishes';
import { DishHavethetag, DishesInfo, DishAll, DishesAll } from '@/models/dishes_info';

import { useRefMounted } from 'src/hooks/useRefMounted';
import { useState, useCallback, useEffect } from 'react';
import Sidebar from '@/layouts/SidebarLayout/Sidebar/index';
import Header from '@/layouts/SidebarLayout/Header/index';

import { useRouter } from 'next/router'
import TableInfoDialog from '@/components/TableInfoDialog';

interface DishComment {
  comment_content:string;
  comment_star:number;
  comment_time:string;
}

interface DishProps{
    dishid:number;
    dishname:string;
    picture:string;
    price:number;
    ordernum:number;
    rate:number;
    description:string;
    video:string;
    dishtag:string[];
    dishdiscount:number[];
    dishcomment:DishComment[];
    dishsalt:string;
    dishspicy:string;
    dishsweet:string;
    searched:boolean;
    selected:boolean;
}

const InitialDish=(dishes):Array<DishProps>=>{
  console.log("+++++++++++++");
  console.log(dishes);
  if(!dishes){
    return null;
  }

  let dishesAll = [];
  for(let i = 0;i < dishes.dish_all.length; i++) {
    let dish = [];
    dish["dishid"] = dishes.dish_all[i].dish_id;
    dish["dishname"] = dishes.dish_all[i].dish_name;
    dish["picture"] = dishes.dish_all[i].dish_picture;
    dish["price"] = dishes.dish_all[i].dish_price;
    dish["rate"] = dishes.dish_all[i].dish_rate;
    dish["description"] = dishes.dish_all[i].dish_description;
    dish["dishtag"] = dishes.dish_all[i].dish_tag;
    dish["dishcomment"] = dishes.dish_all[i].dish_comment;
    // 将评论按时间倒序排序
    dish["dishcomment"].sort(function(a,b){return Date.parse(b.comment_time) - Date.parse(a.comment_time);});
    dish["video"] = "//player.bilibili.com/player.html?bvid="+dishes.dish_all[i].dish_video+"&page=1&high_quality=1&danmaku=0";
    // dish["dishcomment"] = [{content:"还挺好吃",time:"2022-08-06",stars:5},{content:"一般般",time:"2022-08-05",stars:4}];

    dish["dishdiscount"] = [1];


    dish["ordernum"] = 0;
    dish["dishsalt"] = "正常盐";
    dish["dishspicy"] = "不辣";
    dish["dishsweet"] = "少糖";
    dish["searched"] = true;
    dish["selected"] = true;

    dishesAll.push(dish);
  }
  console.log(dishesAll);
  return dishesAll;
  // return [
  //     {
  //         dishid:1,
  //         dishname:"清炒土豆丝",
  //         price:9,
  //         picture:"/static/images/status/potato.png",
  //         ordernum:1,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["素菜","精品锅底"],
  //         selected:true,
  //     },
  //     {
  //         dishid:2,
  //         dishname:"番茄炒蛋",
  //         price:5.5,
  //         picture:"/static/images/status/tomato.png",
  //         ordernum:1,
  //         rate:4.6,
  //         description:"有点甜",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true,
  //     },
  //     {
  //         dishid:3,
  //         dishname:"炒洋葱",
  //         price:10,
  //         picture:"/static/images/status/onion.png",
  //         ordernum:0,
  //         rate:4.3,
  //         description:"让人眼前一亮",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["精品锅底"],
  //         selected:true,
  //     },
  //     {
  //         dishid:4,
  //         dishname:"北京烤鸭",
  //         price:106,
  //         picture:"/static/images/status/duck.jpg",
  //         ordernum:1,
  //         rate:4.9,
  //         description:"正宗烤鸭，现烤现卖",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true,
  //     },
  //     {
  //         dishid:5,
  //         dishname:"干锅花菜",
  //         price:51,
  //         picture:"/static/images/status/broc.jpg",
  //         ordernum:1,
  //         rate:4.0,
  //         description:"烈火中盛开的...花菜",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     },
  //     {
  //         dishid:6,
  //         dishname:"土豆牛肉",
  //         price:40,
  //         picture:"/static/images/status/beef.jpg",
  //         ordernum:1,
  //         rate:3.9,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     },
  //     {
  //         dishid:7,
  //         dishname:"新疆羊肉串",
  //         price:30,
  //         picture:"/static/images/status/muttonchuan.jpg",
  //         ordernum:1,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     },
  //     {
  //         dishid:8,
  //         dishname:"鱼豆腐",
  //         price:20,
  //         picture:"/static/images/status/tofu.png",
  //         ordernum:0,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     },
  //     {
  //         dishid:9,
  //         dishname:"虾仁粉丝煲",
  //         price:60,
  //         picture:"/static/images/status/fans.jpg",
  //         ordernum:0,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     },
  //     {
  //         dishid:10,
  //         dishname:"歪比巴卜",
  //         price:20,
  //         picture:"/static/images/status/tomato.png",
  //         ordernum:0,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     },
  //     {
  //         dishid:11,
  //         dishname:"歪比巴卜",
  //         price:97,
  //         picture:"/static/images/status/potato.png",
  //         ordernum:0,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     },
  //     {
  //         dishid:12,
  //         dishname:"歪比巴卜",
  //         price:13238936,
  //         picture:"/static/images/status/onion.png",
  //         ordernum:0,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["精品锅底"],
  //         selected:true
  //     },
  //     {
  //         dishid:13,
  //         dishname:"歪比巴卜",
  //         price:13238936,
  //         picture:"/static/images/status/broc.jpg",
  //         ordernum:0,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     },
  //     {
  //         dishid:14,
  //         dishname:"歪比巴卜",
  //         price:13238936,
  //         picture:"/static/images/status/tofu.png",
  //         ordernum:0,
  //         rate:4.7,
  //         description:"简单的做法，极致的美味",
  //         dishsalt:"正常盐",
  //         dishspicy:"不辣",
  //         dishsweet:"少糖",
  //         searched:true,
  //         dishtag:["全新套餐"],
  //         selected:true
  //     }
  // ]
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
// let username="default";
class MainPanel extends React.Component<any,any>{

   constructor(props){
    super(props);
    console.log("----------");
    // console.log(username);
    console.log(props.dishes);
    
    this.state={dishes:InitialDish(props.dishes),
                nowDishTag:"全部菜品",
                promoId:-1,
                sortTag:"默认排序",
                tableId:1
              };
                
   this.handleClickPlus=this.handleClickPlus.bind(this);
   this.handleClickMinus=this.handleClickMinus.bind(this);
   this.handleClear=this.handleClear.bind(this);
   this.handlePromo=this.handlePromo.bind(this);
   }
 
   handlePromo(newId:number){
      this.setState({
          promoId:newId
      });
   } 



  handleClear(){
    
    console.log(this.state.dishes);

    for(let i = 0;i<this.state.dishes.length;i++){
      this.state.dishes[i].ordernum=0;
    }

     this.setState({
      dishes:this.state.dishes
     });
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
      // console.log(nowDishTag);
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

    handleDishesSort = (event) => {
      let sortTag = "默认排序";
      let dishesAll = InitialDish(this.props.dishes);
      for(let i=0;i<dishesAll.length;i++) {
        dishesAll[i].selected=this.state.dishes[i].selected;
        dishesAll[i].searched=this.state.dishes[i].searched;
      }
      if(event.target.value === "默认排序") {

      } else if(event.target.value === "评分排序") {
        sortTag = "评分排序";
        dishesAll.sort(function(a, b){return b.rate - a.rate});
      } else if(event.target.value === "菜名排序") {
        sortTag = "菜名排序";
        dishesAll.sort(function(a, b){return a.dishname.localeCompare(b.dishname);})
      }
      this.setState({
        dishes:dishesAll,
        sortTag:sortTag
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

      if(!dishes){
        return;
      }

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

    handleTableChange = (e: ChangeEvent<HTMLInputElement>): void => {
      let value = null;
  
      if (e.target.value !== null) {
        value = e.target.value;
      }
      // console.log("桌子号",value);
      this.setState({
        tableId:value
      })
    }

    handleDishTag = (dishTag) => {
      let dishes = this.state.dishes;
      let nowDishTag = dishTag;
      // 对全部菜品选项进行特判
      if(dishTag == '全部菜品') {
        for(let i = 0;i<dishes.length;i++){
          dishes[i].selected=true;
        }
      } else {
        for(let i = 0;i<dishes.length;i++){
          dishes[i].selected=true;
          if(!dishes[i].dishtag.includes(dishTag)){
            dishes[i].selected=false;
          }
        }
      }
      console.log(dishes);
      this.setState({
        dishes: dishes,
        nowDishTag: nowDishTag
      })
    }

    render(){
      return(
        <>
          <Sidebar 
            handleDishTag = {this.handleDishTag}
            nowDishTag = {this.state.nowDishTag}
          />
          {/* <Header/> */}
          <Card style={{backgroundColor:""}}>
          <PromotionAd handlePromo={this.handlePromo} dish_all={this.state.dishes}/>      
          <Grid container spacing={2} style={{ marginBottom: '10px'}}>
            <Grid item xs={2}>
              <FormControl variant="outlined" style={{width:"100%"}} sx={{ mt: 2, ml: 3, minWidth: 120 }}>
                <TextField 
                id="outlined-basic" 
                label="搜索菜品名称" 
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={this.handleSearchChange} 
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={2}>
                <TableInfoDialog style={{}}handleTableChange={this.handleTableChange} tableId={this.state.tableId}/>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={2}>
                <FormControl sx={{ mt: 2, minWidth: 150 }}>
                    <InputLabel htmlFor="dishes-sort">排序方式</InputLabel>
                    <Select
                        // autoFocus
                        value={this.state.sortTag}
                        onChange={this.handleDishesSort}
                        label="dishesSort"
                        inputProps={{
                        name: 'dishes-sort',
                        id: 'dishes-sort',
                        }}
                    >
                        <MenuItem value="默认排序">默认排序</MenuItem>
                        <MenuItem value="评分排序">评分排序</MenuItem>
                        <MenuItem value="菜名排序">菜名排序</MenuItem>
                    </Select>
                </FormControl>
                
            </Grid>  
          </Grid>
        </Card>
        <ImageList sx={{ width: '100%' }} cols={3} gap={10} rowHeight={350}>
          {/* <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">December</ListSubheader>
          </ImageListItem> */}
          {this.state.dishes.map((item) => (
            item.searched && item.selected &&
            <ImageListItem key={item.dishid}>
              <img
                src={item ? item.picture : "/static/images/nodish_picture.png"}
                alt={item.dishname}
                loading="lazy"
                style={{height:"100%"}}
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
                         promoId={this.state.promoId}
                         hdPlus={this.handleClickPlus}
                         hdMinus={this.handleClickMinus}
                         hdClear={this.handleClear}
                         table_id={this.state.tableId}
                        />
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
    }
}

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

function Dishpanel({dishes}:{dishes:DishAll[]}){

  const router = useRouter();
  const user = router.query.user;

  console.log("主页面用户名"+user);

  return (
    <ThemeProvider theme={theme}>
      <MainPanel dishes={dishes} user={user}/>
    </ThemeProvider>
  );
}


 Dishpanel.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dishpanel;

export async function getServerSideProps() {
  const dishes= await dishesApi.getAllDishes();

  return { props: { dishes } }
}