import React from 'react'
import { Descriptions, Button } from 'antd';
import  {useDispatch} from 'react-redux'
import { addToCart } from '../../../../_actions/user_actions';
function ProductInfo(props) {
    //redux에 user정보가 있기 때문에 redux에도 cart 정보를 넣어준다.
    const dispatch = useDispatch()
    const clickHandler = () =>{
    //필요한 정보를 Cart 필드에다가 넣어준다.
    dispatch(addToCart(props.product._id))
    }


    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Price">{props.product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.product.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.product.view}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.product.description}</Descriptions.Item>
            </Descriptions>
            <br/>
            <br/>
            <br/>
            <div style={{display: 'flex',justifyContent: 'center'}}>
                <Button size="large" shape="round" type="danger" onClick = {clickHandler} >Add To CART</Button>
            </div>
        </div>
    )
}

export default ProductInfo
