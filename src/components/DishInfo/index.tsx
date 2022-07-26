import React, { Component } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import StarRateIcon from '@mui/icons-material/StarRate';


class DishInfo extends Component {
    state = { 
        image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F17f9f8c3ed5c7c96d63956d9fd0bbdcb53b7a33824b93-UBXEZI_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661006558&t=37414eaa22292a44caa613e33e809168",
        dishName:"美味同济嘉定包菜",
        dishDescription:"同济4月新来的包菜，味道鲜美，先到先得，这不比牛腩好吃？",
        dishPrice:3.5,
        dishSize:"大份",
        dishSpicy:"不辣",
        dishScore:4.9,
    } 
    handleDishSizeChange = (event) => {
        this.setState({
            dishSize: event.target.value
        });
    }
    handleDishSpicyChange = (event) => {
        this.setState({
            dishSpicy: event.target.value
        });
    }

    render() { 
        return (
            <React.Fragment>
                <img 
                    src= {this.state.image}
                    alt="" 
                    style={this.getImgStyles()}
                />
                <div>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <h2>{this.state.dishName}</h2>
                    </Grid>
                    <Grid item xs={1}>
                        <StarRateIcon sx={{ mt: 2.2,color: '#98313e' }}/>
                    </Grid>
                    <Grid item xs={2}>
                        <h2 style={{fontWeight:'500',color:'#98313e'}}>{this.state.dishScore}</h2>
                    </Grid>
                </Grid>
                    <div>
                        <p>{this.state.dishDescription}</p>
                    </div>
                    <div>
                        <p style={this.getPriceStyles()}>¥ {this.state.dishPrice} / 份</p>
                    </div>
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
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <InputLabel htmlFor="dish-size">大小</InputLabel>
                                <Select
                                    // autoFocus
                                    value={this.state.dishSize}
                                    onChange={this.handleDishSizeChange}
                                    label="dishSize"
                                    inputProps={{
                                    name: 'dish-size',
                                    id: 'dish-size',
                                    }}
                                >
                                    <MenuItem value="大份">大份</MenuItem>
                                    <MenuItem value="中份">中份</MenuItem>
                                    <MenuItem value="小份">小份</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <InputLabel htmlFor="dish-spicy">辣度</InputLabel>
                                <Select
                                    // autoFocus
                                    value={this.state.dishSpicy}
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
                    </Grid>
                    
                    
                </Box>
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