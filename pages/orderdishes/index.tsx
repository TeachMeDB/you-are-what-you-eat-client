import SidebarLayout from '@/layouts/SidebarLayout';

import { Grid,Box,Stack } from '@mui/material';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
interface DishProps{
    dishname:string;
    picture:string;
    price:number;
}

const InitialDish=():Array<DishProps>=>{
return [
    {
        dishname:"清炒土豆丝",
        price:9,
        picture:"/static/images/status/potato.png"
    },
    {
        dishname:"番茄炒蛋",
        price:5.5,
        picture:"/static/images/status/tomato.png"
    },
    {
        dishname:"炒洋葱",
        price:100.01,
        picture:"/static/images/status/onion.png"
    },
    {
        dishname:"歪比巴卜",
        price:40,
        picture:"/static/images/status/dave.png"
    },
    {
        dishname:"歪比巴卜",
        price:51,
        picture:"/static/images/status/xrk.png"
    },
    {
        dishname:"歪比巴卜",
        price:13238936,
        picture:"/static/images/status/wdss.png"
    }
]
}

function Dishpanel(dishes:Array<DishProps>){

dishes=InitialDish();

  return (
<Box sx={{minWidth:100}}>
 <Grid container spacing={1}> 
    {
        dishes.map((dish:DishProps)=>{
        return (
      <Grid item xs={4} >
        <Card sx={{ minWidth:320 }} >
      <CardMedia
        component="img"
        height="140" 
        image={dish.picture}
        alt="potatochips"
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
          {dish.dishname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {dish.price} 元/份
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">点餐</Button>
        <Button size="small">查看详细评价</Button>
      </CardActions>
     </Card> </Grid>
     );
  
     })
    }
    </Grid> 
    </Box>
  );
}


 Dishpanel.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Dishpanel;
