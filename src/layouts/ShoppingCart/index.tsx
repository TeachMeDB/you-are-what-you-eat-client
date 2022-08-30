import { AddShoppingCart } from "@mui/icons-material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { SxProps, Tooltip,Box, Fab, Menu, Typography, Button, Divider, Grid, IconButton, List, ListItem, createTheme, Alert } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus } from "pages/orderdishes";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import OrderList from "../Order";
import { orderApi } from "@/queries/order";
import { CommitOrderUpload, DishesInfo } from "@/models/commit_order";
import { orderPriceApi } from "@/queries/orderPrice";
import { useRefMounted } from "@/hooks/useRefMounted";
import { promoApi } from "@/queries/promo";
import { dishesApi } from "@/queries/dishes";


import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CheckDialog from "@/components/CheckCommit";
import { PromoPrice } from "@/models/promtions";


import { useRouter } from 'next/router'
const theme = createTheme({
  palette: {
    primary: {
      main: "#98313e",
    },
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

interface NewDishProps{
  dishname:string;
  price:number;
  picture:string;
  ordernum:number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Typography>{children}</Typography>
      )}
    </div>
  );
}


const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

const fabRedStyle={
  color:'common.white',
  bgcolor:'#98313e'
  // '&:hover':{
  //   bgcolor:''
  // }
}
const fab={
  color:'inherit' as 'inherit',
  sx:{...fabStyle, ...fabRedStyle} as SxProps,
  icon:<ShoppingCart/>,
  label:'ShoppingCart'
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TypoPrice(props){
  console.log(props.discount);
  if(!(props.discount<1))
   return(
           <Typography variant="body1" color="red"  >
        ￥{props.price*props.num}
       </Typography> 
   );
   else{
   return(
    <Grid container >
    <Grid item xs={2.5}>
<Typography variant="body1"  color="gray" sx={{textDecorationLine:'line-through'}}>
 ￥{props.price*props.num} 
</Typography></Grid>

<Grid item xs={9.5}>
<Typography variant="body1"  color="red">
&nbsp;&nbsp;&nbsp;￥{props.price*props.num*props.discount} 
</Typography>
</Grid>
</Grid>
); 
}
}



function NewList (props){

  // orderIds:DishesInfo
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);

const handleOpenSuccess = () => {
  console.log("打开success");
  setOpenSuccess(true);
};

const handleCloseSuccess = () => {
  // props.setLoad(true);
  console.log("关闭success");
  setOpenSuccess(false);
};


    const isMountedRef = useRefMounted();

    
    console.log(props.dishes.length);
    let empt=true;

    const [price,setPrice]=React.useState<number>(0.00);

    for(let i=0;i<props.dishes.length;i++){
        if(props.dishes[i].ordernum>0){
          empt=false;
          break;
        }
    }


    let dishes=props.dishes;
    console.log(dishes);
   
    let priceInfo:PromoPrice;

    let totPrice=0;

   const getAllData=useCallback(async()=>{

     try{
      for(let i=0;i<dishes.length;i++){
      // console.log("ohhhhhhhhhhhhhhhhhhhhh");
      
         if(dishes[i].ordernum>0){
          
            
                priceInfo=await promoApi.getPromoPrice(props.promoId,dishes[i].dishid) ;
                console.log(priceInfo);
                 if(priceInfo.discount<1){
                   dishes[i].dishdiscount[0]=priceInfo.discount;
                 }
                 else{
                  dishes[i].dishdiscount[0]=1;
                 }

        }
      totPrice+=dishes[i].price*dishes[i].dishdiscount[0]*dishes[i].ordernum;
      console.log(totPrice);
      if(price!=totPrice) setPrice(totPrice);
  }
      
    
} catch(err){
  console.error(err);
}
},[isMountedRef]);
useEffect(()=>{
getAllData();
},[getAllData]);
    
totPrice=0;
for(let i=0;i<dishes.length;i++){
     if(dishes[i].ordernum>0){
       totPrice+=dishes[i].price*dishes[i].dishdiscount[0]*dishes[i].ordernum;
     }
}
if(price!=totPrice) setPrice(totPrice);
    //  setTotalPrice(totPrice);

    if(empt)
    return( 
      <>
      <Snackbar open={openSuccess} anchorOrigin={{ vertical:'top', horizontal:'center' }} 
      autoHideDuration={6000} onClose={handleCloseSuccess}>
      <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
        下单成功！
      </Alert>
    </Snackbar>
      <Box sx={{minHeight:700}}>
        <Typography textAlign={"center"} lineHeight={4} color="#9C9C9C">
    暂无</Typography>
    </Box></>
    );

    else
    return(
        <>
        <Box sx={{minHeight:683}}>{
          // api接好以后，下面的props可以去掉
        props.dishes.map((dish,index)=>
       dish.ordernum>0&&(<List>  
          <ListItem>
          <Grid container spacing={0}>
          <Grid item xs={2.5}> 
          <img src= {dish.picture} width={60} height={60}
               style={{borderRadius:10}} />
            </Grid>
           <Grid item xs={6}>
            <Tooltip title={dish.dishsalt+", "+dish.dishspicy+", "
            +dish.dishsweet}>
            <Typography variant="body1" color="#123456"  lineHeight={2}>
            {dish.dishname}
            </Typography>
          </Tooltip>
       <TypoPrice price={dish.price}
                  num={dish.ordernum}
                  discount={dish.dishdiscount[0]}/>
            </Grid>


            <Grid item xs={3}>
            <Grid container spacing={0} >
        <Grid item xs={6}>
        <Typography variant="body1" lineHeight={1.3}>
            &nbsp;
            </Typography>
        <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
       props.handleClickMinus(dish.dishid);}}>
          <Minus ordernum={dish.ordernum}/>
          </IconButton> 
         </Grid>
         <Grid  item xs={2}>
         <Typography variant="body1" lineHeight={1.3}>
            &nbsp;
            </Typography>
         <Typography variant="body1" color="#123456"  lineHeight={2.5}>
        {dish.ordernum>0?dish.ordernum:"  "}
       </Typography>
       </Grid>
       <Grid  item xs={4}>
       <Typography variant="body1" lineHeight={1.3}>
            &nbsp;
            </Typography>
        <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
       props.handleClickPlus(dish.dishid);
       }}>
          <Plus ordernum={dish.ordernum}/>
        </IconButton>
        </Grid>
        </Grid>
            </Grid>
            </Grid>
          </ListItem>
        {/* <Divider /> */}
        </List>)
      )}</Box>
    
      <CheckDialog  openSuccess={openSuccess}
                       hdOpS={handleOpenSuccess}
                       hdClS={handleCloseSuccess}
                       addOrder={props.addOrder}
                       handleClear={props.handleClear}
                       dishes={props.dishes}
                       totPrice={price}
                       setAdd={props.setAdd}
                       add={props.add}
                       orderIds={props.orderIds}
                       table_id={props.table_id}
                       username={props.username}
                      //  setLoad={props.setLoad}
                       />
    </>
    
    );
  
}

