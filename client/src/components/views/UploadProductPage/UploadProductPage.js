import React, { useState } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { Typography } from 'antd';
const {TextArea} = Input;
const {Title} = Typography;

function UploadProductPage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)

    const titleChangeHandler = (event) =>{
        setTitle(event.target.value)
    }

    const descriptionChangeHandler = (event) =>{
        setDescription(event.target.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.target.value)
    }
    return (
        <div style={{maxWidth:"700px", margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom:"2rem"}}>
                <Title level={2}>
                    Upload Product
                </Title>
            </div>
            <Form>
                <label>이름</label>
                <Input type="text" onChange={titleChangeHandler} value={title}/>
                <label>설명</label>
                <TextArea type="text" onChange={descriptionChangeHandler} value={description}/>
                <label>가격($)</label>
                <Input type="number" onChange ={priceChangeHandler} value={price}/>
            </Form>
            
        </div>
    )
}

export default UploadProductPage
