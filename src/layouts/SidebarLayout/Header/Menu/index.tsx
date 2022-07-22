import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Typography,
  Grid,
  Avatar,
  Paper,
  Stack,
  IconButton

} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRef, useState } from 'react';
import Link from 'src/components/Link';

import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import React from 'react';
import { Container } from '@mui/system';
 import {Plus,Minus} from 'pages/orderdishes/index'

interface NewDishProps{
  dishname:string;
  price:number;
  ordernum:number;
}


const InitNewDish=():Array<NewDishProps>=>{
  return [
      {
          dishname:"清炒土豆丝",
          price:9,
          ordernum:1
      },
      {
          dishname:"番茄炒蛋",
          price:5.5,
          ordernum:1
      }
    ]
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


const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


class NewList extends React.Component<any,any>{
    

    constructor(props){
      super(props);
      this.state={dishes:InitNewDish()};
     this.handleClickPlus=this.handleClickPlus.bind(this);
     this.handleClickMinus=this.handleClickMinus.bind(this);
     }
      handleClickPlus(index:number){
        this.setState(function(state){
            this.state.dishes[index].ordernum++;
            return{dishes:state.dishes};
        });
      }
  
      handleClickMinus(index:number){
        this.setState(function(state){
            if(this.state.dishes[index].ordernum>1)
                this.state.dishes[index].ordernum--;
            else{}//删除
            return{dishes:state.dishes};
        });
      }  

   render(){
    return(
        <div>{
        this.state.dishes.map((dish,index)=>
       <List>  
          <ListItem>
          <Grid container spacing={0}>
           <Grid item xs={8}>
            <Typography variant="body1" color="#123456"  lineHeight={3}>
            {dish.dishname}
            </Typography>
            </Grid>
            <Grid item xs={4}>
           
            <Grid container spacing={0} >
        <Grid item xs={6}>
        <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
       this.handleClickMinus(index);}}>
          <Minus ordernum={dish.ordernum}/>
          </IconButton> 
         </Grid>
         <Grid  item xs={2}>
         <Typography variant="body1" color="#123456"  lineHeight={3}>
        {dish.ordernum>0?dish.ordernum:"  "}
       </Typography>
       </Grid>
       <Grid  item xs={4}>
        <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
       this.handleClickPlus(index);
       }}>
          <Plus ordernum={dish.ordernum}/>
        </IconButton>
        </Grid>
        </Grid>
            </Grid>
            </Grid>
          </ListItem>
        <Divider />
        </List>
      )}
      <Grid container spacing={0}>
      <Grid item xs={9}>&nbsp;</Grid>
      <Grid item xs={3}>
         <Button variant="outlined" size="small">下单</Button>
      </Grid>
      </Grid>
    </div>
    );
  }
}





function HeaderMenu() {
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

  return (
      <>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={Link}
            href="/components/buttons"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Buttons"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={Link}
            href="/components/forms"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Forms"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  已点
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>

     
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>

       {/* <Paper sx={{width:320}}> */}
      <Box sx={{ borderBottom: 0, borderColor: 'divider' ,width:320}}>
        <Tabs value={value}
              onChange={handleChange} 
              aria-label="basic tabs example"
              variant="fullWidth" >
          <Tab label="新加菜" {...a11yProps(0)} />
          <Tab label="已点菜" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <NewList/>
       </TabPanel>
      <TabPanel value={value} index={1} >
        <Typography textAlign={"center"} lineHeight={4} color="#9C9C9C">
         暂无
        </Typography>
      </TabPanel>
  
     {/* </Paper> */}
      </Menu>
     
       </>
   
  );
}

export default HeaderMenu;