function ShoppingCartFab(props){
  // const theme=useTheme();
  // const [load, setLoad] = useState<boolean>(false);
  const router=useRouter();
  const user=router.query.user;
  


  console.log(props.promoId);//-1
  console.log("获取用户名为："+user);

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  
  const [orderIds,setOrders]=useState<string[]>([]);
  console.log(orderIds);

  const [add,setAdd]=useState<boolean>(false);
  console.log("加菜而不是创建订单："+add);

  const addOrder=(newOrderId:string)=>{
    let newOne:string[]=[newOrderId];
    let newStrs=orderIds.concat(newOne);
    setOrders(newStrs);
  }

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  return(
    <React.Fragment>
      <ThemeProvider theme={theme}>
       <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} ref={ref} onClick={handleOpen}>
        {fab.icon} 
      </Fab>
    </Box>
    
    <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
      <Box sx={{ borderBottom: 0, borderColor: 0, width:400}}>
        <Tabs value={value}
              onChange={handleChange} 
              aria-label="basic tabs example"
              variant="fullWidth"
              indicatorColor='primary'>
          <Tab label="新加菜" {...a11yProps(0)} />
          <Tab label="已点菜" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>

      <NewList dishes={props.dishes}
                handleClickPlus={props.hdPlus}
                handleClickMinus={props.hdMinus}
                addOrder={addOrder}
                handleClear={props.hdClear}
                promoId={props.promoId}
                setAdd={setAdd}
                add={add}
                orderIds={orderIds}
                table_id={props.table_id}
                username={user}
                />
      
       </TabPanel>
      <TabPanel value={value} index={1} >
     <OrderList orderIds={orderIds}
                username={user}
                table_id={props.table_id}
                dishes={props.dishes}/>
      </TabPanel>
      </Menu></ThemeProvider>
      </React.Fragment>
    
  );
}


export default ShoppingCartFab;


