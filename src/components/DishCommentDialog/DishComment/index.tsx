import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {Rating, CardContent } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';


class DishComment extends Component {
    render() { 
        return (
            <React.Fragment>
                <Card sx={{ minWidth: 75 ,minHeight: 700, m: 1}} variant="outlined">
                    <p style={{fontSize:"20px",margin:"20px 0 0 16px",fontWeight:"700"}}>全部评价</p>
                    {this.props.dish.dishcomment.length ?
                        <CardContent>
                            <List sx={{ width: '100%' }}>
                                {this.props.dish.dishcomment.map((item) => (
                                    <Box key={item.comment_time}>
                                        <ListItem style={{padding:"8px 8px 0px 0px"}}>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <img src="/static/images/logo_small.png" style={{width:"100%"}} alt="" />
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
            </React.Fragment>
        );
    }
}
 
export default DishComment;