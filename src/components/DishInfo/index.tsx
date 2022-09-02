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
import {Stack, ButtonBase, SvgIcon, SxProps, Divider, Rating, CardContent } from '@mui/material';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import DishInfoDialog from '../DishInfoDialog';
import DishCommentDialog from '../DishCommentDialog';


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

const InitialDish=(dish) => {
    let shortComment = [];
    let len = Math.min(dish.dishcomment.length,5);
    for(let i=0;i<len;i++) {
        shortComment[i] = dish.dishcomment[i];
    }
    return shortComment;
}

class DishInfo extends Component {
    state = { 
        shortComment:InitialDish(this.props.dish),
    } 
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
                <Box style={{backgroundColor:"#f3f5f9"}}>

                <Card sx={{ minWidth: 75 , ml: 1, mr:1}}>
                <img 
                    src= {this.props.dish.picture}
                    alt="" 
                    style={this.getImgStyles()}
                />
                </Card>
                <Card sx={{ minWidth: 75 , m: 1}} variant="outlined">
                    <div style={{padding: '0 27px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <h2>{this.props.dish.dishname}</h2>
                            </Grid>
                            <Grid item xs={1}>
                                <StarRateIcon sx={{ mt: 2.2,color: '#98313e' }}/>
                            </Grid>
                            <Grid item xs={2}>
                                <h2 style={{fontWeight:'500',color:'#98313e'}}>{this.props.dish.rate.toFixed(1)}</h2>
                            </Grid>
                        </Grid>
                        <Divider />
                        <div>
                            <p style={{fontSize:"18px"}}>{this.props.dish.description}</p>
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
                </Card>
                <Card sx={{ minWidth: 75 , m: 1}} variant="outlined">
                    <p style={{fontSize:"20px",margin:"20px",fontWeight:"700"}}>菜品视频</p>
                    {/* <iframe src="//player.bilibili.com/player.html?bvid=BV1bL4y1N7iX&high_quality=1&danmaku=0" allowfullscreen="allowfullscreen" width="100%" height="400px" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe> */}
                    <iframe src={this.props.dish.video} allowfullscreen="allowfullscreen" width="100%" height="400px" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>
                </Card>
                <Card sx={{ minWidth: 75 , m: 1}} variant="outlined">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                        <p style={{fontSize:"20px",margin:"20px 0 0 16px",fontWeight:"700"}}>顾客评价</p>
                        </Grid>
                        <Grid item xs={4}>
                            <DishCommentDialog 
                                dish={this.props.dish}
                                hdInfoOpen={this.props.hdInfoOpen}
                                hdInfoClose={this.props.hdInfoClose}
                            />
                        </Grid>
                    </Grid>                   
                    {this.props.dish.dishcomment.length ?
                        <CardContent>
                            <List sx={{ width: '100%' }}>
                                {this.state.shortComment.map((item) => (
                                    <Box key={item.comment_time}>
                                        <ListItem style={{padding:"8px 8px 0px 0px"}}>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <img src="/static/images/logo_small.png" style={{width:"100%"}} alt="" />
                                                {/* <PersonIcon /> */}
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.comment_time} secondary={<Rating name="read-only" value={item.comment_star} readOnly />}/>
                                        </ListItem>
                                        <div style={{fontSize:"16px",margin:"0px 0px 10px 5px"}}>{item.comment_content}</div>
                                    </Box>
                                ))}
                            </List>
                        </CardContent>
                        : <p style={{fontSize:"20px", textAlign:"center", margin:"20px",fontWeight:"500"}}>暂无评价哦</p>
                    }
                </Card>
                
                {/* <button onClick={this.test}>
                    <DishInfoDialog 
                      dish={this.props.dish}
                    //   hdPlus={this.handleClickPlus}
                    //   hdMinus={this.handleClickMinus}
                    //   hdSalt={this.handleDishSaltChange}
                    //   hdSpicy={this.handleDishSpicyChange}
                    //   hdSweet={this.handleDishSweetChange}
                    />
                </button> */}
                </Box>
            </React.Fragment>
        );
    }

    getImgStyles() {
        let styles = {
            width: "100%",
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