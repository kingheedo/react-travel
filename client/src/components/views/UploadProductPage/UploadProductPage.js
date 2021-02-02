import React, { useState } from 'react'
import { Form, Input,Typography, Button } from 'antd';
import Axios from 'axios';
import ImageUpload from '../../utils/ImageUpload';
const {TextArea} = Input;
const {Title} = Typography;
const Area = [
        {key:1, value: "Seoul"},
        {key:2, value: "Gyeonggi-do"},
        {key:3, value: "Daejeon"},
        {key:4, value: "Dae-gu"},
        {key:5, value: "Busan"},
    ]

function UploadProductPage(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [area, setArea] = useState(1)
    const [images, setImages] = useState([])
    const titleChangeHandler = (event) =>{
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) =>{
        setDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const areaChangeHandler = (event) =>{
        setArea(event.currentTarget.value)
    }
    const submitHandler = (event) => {
        event.preventDefault();
        if(!title || !description || !price || !area){
            
            return alert('빈 칸을 확인해주세요')
        }
        const body = {
            writer: props.user.userData._id,
            title,
            description,
            price,
            images,
            area
        }
        Axios.post('/api/product', body)
        .then(response =>{
            if(response.data.success) {
                alert("상품 업로드에 성공했습니다.")
            }else{
                alert("상품 업로드에 실패했습니다.")
            }
        })
    }
    const updateImage = (newImages) =>{
        setImages(newImages)
    }
    return (
        <div style={{maxWidth:"700px", margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom:"2rem"}}>
                <Title level={2}>
                    Upload Product
                </Title>
            </div>
            <br/>
            <br/>
            <Form onSubmit = {submitHandler}>
                {/* Dropzone */}
                <ImageUpload connectFunction={updateImage}/>
                <br/>
                <br/>
                <label>이름</label>
                <Input type="text" onChange={titleChangeHandler} value={title}/>
                <br/>
                <br/>
                <label>설명</label>
                <TextArea type="text" onChange={descriptionChangeHandler} value={description}/>
                <br/>
                <br/>
                <label>가격($)</label>
                <Input type="number" onChange ={priceChangeHandler} value={price}/>
                <br/>
                <br/>
                <select onChange={areaChangeHandler} value={area}>
                    {Area.map(item => (
                        <option key={item.key} value={item.key}>
                            {item.value}
                        </option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type="submit" onClick={submitHandler}>확인</Button>
            </Form>
            
        </div>
    )
}

export default UploadProductPage
