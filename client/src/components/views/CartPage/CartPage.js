import React,{useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import {Empty,Result} from 'antd'
import PayPal from '../../utils/PayPal'
function CartPage(props) {
    const [Total, setTotal] = useState(0)
    const dispatch = useDispatch()
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    useEffect(() => {
            let cartItems =[] 

            //리덕스 User State 안에 Cart 안에 상품이 들어있는지 확인
            if(props.user.userData && props.user.userData.cart) {
                if(props.user.userData.cart.length > 0){
                    props.user.userData.cart.forEach(item =>{
                        cartItems.push(item.id)
                    })
                    console.log(cartItems)
                    dispatch(getCartItems(cartItems,props.user.userData.cart))
                    .then(response => {
                        // console.log("response",response.payload)
                        calculateTotal(response.payload)
                    })
                }
            }
        

    }, [props.user.userData])

    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
        total += parseInt(item.price, 10) * item.quantity
        })
        setTotal(total)
        setShowTotal(true)
    }

    let removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
        .then( response => {
            if(response.payload.productInfo.length <= 0) {
            setShowTotal(false)
        }
        })
        
    }

    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
        .then(response => {
            if(response.payload.success){
                setShowTotal(false)
                setShowTotal(true)
            }
        })
    }
    return (
        <div style ={{width: '85%', margin: '3rem auto'}}>
            <h1>My Cart</h1>
            <div>
                <UserCardBlock removeItem={removeFromCart} products={props.user.cartDetail}/>
            </div>
            
            
            {ShowTotal ? 
            <div style={{marginTop:'3rem'}}>
                <h2>Total Amount: ${Total}</h2>
            </div>
            
            : ShowSuccess?
            <Result
            status="success"
            title="Successfully Purchased Items!"
            />
            :
            <>
            <br/>
            <Empty description={false}/>
            </>
           
        }
             {ShowTotal &&
                <PayPal total = {Total}
                onSuccess = {transactionSuccess}/>
            }
        </div>
    )
}

export default CartPage
