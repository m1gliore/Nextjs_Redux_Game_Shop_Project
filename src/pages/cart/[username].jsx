import React, {useContext, useState} from "react";
import * as StyledCartPage from "../../components/StyledCartPage";
import {Add, Remove} from "@mui/icons-material";
import {convertCurrency, convertToNumber, currencySign} from "../../lib/Currency";
import CurrencyContext from "../../context/CurrencyContext";
import {useSelector} from "react-redux";
import {calculateTotal, updateQuantity} from "../../lib/Cart";

const CartPage = () => {
    const currency = useContext(CurrencyContext)
    const {quantity} = useSelector(state => state.cart)
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: "Game 1",
            price: 1499,
            quantity: 2,
            image: "/images/product_1.jpg",
        },
        {
            id: 2,
            title: "Game 2",
            price: 1999,
            quantity: 1,
            image: "/images/product_2.jpg",
        },
        {
            id: 3,
            title: "Game 3",
            price: 2299,
            quantity: 3,
            image: "/images/product_3.jpg",
        }
    ])

    const price = calculateTotal(cartItems)
    const delivery = 0.15 * price
    const discount = 0.03 * price
    const total = convertToNumber(convertCurrency(currency, price)) +
        convertToNumber(convertCurrency(currency, delivery)) -
        convertToNumber(convertCurrency(currency, discount))

    const handleQuantityChange = (id, action) => {
        const updatedItems = updateQuantity(cartItems, id, action)
        setCartItems(updatedItems)
    }

    return (
        <StyledCartPage.CartContainer>
            <StyledCartPage.Title>Ваша корзина</StyledCartPage.Title>
            <StyledCartPage.Top>
                <StyledCartPage.TopButton filled>Оплатить</StyledCartPage.TopButton>
                <StyledCartPage.TopTextContainer>
                    <StyledCartPage.TopText>Корзина ({quantity})</StyledCartPage.TopText>
                </StyledCartPage.TopTextContainer>
                <StyledCartPage.TopButton>Продолжить покупки</StyledCartPage.TopButton>
            </StyledCartPage.Top>
            <StyledCartPage.Bottom>
                <StyledCartPage.Info>
                    {cartItems.map((item) => (<StyledCartPage.Product>
                        <StyledCartPage.ProductDetail>
                            <StyledCartPage.Image src={item.image} alt={item.title}/>
                            <StyledCartPage.Details>
                                <StyledCartPage.ProductName><b>Игра:</b> {item.title}</StyledCartPage.ProductName>
                            </StyledCartPage.Details>
                        </StyledCartPage.ProductDetail>
                        <StyledCartPage.PriceDetail>
                            <StyledCartPage.AmountContainer>
                                <Add style={{cursor: "pointer"}}
                                     onClick={() => handleQuantityChange(item.id, "increase")}/>
                                <StyledCartPage.Amount>{item.quantity}</StyledCartPage.Amount>
                                <Remove style={{cursor: "pointer"}}
                                        onClick={() => handleQuantityChange(item.id, "decrease")}/>
                            </StyledCartPage.AmountContainer>
                            <StyledCartPage.Price>{convertCurrency(currency, item.price)}</StyledCartPage.Price>
                        </StyledCartPage.PriceDetail>
                    </StyledCartPage.Product>))}
                </StyledCartPage.Info>
                <StyledCartPage.Summary>
                    <StyledCartPage.SummaryTitle>Общая сумма</StyledCartPage.SummaryTitle>
                    <StyledCartPage.SummaryItem>
                        <StyledCartPage.SummaryItemText>Стоимость товаров</StyledCartPage.SummaryItemText>
                        <StyledCartPage.SummaryItemPrice>{convertCurrency(currency, price)}</StyledCartPage.SummaryItemPrice>
                    </StyledCartPage.SummaryItem>
                    <StyledCartPage.SummaryItem>
                        <StyledCartPage.SummaryItemText>Доставка</StyledCartPage.SummaryItemText>
                        <StyledCartPage.SummaryItemPrice>{convertCurrency(currency, delivery)}</StyledCartPage.SummaryItemPrice>
                    </StyledCartPage.SummaryItem>
                    <StyledCartPage.SummaryItem>
                        <StyledCartPage.SummaryItemText>Скидка</StyledCartPage.SummaryItemText>
                        <StyledCartPage.SummaryItemPrice>{convertCurrency(currency, discount)}</StyledCartPage.SummaryItemPrice>
                    </StyledCartPage.SummaryItem>
                    <StyledCartPage.SummaryItem large>
                        <StyledCartPage.SummaryItemText>Конечная сумма</StyledCartPage.SummaryItemText>
                        <StyledCartPage.SummaryItemPrice>{currencySign(currency, total)}</StyledCartPage.SummaryItemPrice>
                    </StyledCartPage.SummaryItem>
                    <StyledCartPage.SummaryButton>Оплатить</StyledCartPage.SummaryButton>
                </StyledCartPage.Summary>
            </StyledCartPage.Bottom>
        </StyledCartPage.CartContainer>
    )
}

export default CartPage
