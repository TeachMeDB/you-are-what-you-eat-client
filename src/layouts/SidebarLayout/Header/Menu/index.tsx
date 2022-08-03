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
  IconButton, 
  createTheme,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup

} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRef, useState } from 'react';
import Link from 'src/components/Link';
import { ThemeProvider } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import React from 'react';
import { Container } from '@mui/system';
import {Plus,Minus} from 'pages/orderdishes/index';

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
)

interface DishProps{
  dish_id:number,
  dish_name:string,
  dish_price:number,
  dish_description:string,
  dish_picture:string
}

interface DishesProps{
  dish:DishProps,
  discount:number
}
interface PromotionProps{
     promotion_id:number,
     description:string,
     dishes:Array<DishesProps>
}

const InitialPromo=():Array<PromotionProps>=>{
  return [
    {
      promotion_id:101,
      description:"情人节特惠",
      dishes:[
      {
         dish:{
            dish_id:101,
            dish_name:"清炒土豆丝",
            dish_price:9,
            dish_description:"简单的做法，极致的美味",
            dish_picture:"/static/images/status/potato.png"
          },
         discount:0.8
      }
      ]
    },
    {
      promotion_id:102,
      description:"五周年回馈",
      dishes:[
      {
         dish:{
            dish_id:102,
            dish_name:"番茄炒蛋",
            dish_price:5.5,
            dish_description:"有点甜",
            dish_picture:"/static/images/status/tomato.png"
         },
         discount:0.8
      },
      {
        dish:{
           dish_id:101,
           dish_name:"清炒土豆丝",
           dish_price:9,
           dish_description:"简单的做法，极致的美味",
           dish_picture:"/static/images/status/potato.png"
         },
        discount:0.5
     }
      ]
    }
  ];
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
    <ThemeProvider theme={theme}>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex" color="primary">
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
                  最新活动
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
        <Container sx={{minWidth:350}} >
        <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
          
    </Container>
        </Menu>
        </ThemeProvider>
      </>
  )
}

export default HeaderMenu;
