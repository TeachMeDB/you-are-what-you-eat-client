import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'


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
        description:"五周年感恩回馈",
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
      },
      {
        promotion_id:103,
        description:"疯狂星期四",
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
             dish_id:104,
             dish_name:"北京烤鸭",
             dish_price:100,
             dish_description:"绝对正宗",
             dish_picture:"/static/images/status/duck.jpg"
           },
          discount:0.9
       }
        ]
      }
    ];
  }
  

export default function PromotionAd(props)
{
    const promotions=InitialPromo();
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            {
                promotions.map( (promo, index) =>
                 <Item key={index} item={promo} />
            )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper sx={{minHeight:300}}>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}