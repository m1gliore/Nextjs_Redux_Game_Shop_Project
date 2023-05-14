import React, {useContext, useEffect, useState} from "react";
import * as StyledCartPage from "../../components/StyledCartPage";
import {Add, Remove} from "@mui/icons-material";
import {convertCurrency, convertToNumber, currencySign} from "../../lib/Currency";
import CurrencyContext from "../../context/CurrencyContext";
import {useDispatch, useSelector} from "react-redux";
import {calculateTotal} from "../../lib/Cart";
import {clearCart, updateGameQuantity} from "../../redux/actions/cart";
import {useRouter} from "next/router";

const CartPage = () => {
    const currency = useContext(CurrencyContext)
    const {quantity, games} = useSelector(state => state.cart)
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        setCartItems(games)
    }, [games])

    const price = calculateTotal(cartItems)
    const discount = 0.05 * price
    const total = (convertToNumber(convertCurrency(currency, price)) -
        convertToNumber(convertCurrency(currency, discount)))

    const handleQuantityChange = (id, action) => {
        dispatch(updateGameQuantity({itemId: id, actionType: action}))
    }

    const handlePayment = () => {
        dispatch(clearCart())
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
                    {cartItems?.map((item) => (<StyledCartPage.Product key={item.id}>
                        <StyledCartPage.ProductDetail>
                            <StyledCartPage.Image src={item.image} alt={item.name}
                                                  onClick={() => {
                                                      const route = item.id.split("-")[1]
                                                      route === "game"
                                                          ? router.push(`/games/${item.id}`)
                                                          : router.push(`/dlcs/${item.id}`)
                                                  }}/>
                            <StyledCartPage.Details>
                                <StyledCartPage.ProductName><b>Игра:</b> {item.name}</StyledCartPage.ProductName>
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
                        <StyledCartPage.SummaryItemText>Скидка</StyledCartPage.SummaryItemText>
                        <StyledCartPage.SummaryItemPrice>{convertCurrency(currency, discount)}</StyledCartPage.SummaryItemPrice>
                    </StyledCartPage.SummaryItem>
                    <StyledCartPage.SummaryItem large>
                        <StyledCartPage.SummaryItemText>Конечная сумма</StyledCartPage.SummaryItemText>
                        <StyledCartPage.SummaryItemPrice>{currencySign(currency, total)}</StyledCartPage.SummaryItemPrice>
                    </StyledCartPage.SummaryItem>
                    <StyledCartPage.SummaryButton onClick={handlePayment}>Оплатить</StyledCartPage.SummaryButton>
                </StyledCartPage.Summary>
            </StyledCartPage.Bottom>
        </StyledCartPage.CartContainer>
    )
}

export default CartPage
