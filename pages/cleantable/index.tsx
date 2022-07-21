import { SidebarContext } from '@/contexts/SidebarContext';
import {Container, Paper,Typography,Button } from '@mui/material';
import NextLink from 'next/link';
import { useContext } from 'react';
export default function Cleantable(){
    const { closeSidebar } = useContext(SidebarContext);
    return (
        <Paper
        sx={{height:'100%',textAlign:'center' }}
             background-img= "/static/images/status/clean.png">
            <Container>
            <Typography variant="h1" color="text.secondary" >
            <p>&nbsp;</p><p>&nbsp;</p>
            桌面清理中...

            </Typography>
            <p>&nbsp;</p>
            <NextLink href="/orderdishes" passHref>
            <Button variant="outlined" size="large"
             onClick={closeSidebar}
            
            >点击完成</Button>
            </NextLink>
            </Container>
        </Paper>
    );
}
