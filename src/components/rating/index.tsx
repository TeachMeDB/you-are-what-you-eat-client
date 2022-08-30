import SidebarLayout from '@/layouts/SidebarLayout';
import { styled } from '@mui/material/styles';
import {Grid,Box,Stack, ButtonBase, SvgIcon, Button, Container, Paper, CardActionArea, createTheme, ThemeProvider, Dialog, Alert, Snackbar } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DishInfo from 'src/components/DishInfo/index'
import MaxWidthDialog from 'src/components/DishInfoDialog/index'
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import { useContext } from 'react';
import { SidebarContext } from '@/contexts/SidebarContext';
import { DishRatingUpload, ServiceRatingUpload } from '@/models/rating';
import { ratingApi } from '@/queries/rating';
import PayDialog from '../PayDialog';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useRefMounted } from '@/hooks/useRefMounted';
import { orderApi } from '@/queries/order';
import { orderPriceApi } from '@/queries/orderPrice';
import { vipInfoApi } from '@/queries/vip';
import { UpdateCredit } from '@/models/vip';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';

interface FinalDishProps{
    dishname:string;
    rate:number;
    picture:string;
}

const FinalDish=():Array<FinalDishProps>=>{
return [
    {
        dishname:"清炒土豆丝",
        rate:5,
        picture:"/static/images/status/potato.png"
    },
    {
        dishname:"番茄炒蛋",
        rate:5,
        picture:"/static/images/status/tomato.png"
    },
    {
        dishname:"炒洋葱",
        rate:5,
        picture:"/static/images/status/onion.png"
    }
]
}


function Promt(props){
    if(props.dishend===0)
    return(
        <Typography variant="h3" color="text.secondary" >
           这道菜怎么样？
        </Typography>
    );
    else 
    return(
        <Typography variant="h3" color="text.secondary" >
           本次服务体验如何？
        </Typography>
    );
}
const labels: { [index: string]: string } = {
    0:'极差',
    // 0.5: '极差',
    1: '很差',
    // 1.5: '差',
    2: '比较差',
    // 2.5: '有点差',
    3: '一般',
    // 3.5: '还好',
    4: '好',
    // 4.5: '好',
    5: '非常好',
  };
  
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  
const LeftArrow=()=>{
    return(
        <SvgIcon sx={{ fontSize: 100 }}>
    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
</SvgIcon>
    );
}

const RightArrow=()=>{
    return(
        <SvgIcon  sx={{ fontSize: 100 }}>
   <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
</SvgIcon>
    );
}


function DishCard(props){

  // if(props.dishes==[])
  //    return(<></>);

  console.log(props.index,props.maxIndex);
  if(props.index <= props.maxIndex){
    
  return(
    // <Card sx={{ maxWidth: 345 }} >
    // <CardActionArea>
    //   <CardMedia
    //     component="img"
    //     height={190}
    //     image={props.dishes[props.index].dish_picture}
    //     alt="dishpic"
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="body2" component="div">
    //       {props.dishes[props.index].dish_name}
    //     </Typography>
    //       </CardContent>
    //         </CardActionArea>
    //        </Card>

    <ImageList sx={{ minWidth: 645, height: 230 }}>

    {
      <ImageListItem >
        <img
          src={props.dishes[props.index].dish_picture}
          alt="dishpic"
          loading="lazy"
        />
        <ImageListItemBar
          title={props.dishes[props.index].dish_name}
          subtitle=" "
        />
      </ImageListItem>
   }
  </ImageList>

  );}


  else
  {
    console.log("123");
    return <img src="/static/images/status/service.png"/>
  }
}


