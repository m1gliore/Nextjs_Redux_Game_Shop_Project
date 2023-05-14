import React, {useContext, useState} from "react";
import styled from "styled-components";
import {Add, Remove} from "@mui/icons-material";
import {convertCurrency, convertToNumber, currencySign} from "../../lib/Currency";
import CurrencyContext from "../../context/CurrencyContext";
import {useSelector} from "react-redux";
import {calculateTotal, updateQuantity} from "../../lib/Cart";

const CartContainer = styled.div`
  width: calc(100% - 4vw);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2vw;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1vw;
`

const Top = styled.div`
  padding: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TopButton = styled.button`
  width: 12%;
  padding: .75vw;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  border: ${props => props.filled && "none"};
  background-color: ${props => props.filled ? "black" : "transparent"};
  color: ${props => props.filled && "white"};
  border-radius: .25vw;
  transition: .25s ease-out;

  &:hover {
    border: ${props => props.filled ? "2px solid black" : "2px solid transparent"};
    background-color: ${props => props.filled ? "transparent" : "black"};
    color: ${props => props.filled ? "black" : "white"};
  }
`

const TopTextContainer = styled.div`
  display: flex;
  gap: 1vw;
`

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.5rem;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`

const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: .5vw;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  gap: 1vw;
`

const Image = styled.img`
  width: 10vw;
  height: 10vw;
  object-fit: fill;
  border-radius: .5vw;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span`
  font-size: 1.5rem;
`

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .5vw;
`

const Amount = styled.span`
  font-size: 1.75rem;
`

const Price = styled.span`
  font-size: 2rem;
  font-weight: 200;
`

const Summary = styled.div`
  flex: 1;
  border: .1vw solid lightgray;
  background-color: #f4f4f4;
  border-radius: .5vw;
  padding: 2vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const SummaryTitle = styled.h1`
  text-transform: uppercase;
  font-weight: 200;
  margin: 0;
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.large && "500"};
  font-size: ${props => props.large && "1.75rem"};
`

const SummaryItemText = styled.span`
  font-weight: 400;
`

const SummaryItemPrice = styled.span`
  font-weight: 400;
`

const SummaryButton = styled.button`
  width: 100%;
  padding: .5vw;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: .5vw;
  cursor: pointer;
  transition: .25s ease-out;

  &:hover {
    background-color: transparent;
    color: black;
  }
`

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
        <CartContainer>
            <Title>Ваша корзина</Title>
            <Top>
                <TopButton filled>Оплатить</TopButton>
                <TopTextContainer>
                    <TopText>Корзина ({quantity})</TopText>
                </TopTextContainer>
                <TopButton>Продолжить покупки</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cartItems.map((item) => (<Product>
                        <ProductDetail>
                            <Image src={item.image} alt={item.title}/>
                            <Details>
                                <ProductName><b>Игра:</b> {item.title}</ProductName>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <AmountContainer>
                                <Add style={{cursor: "pointer"}}
                                     onClick={() => handleQuantityChange(item.id, "increase")}/>
                                <Amount>{item.quantity}</Amount>
                                <Remove style={{cursor: "pointer"}}
                                        onClick={() => handleQuantityChange(item.id, "decrease")}/>
                            </AmountContainer>
                            <Price>{convertCurrency(currency, item.price)}</Price>
                        </PriceDetail>
                    </Product>))}
                </Info>
                <Summary>
                    <SummaryTitle>Общая сумма</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Стоимость товаров</SummaryItemText>
                        <SummaryItemPrice>{convertCurrency(currency, price)}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Доставка</SummaryItemText>
                        <SummaryItemPrice>{convertCurrency(currency, delivery)}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Скидка</SummaryItemText>
                        <SummaryItemPrice>{convertCurrency(currency, discount)}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem large>
                        <SummaryItemText>Конечная сумма</SummaryItemText>
                        <SummaryItemPrice>{currencySign(currency, total)}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryButton>Оплатить</SummaryButton>
                </Summary>
            </Bottom>
        </CartContainer>
    )
}

export default CartPage
