import React, { useState } from 'react'
import {PlusOutlined} from '@ant-design/icons'
import Dropzone from 'react-dropzone'
import Axios from 'axios';
function ImageUpload() {
    const [images, setImages] = useState([])
    const dropHandler = (files) =>{
        // console.log(files)
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0])
         Axios.post('/api/product/image',formData, config)
         .then(response => {
             if(response.data.success){
                //  console.log(response.data)
                setImages([...images,response.data.filePath])
             }else{
                 alert("이미지 업로드에 실패하였습니다.")
             }
         })
    }

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div 
                    style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex', justifyContent:'center', alignItems:'center'}} 
                    {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined />
                    </div>
                    </section>
                )}
            </Dropzone>
            <div style={{display:'flex',width:'350px', height:'240px', overflowX:'scroll'}}>
                {images.map(image => (
                    <img style={{width:'300px', height:'240px'}} src = {`http://localhost:5000/${image}`}/>
                ))}
            </div>
        </div>
            
    )
}

export default ImageUpload
