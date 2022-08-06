import React, { Component } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import StarRateIcon from '@mui/icons-material/StarRate';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import {Stack, ButtonBase, SvgIcon, SxProps } from '@mui/material';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';



export const Minus=(props)=>{
    return(
      props.ordernum>0 &&
    <SvgIcon >
    <path fill="#98313e" d="M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
     </SvgIcon>
     );
}

export const Plus=(props)=>{
    return(
     <SvgIcon >
 <path fill="#98313e" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </SvgIcon>);
  
    
}

class DishInfo extends Component {
    // state = { 
    //     image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F17f9f8c3ed5c7c96d63956d9fd0bbdcb53b7a33824b93-UBXEZI_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661006558&t=37414eaa22292a44caa613e33e809168",
    //     dishName:"美味同济嘉定包菜",
    //     dishDescription:"同济4月新来的包菜，味道鲜美，先到先得，这不比牛腩好吃？",
    //     dishPrice:3.5,
    //     dishSize:"大份",
    //     dishSpicy:"不辣",
    //     dishScore:this.props.dish.rate,
    // } 
    handleDishSaltChange = (event) => {
        this.props.handleDishSaltChange(event,this.props.dish.dishid);
    }
    handleDishSpicyChange = (event) => {
        this.props.handleDishSpicyChange(event,this.props.dish.dishid);
    }
    handleDishSweetChange = (event) => {
        this.props.handleDishSweetChange(event,this.props.dish.dishid);
    }
    test = () => {
        console.log(this.props.index);
        console.log(this.props.dish);
        console.log(this.props);
    }
    render() { 
        return (
            <React.Fragment>
                <img 
                    src= {this.props.dish.picture}
                    alt="" 
                    style={this.getImgStyles()}
                />
                <div style={{padding: '0 27px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <h2>{this.props.dish.dishname}</h2>
                        </Grid>
                        <Grid item xs={1}>
                            <StarRateIcon sx={{ mt: 2.2,color: '#98313e' }}/>
                        </Grid>
                        <Grid item xs={2}>
                            <h2 style={{fontWeight:'500',color:'#98313e'}}>{this.props.dish.rate}</h2>
                        </Grid>
                    </Grid>
                    <div>
                        <p>{this.props.dish.description}</p>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <div>
                                <p style={this.getPriceStyles()}>¥ {this.props.dish.price} / 份</p>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <CardActions sx={{ mt: 1.2}}>

                                <Stack direction="row" >
                                <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                                this.props.handleClickMinus(this.props.dish.dishid);}}>
                                <Minus ordernum={this.props.dish.ordernum}/>
                                </IconButton> 

                                <Typography variant="body1" color="#123456"  lineHeight={3}>
                                {this.props.dish.ordernum>0?this.props.dish.ordernum:"  "}
                                </Typography>
                                <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                                this.props.handleClickPlus(this.props.dish.dishid);
                                }}>
                                <Plus ordernum={this.props.dish.ordernum}/>
                                </IconButton>
                                </Stack>

                            </CardActions>
                        </Grid>
                    </Grid>
                    
                </div>
                <Box
                    noValidate
                    component="form"
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                    }}
                >
                    <Grid container spacing={2} style={{marginBottom: '27px'}}>
                        <Grid item xs={4}>
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <InputLabel htmlFor="dish-salt">咸度</InputLabel>
                                <Select
                                    // autoFocus
                                    value={this.props.dish.dishsalt}
                                    onChange={this.handleDishSaltChange}
                                    label="dishSalt"
                                    inputProps={{
                                    name: 'dish-salt',
                                    id: 'dish-salt',
                                    }}
                                >
                                    <MenuItem value="正常盐">正常盐</MenuItem>
                                    <MenuItem value="少盐">少盐</MenuItem>
                                    <MenuItem value="多盐">多盐</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <InputLabel htmlFor="dish-spicy">辣度</InputLabel>
                                <Select
                                    // autoFocus
                                    value={this.props.dish.dishspicy}
                                    onChange={this.handleDishSpicyChange}
                                    label="dishSpicy"
                                    inputProps={{
                                    name: 'dish-spicy',
                                    id: 'dish-spicy',
                                    }}
                                >
                                    <MenuItem value="不辣">不辣</MenuItem>
                                    <MenuItem value="微辣">微辣</MenuItem>
                                    <MenuItem value="中辣">中辣</MenuItem>
                                    <MenuItem value="重辣">重辣</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <InputLabel htmlFor="dish-sweet">甜度</InputLabel>
                                <Select
                                    // autoFocus
                                    value={this.props.dish.dishsweet}
                                    onChange={this.handleDishSweetChange}
                                    label="dishSweet"
                                    inputProps={{
                                    name: 'dish-sweet',
                                    id: 'dish-sweet',
                                    }}
                                >
                                    <MenuItem value="正常糖">正常糖</MenuItem>
                                    <MenuItem value="少糖">少糖</MenuItem>
                                    <MenuItem value="多糖">多糖</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                                       
                </Box>
                <List sx={{ width: '100%', maxWidth: 360, }}>
                    {this.props.dish.dishcomment.map((item) => (
                        <ListItem key={item.content}>
                            <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.content} secondary={item.time} />
                        </ListItem>
                    ))}
                </List>
                {/* <button onClick={this.test}></button> */}
            </React.Fragment>
        );
    }

    getImgStyles() {
        let styles = {
            width: "100%",
            height: "100%",

        }
        return styles;
    }
    getPriceStyles() {
        let styles = {
            color:"#98313e",
            fontSize: "24px",

        }
        return styles;
    }
}
 
export default DishInfo;