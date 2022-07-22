import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';


class DishInfo extends Component {
    state = { 
        image:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F17f9f8c3ed5c7c96d63956d9fd0bbdcb53b7a33824b93-UBXEZI_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661006558&t=37414eaa22292a44caa613e33e809168",
        dishName:"美味同济嘉定包菜",
        dishDescription:"同济4月新来的包菜，味道鲜美，先到先得，这不比牛腩好吃？",
        dishPrice:3.5,
        dishSize:"大份",
    } 
    handleDishSizeChange = (event) => {
        this.setState({
            dishSize: event.target.value
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
                    <h2>{this.state.dishName}</h2>
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
            color:"red",
            fontSize: "24px",

        }
        return styles;
    }
}
 
export default DishInfo;