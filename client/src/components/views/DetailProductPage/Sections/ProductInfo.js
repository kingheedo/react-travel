import React from 'react'
import { Descriptions, Button } from 'antd';

function ProductInfo(props) {
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
                <Button size="large" shape="round" type="danger" onClick>Add To CART</Button>
            </div>
        </div>
    )
}

export default ProductInfo
