import React, { useEffect,useState } from 'react'
import Axios from 'axios'
import { Card , Row,Col} from 'antd';
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider';
function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(2)
    const [PostSize, setPostSize] = useState(0)
    const renderImages = Products.map((product,index) => {
                return <Col lg={6} md={8} xs={24} span={6} key={index}>
                <Card
                    cover={<ImageSlider images={product.images}/>}
                >
                    <Meta title={product.title} description={product.description}/>
                </Card>
                </Col>
           })
    const loadMoreHandler= () =>{
        let skip = Skip + Limit
        let body= {
            skip: skip,
            limit : Limit,
            loadMore:true
        }
        Axios.post('/api/product/products',body)
        .then(response => {
                // console.log(response.data)
            if(response.data.success){
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productsInfo])
                }else{
                setProducts(response.data.productsInfo)
                }
                setPostSize(response.data.postSize)
            }else{
                alert("상품을 가져오는데 실패했습니다.")
            }
        })
        setSkip(skip)
    }
    useEffect(() => {

        
         Axios.post('/api/product/products')
        .then(response => {
                // console.log(response.data)
            if(response.data.success){
                
                setProducts(response.data.productsInfo.slice(0,2))
                setPostSize(response.data.postSize)
            }else{
                alert("상품을 가져오는데 실패했습니다.")
            }
        })
    }, [])
    return (
        <div style={{width:'75%', margin: '3rem auto'}}>
            <div style={{textAlign:'center'}}>
                <h2>지역별 여행 리스트</h2>
            </div>

            <Row gutter={[16, 16]}>
                {renderImages}
            </Row>

            <br/>

            {PostSize > Limit &&
            <div style={{display:'flex' ,justifyContent:"center"}}>
                <button onClick={loadMoreHandler}>더 보기</button>
            </div>
            }
        </div>
    )
}

export default LandingPage