function RatingDialog(props) {
  
  const [openSuccess, setOpenSuccess] = React.useState(false);
  let originPrice:number=props.orderTotalPrice.toFixed(2);
  const [price,setPrice]=React.useState<number>(originPrice);
  let pricetoChange=props.orderTotalPrice;
  console.log("当前结账价格"+price);
  // if(price==0){
  //   setPrice(props.orderTotalPrice);
  // }
  console.log("传参价格"+props.orderTotalPrice);

const handleOpenSuccess = () => {
  console.log("打开success");
  setOpenSuccess(true);
};

const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
  setOpenSuccess(false);
};


  const [open, setOpen] = React.useState(false);
  console.log(open);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('xs');
  console.log("评分页面菜品");
  console.log(props.dishes);

  const handleClickOpen = () => {
    setOpen(true);
  
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const [content,setContent]=React.useState<string>("还不错！");

   const handleTextChange=(e:React.ChangeEvent<HTMLInputElement>):void =>{
      if(e.target.value!==null) setContent(e.target.value);
   }
   
   
   let maxIndex=props.dishes.dish_info.length-1;
   console.log(maxIndex);
   //let index=0;
   const [dishend,setDishend]=React.useState<number>(0);

   if(maxIndex<0) setDishend(-1);

   const [value, setValue] = React.useState<number>(5);
   const [hover, setHover] = React.useState(-1);
   let [index,setIdx]=React.useState<number|null>(0);

//获取会员信息
// let cred=0.0;
let restCred=0.0;
const [cred,setCred]=React.useState(0.0);
// const [restCred,setRestCred]=React.useState(0.0);


const isMountedRef = useRefMounted();
const getAllData=React.useCallback(async()=>{
  try{
     let vipInfo=await vipInfoApi.getVipInfo(props.username);
     console.log("获取到的会员积分"+vipInfo.credit);
    
     if(isMountedRef()){
      if(cred!=vipInfo.credit){
        setCred(vipInfo.credit);
        // setRestCred(vipInfo.credit);
       }
     }
      
   }catch(err){
    console.error(err);
  }
},[isMountedRef]);


React.useEffect(()=>{
  getAllData();
},[getAllData]);

   const [checked,setChecked]=React.useState(false);
   let change=false;

   const handleChangeSw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    change=true;
    if(checked==false){//
        // let decr_price=cred/10;
        if(props.orderTotalPrice<cred){//要减的价格超过了限额
            //直接打九折
            restCred=cred-props.orderTotalPrice;
            pricetoChange=(0.9*props.orderTotalPrice).toFixed(2);//更新价格
        }
        else{//没超过限额，积分全扣
            console.log("看这里");
            console.log("要扣的积分"+cred*1.0/10);
            pricetoChange=props.orderTotalPrice-cred*1.0/10;
            pricetoChange=pricetoChange.toFixed(2);//更新价格
            restCred=0;//剩余积分
            console.log(pricetoChange);
        }
        if(price!=pricetoChange){
          //  pricetoChange=pricetoChange.toFixed(2);
          setPrice(pricetoChange);
        }
        console.log("使用积分,price="+price);
    }
    else{//价格不变
      restCred=cred;
      pricetoChange=originPrice;
      if(price!=pricetoChange){
        // pricetoChange=pricetoChange.toFixed(2);
        setPrice(pricetoChange);
      }
      console.log("取消使用积分,price="+price);
    }
  };

  let img="/static/images/status/paper.jpg";

  console.log("结账价格1"+price);
  console.log("结账价格2"+originPrice);

        return(
        <React.Fragment>
          <Grid container>
            <Grid item xs={0.5}>
        
        </Grid>
        <Grid item xs={11.5}>

        {props.username!=undefined&&
        <FormControlLabel control={
        <Switch  checked={checked}
                 onChange={handleChangeSw}/>} 
        label="使用会员积分（最多抵扣10%）" />}

        </Grid>
        </Grid>
        
          {checked&&<Button 
              style={{
                width:"100%",
                backgroundColor:"#98313e",
                color:"white",
                borderRadius:"0"
              }}
              onClick={()=>{
                handleClickOpen();

                let upload={
                  credit:0,
                  user_name:"default"
                } as UpdateCredit;
                upload.credit=restCred;
                upload.user_name=props.username;
                console.log("更新会员积分:"+upload);
                
                if(props.username!=undefined){
                const conduct=async()=>{
                  return vipInfoApi.postVipCredit(upload);
                }

                conduct().then((value)=>{
                    console.log("成功更新会员积分");
                }).catch(()=>{
                    alert("会员积分更新失败！");
                });

              }
            }
            }
              >
            
            ￥{price}&nbsp;
           结账</Button>}

           {!checked&&<Button 
              style={{
                width:"100%",
                backgroundColor:"#98313e",
                color:"white",
                borderRadius:"0"
              }}
              onClick={()=>{
                handleClickOpen();

                let upload={
                  credit:0,
                  user_name:"default"
                } as UpdateCredit;
                upload.credit=restCred;
                upload.user_name=props.username;
                console.log("更新会员积分:"+upload);
                
                if(props.username!=undefined){
                const conduct=async()=>{
                  return vipInfoApi.postVipCredit(upload);
                }

                conduct().then((value)=>{
                    console.log("成功更新会员积分");
                }).catch(()=>{
                    alert("会员积分更新失败！");
                });

              }}}
              >
            ￥{originPrice}&nbsp;
           结账</Button>}

          <Dialog 
            // fullWidth={true}
            fullScreen={true}
            open={open}
            scroll="body"
            >
      <Snackbar open={openSuccess} anchorOrigin={{ vertical:'top', horizontal:'center' }} 
      autoHideDuration={6000} onClose={handleCloseSuccess}>
      <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
        提交成功！
      </Alert>
    </Snackbar>
        <Paper
        sx={{height:'100%',textAlign:'center',
        //  backgroundColor:"#CFCFCF",
         backgroundImage:`url(${img})`,
         backgroundRepeat:'no-repeat',
         backgroundSize:"cover"
      }}
        >
            <Container>
            <p>&nbsp;</p><p>&nbsp;</p>
            <Promt dishend={dishend}/>
            <p>&nbsp;</p>
            <Grid container spacing={10}>
                <Grid item xs={4}>
                    <Button size="large"
                     onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                        if(index>=1)  {
                          index--;
                          setIdx(index);
                          if(index<=maxIndex)setDishend(0);
                        }
                        }}><LeftArrow/></Button></Grid>
                <Grid item xs={4}>
              <DishCard dishes={props.dishes.dish_info} index={index} maxIndex={maxIndex}/>
             </Grid>
             <Grid item xs={4}>
                     <Button size="large"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            index++;
            if(index<=maxIndex) setIdx(index);
            else {index=maxIndex+1;setIdx(maxIndex+1);setDishend(1);}
            }}
                    ><RightArrow/></Button>
                    </Grid>
             </Grid>
             <p>&nbsp;</p>
          
