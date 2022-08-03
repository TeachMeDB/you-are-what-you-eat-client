import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DishInfo from '../DishInfo/index';
import { Container, Typography } from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';

const theme = createTheme({
    palette: {
      primary: {
        main: "#98313e",
      },
      secondary:{
        main:"rgba(255, 255, 255, 0.74)"
      }
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
  

export default function PromoInfo(props){
    const str="/static/images/status/promo_"+props.id+".png";
    return(
        <ThemeProvider theme={theme}>
        <img src= {str} width="100%" height="100%"/>
        {/* <Typography color="#696969" lineHeight={4}>&nbsp;&nbsp;&nbsp;活动促销菜品</Typography> */}
        <Container sx={{textAlign:"center"}}>
        
        </Container>
        </ThemeProvider>
    );
}