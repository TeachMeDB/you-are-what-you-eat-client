import SidebarLayout from '@/layouts/SidebarLayout';
import { styled } from '@mui/material/styles';
import {Grid,Box,Stack, ButtonBase, SvgIcon, Button, Container, Paper, CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DishInfo from '../../src/components/DishInfo/index'
import MaxWidthDialog from '../../src/components/DishInfoDialog/index'
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import NextLink from 'next/link';
import { useContext } from 'react';
import { SidebarContext } from '@/contexts/SidebarContext';

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
        <Typography variant="h1" color="text.secondary" >
           这道菜怎么样？
        </Typography>
    );
    else 
    return(
        <Typography variant="h1" color="text.secondary" >
           本次服务体验如何？
        </Typography>
    );
}
const labels: { [index: string]: string } = {
    0.5: '极差',
    1: '很差',
    1.5: '差',
    2: '比较差',
    2.5: '有点差',
    3: '一般',
    3.5: '还好',
    4: '不错',
    4.5: '好',
    5: '非常好',
  };
  
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  
const LeftArrow=()=>{
    return(
        <SvgIcon sx={{ fontSize: 60 }}>
    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
</SvgIcon>
    );
}

const RightArrow=()=>{
    return(
        <SvgIcon  sx={{ fontSize: 60 }}>
   <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
</SvgIcon>
    );
}
const dishes=FinalDish();
function DishCard(props){
  if(props.index <= props.maxIndex){
    console.log(props.index);
    console.log(props.maxIndex);
  return(
    <Card sx={{ maxWidth: 345 }} >
    <CardActionArea>
      <CardMedia
        component="img"
        height={190}
        image={dishes[props.index].picture}
        alt="dishpic"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dishes[props.index].dishname}
        </Typography>
          </CardContent>
            </CardActionArea>
           </Card>

  );}
  else
  {
    console.log("123");
    return <img src="/static/images/status/service.png"/>
  }
}
function Ratepanel() {
  
   let maxIndex=dishes.length-1;
   //let index=0;
   const [dishend,setDishend]=React.useState<number | null>(0);
   const [value, setValue] = React.useState<number | null>(5);
   const [hover, setHover] = React.useState(-1);
   let [index,setIdx]=React.useState<number|null>(0);
        return(
        <Paper
        sx={{height:'100%',textAlign:'center' }}>
            <Container>
            <p>&nbsp;</p><p>&nbsp;</p>
            <Promt dishend={dishend}/>
            <p>&nbsp;</p>
            <Grid container spacing={10}>
                <Grid item xs={4}>
                    <Button size="large"
                     onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                        index--;
                        if(index>=0) setIdx(index);
                        if(index<=maxIndex)setDishend(0);
                        else index++;
                        }}><LeftArrow/></Button></Grid>
                <Grid item xs={4}>
              <DishCard index={index} maxIndex={maxIndex}/>
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
  precision={0.5}
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
        /></Grid>
        <Grid item xs={4}>
            <p>&nbsp;</p>
        </Grid>
        
        </Grid>
            </Container>
            </Paper>
         
        );
}

export default Ratepanel;
