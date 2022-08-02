import { AddShoppingCart } from "@mui/icons-material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { SxProps, Box, Fab, Menu, Typography, Button, Divider, Grid, IconButton, List, ListItem, createTheme } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useRef, useState } from "react";
import { Minus, Plus } from "pages/orderdishes";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import OrderList from "../Order";

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

const InitNewDish=():Array<NewDishProps>=>{
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
          dishname:"虾仁粉丝煲",
          price:25.5,
          picture:"/static/images/status/fans.jpg",
          ordernum:2
      } ,
      {
        dishname:"炒洋葱",
        price:48,
        picture:"/static/images/status/onion.png",
        ordernum:1
    },
    {
        dishname:"北京烤鸭",
        price:40,
        picture:"/static/images/status/duck.jpg",
        ordernum:1
    },
    {
        dishname:"干锅花菜",
        price:51,
        picture:"/static/images/status/broc.jpg",
        ordernum:1
    },
    {
        dishname:"土豆牛肉",
        price:50,
        picture:"/static/images/status/beef.jpg",
        ordernum:1
    },
    {
        dishname:"新疆羊肉串",
        price:38,
        picture:"/static/images/status/muttonchuan.jpg",
        ordernum:1
    },
    {
        dishname:"鱼豆腐",
        price:20.5,
        picture:"/static/images/status/tofu.png",
        ordernum:1
    },
    ]
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



class NewList extends React.Component<any,any>{
    

   render(){
    console.log(this.props.dishes.length);
    let empt=true;
    for(let i=0;i<this.props.dishes.length;i++)
        if(this.props.dishes[i].ordernum>0){empt=false;break;}
  
    if(empt)
    return( <Typography textAlign={"center"} lineHeight={4} color="#9C9C9C">
    暂无</Typography>);

    else
    return(
        <>{
        this.props.dishes.map((dish,index)=>
       dish.ordernum>0&&(<List>  
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
            <Grid container spacing={0} >
        <Grid item xs={6}>
        <Typography variant="body1" lineHeight={1.3}>
            &nbsp;
            </Typography>
        <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
       this.props.handleClickMinus(dish.dishid);}}>
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
       this.props.handleClickPlus(dish.dishid);
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
      )}
       <Button 
          style={{
            width:"100%",
            backgroundColor:"#98313e",
            color:"white",
            borderRadius:"0"
          }}>
       下单</Button>
    </>
    );
  }
}

function ShoppingCartFab(props){
  // const theme=useTheme();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

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
                handleClickMinus={props.hdMinus}/>
      
       </TabPanel>
      <TabPanel value={value} index={1} >
     <OrderList/>
      </TabPanel>
      </Menu></ThemeProvider>
      </React.Fragment>
    
  );
}


export default ShoppingCartFab;