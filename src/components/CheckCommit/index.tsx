import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CommitOrderUpload, DishesInfo } from "@/models/commit_order";
import { orderApi } from "@/queries/order";
import { AddDish } from '@/models/add_dish';
import { addDishApi } from '@/queries/addDish';



export default function CheckDialog(props) {
 const [openAlert,setOpenAlert]=React.useState(false);
 
 console.log("购物车获取用户名："+props.username);
 const handleOpenAlert = () => {
    console.log("打开alert");
    setOpenAlert(true);
  };
  
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  console.log("确认下单弹窗");
  console.log(props.open);

  let price=props.totPrice.toFixed(2);
  return (
    <React.Fragment>
           <Button 
          style={{
            width:"100%",
            backgroundColor:"#98313e",
            color:"white",
            borderRadius:"0"
          }}
          onClick={handleOpenAlert}
         >
        
      ￥{price} 下单</Button>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          确认要下单吗？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            *&nbsp;一旦确认无法撤回订单哦
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus
                  onClick={()=>{
    handleCloseAlert();
    let testData:DishesInfo[]=[];

    for(let i=0;i<props.dishes.length;i++){
      if(props.dishes[i].ordernum>0){
            let addOne:DishesInfo[]=[{
             dish_id:props.dishes[i].dishid,
             dish_num:props.dishes[i].ordernum,
             dish_price_to_pay:props.dishes[i].price*props.dishes[i].dishdiscount[0],
            //  remark:"没有备注"
            remark:props.dishes[i].dishsalt+", "+props.dishes[i].dishspicy+", "
            +props.dishes[i].dishsweet
                   
            }];
            testData=testData.concat(addOne);
      }
    }  

    //下面选择新建订单还是加菜
    if(props.add===false){//新建订单


    let upload={
     dishes_info:testData,
     table_id:3,
     username:"default"
    } as CommitOrderUpload;
    
    upload.table_id=props.table_id;
    if(props.username!=undefined) upload.username=props.username;
    
   const conduct=async()=>{
    console.log("提交订单的内容");
     console.log(upload);
      return orderApi.postOrderList(upload);
   }
     
    conduct().then((value)=>{
     
     //下单成功提示
     // alert("创建订单:"+value);
     props.setAdd(true);
     
     props.hdOpS();
     //添加订单
     props.addOrder(value);
     //清空购物车
     props.handleClear();

     // RetAlert(value);
     //这里不需要刷新界面
     // window.location.reload();
    }).catch((value)=>{
      alert("下单失败:"+value);
    });
  
  }
  else{//加菜
    let upload={
      dishes_info:testData,
      table_id:3,
      order_id:"0"
     } as AddDish;
   
     console.log("已有订单："+props.orderIds);
     upload.order_id=props.orderIds[0];
     upload.table_id=props.table_id;

    const conduct=async()=>{
     console.log("增加订单内容");
      console.log(upload);
       return addDishApi.postAddDish(upload);
    }
      
     conduct().then((value)=>{
      
      //下单成功提示
      // alert("创建订单:"+value);
      props.setAdd(true);
      
      props.hdOpS();//打开 下单成功 弹窗
      //添加订单
      // props.addOrder(value);
      //清空购物车
      props.handleClear();
      // RetAlert(value);
      //这里不需要刷新界面
      // window.location.reload();
     }).catch((value)=>{
       alert("增加点菜失败:"+value);
     });
  }

 } } 
          >
            确认
            </Button>

          <Button onClick={handleCloseAlert} >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
  );
}