<Rating
  name="simple-controlled"
  size="large"
  value={value}
  precision={1}
  getLabelText={getLabelText}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
  onChangeActive={(event, newHover) => {
    setHover(newHover);
  }}
  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
  {value !== null && (
        <Box sx={{ ml: 0 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
<Grid container spacing={0}>
<Grid item xs={4}>
            <p></p>
        </Grid>
<Grid item xs={4}>
<TextField
          id="standard-multiline-static"
          label="我想说..."
          multiline
          rows={4}
          fullWidth={true}
          defaultValue="还不错！"
          variant="standard"
          onChange={handleTextChange}
        /></Grid>
        <Grid item xs={4}>
            <p>&nbsp;</p>
        </Grid>
        
        </Grid>
        <Typography lineHeight={1}>&nbsp;</Typography>
        <Button size="large"
                variant="contained"
                onClick={()=>{
                  // 这里必须先定义一个再赋值

                  if(index<=maxIndex){
                    let testData1:DishRatingUpload={
                      content:"还不错~~~~",
                      rate:5,
                      dish_id:101,
                      username:"default"
                     };
  
                     testData1.content=content;
                     testData1.rate=value;
                     testData1.dish_id=props.dishes.dish_info[index].dish_id;
                     if(props.username!=undefined)
                     testData1.username=props.username;
                      const conduct1=async()=>{
                        console.log(testData1);
                        return ratingApi.postDishRating(testData1);
                     }

                      conduct1().then((value)=>{
                        // alert("提交菜品评价："+value);
                        handleOpenSuccess();
                        index++;
                        if(index<=maxIndex) setIdx(index);
                        else {index=maxIndex+1;setIdx(maxIndex+1);setDishend(1);}
                      }).catch((value)=>{
                        alert("提交菜品评价失败："+value);
                      })
                  }

                  else{
                    let testData2:ServiceRatingUpload={
                      content:"服务很热情，给个好评",
                      rate:5,
                      username:"default"
                   } ;
  
                   testData2.content=content;
                   testData2.rate=value;
                   if(props.username!=undefined)
                   testData2.username=props.username;
                      const conduct2=async()=>{
                      console.log(testData2);
                      return ratingApi.postServiceRating(testData2);
                    }

                    conduct2().then((value)=>{
                      // alert("提交服务评价："+value);
                      handleOpenSuccess();
                    }).catch((value)=>{
                      alert("提交服务评价失败："+value);
                    })
                  }

                }}
        >提交评价</Button>
     &nbsp;&nbsp;&nbsp;&nbsp;
       {checked&& <PayDialog final_price={price}
                   orderIds={props.orderIds}
                   table_id={props.table_id}/>
      
      }
      {!checked&& <PayDialog final_price={originPrice}
                   orderIds={props.orderIds}
                   table_id={props.table_id}/>
      
      }

            </Container>
            </Paper>
            </Dialog>
            
            </React.Fragment>
        );
}

export default RatingDialog;
