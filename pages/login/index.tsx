import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Router from "next/router"
import SignUpVip from './register';
import { queryVipApi } from '@/queries/query_vip';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

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


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/login/">
        人如其食
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    // });
    if (! data.get('email').toString()) {
        return;
    }
    const conduct=async()=>{
        // console.log("测试徐满心登录",data.get('email'));
        return queryVipApi.getOneVIPInfo(data.get('email').toString());
    } 
    conduct().then((value)=>{
        if(value) {
            // console.log(value)
            Router.push({pathname: '/orderdishes', query: {user:value.user_name}})
        } else {
            // alert("您输入的会员号无效，请检查后输入！")
            handleOpenSuccess();
        }
    }).catch((value)=>{
        alert("登录api寄了"+value);
    });
  };

  const goToOrderDishes = () => {
    Router.push({pathname: '/orderdishes', query: {}})
  }

  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false);

    const handleOpenSuccess = () => {
        setOpenSuccess(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar 
        open={openSuccess} 
        anchorOrigin={{ vertical:'top', horizontal:'center' }} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="error" sx={{ width: '100%' }}>
            您输入的会员号无效，请检查后输入！
        </Alert>
      </Snackbar>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mt: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src="/static/images/logo.png" alt="logo" style={{width:"75%"}}/>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              会员登录
            </Typography>
          </Box>
          <Box
            sx={{
              mb: 4,
              mx: 4,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="请输入您的会员号"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 0 }}
                            >
                            会员登录
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <SignUpVip/>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={goToOrderDishes}
                        >
                        暂不登录？直接点餐
                    </Button>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}