import { SidebarContext } from '@/contexts/SidebarContext';
import { ReleaseTable } from '@/models/release_table';
import { tableApi } from '@/queries/tableStatus';
import {Container, Paper,Typography,Button, Dialog } from '@mui/material';
import NextLink from 'next/link';
import { useContext } from 'react';

export default function CleanDialog(props){
     console.log(props.open);
     let img="/static/images/status/paper.jpg";
    // const { closeSidebar } = useContext(SidebarContext);
    return (
        <Dialog open={props.open} fullScreen={true}>
        <Paper
        sx={{height:'100%',textAlign:'center',
        backgroundImage:`url(${img})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:"cover"
        }}>
            <Container>
            <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>
            <img
            src="/static/images/status/bye.png"></img>
            <p>&nbsp;</p>
            <Typography variant="h3" color="text.secondary" >
            
            期待您的下次光临！

            </Typography>
            <p>&nbsp;</p>
            <NextLink href="/login" passHref>
            <Button variant="contained" size="large"
             onClick={()=>{
                // closeSidebar();
                let upload={
                    table_id:2
                } as ReleaseTable;

                const conduct=async()=>{
                    let ret=tableApi.postReleaseTable(upload);
                    console.log("ret="+ret);
                    return ret;
                }

                conduct().then((value)=>{
                    // alert("清理完成，桌面释放："+value);
                    // window.location.reload();
                }).catch((value)=>{
                    alert("释放桌面失败："+value);
                });
            
            
            }}
            
            >开启新一次用餐！</Button>
            </NextLink>
            </Container>
        </Paper>
        </Dialog>
    );
}
