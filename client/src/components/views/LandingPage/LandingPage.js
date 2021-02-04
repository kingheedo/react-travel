import React, { useEffect,useState } from 'react'
import Axios from 'axios'
import { Card , Row,Col, Checkbox} from 'antd';
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider';
import { area,price } from './Sections/Datas';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';


function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(2)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        area:[],
        price:[]
    })
    const [SearchTerm, setSearchTerm] = useState("")
    const renderImages = Products.map((product,index) => {
                return <Col lg={6} md={8} xs={24} span={6} key={index}>
                <Card
                    cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
                >   
                    <Meta title={product.title} description={`$${product.price}`}/>
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
            let body= {
            skip: Skip,
            limit : Limit,
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
    }, [])


    const showFilteredResults = (filters) =>{
        let body= {
            skip: 0,
            limit : Limit,
            filters: filters
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
        setSkip(0)
    }

    const handlePrice = (value) =>{
        const data = price;
        let array = [];
        for(let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array
            }
        }
        return array
    }
    const handleFilters = (filters, category) =>{
        console.log('filters',filters)
        const newFilters = {...Filters}

        if(category === 'price'){
            let priceValue = handlePrice(filters)
            newFilters[category] = priceValue

        }else{
        newFilters[category] = filters
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body ={
            skip: 0,
            limit: Limit,
            filters : Filters,
            searchTerm : newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
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
    }
    return (
        <div style={{width:'75%', margin: '3rem auto'}}>
            <div style={{textAlign:'center'}}>
                <h2>지역별 여행 리스트</h2>
            </div>


            <Row gutter={[16,16]}>
                <Col lg ={12} xs={24}>
                {/* CheckBox */}
                <CheckBox list = {area} handleFilters={filters => handleFilters(filters, "area")}/>
                </Col>
                <Col lg = {12} xs={24}>
                 {/* RadioBox */}
                <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>
            
           {/* Search */}
           <SearchFeature updateSearchTerm = {updateSearchTerm}/>

            {/* ProductCard */}
            <Row gutter={[16, 16]}>
                {renderImages}
            </Row>

            <br/>
            {/* LoadMore */}
            {PostSize >= Limit &&
            <div style={{display:'flex' ,justifyContent:"center"}}>
                <button onClick={loadMoreHandler}>더 보기</button>
            </div>
            }
        </div>
    )
}

export default LandingPage
