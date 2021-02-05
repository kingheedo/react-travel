import React, { useEffect,useState } from 'react'
import ImageGallery from 'react-image-gallery';
function ProductImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {

        if(props.product.images && props.product.images.length > 0){
            let images = [];
            
            props.product.images.map((image,index) => {
                images.push({
                    original: `http://localhost:5000/${image}`,
                    thumbnail: `http://localhost:5000/${image}`
                })
            })
            setImages(images)
        }
    }, [props.product])

    return (
        <div>
            <ImageGallery items={Images} />;
        </div>
    )
}

export default ProductImage
