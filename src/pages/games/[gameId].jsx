import React, {useContext} from "react";
import * as StyledGamePage from "../../components/StyledGamePage";
import CurrencyContext from "../../context/CurrencyContext";
import {convertCurrency} from "../../lib/Currency";
import {addProduct} from "../../redux/actions/cart";
import {useDispatch} from "react-redux";

const GamePage = () => {
    const currency = useContext(CurrencyContext)
    const dispatch = useDispatch()

    const game = {
        id: 1,
        title: "Game 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 1499,
        image: "/images/product_1.jpg",
    }

    const handleAddToCart = () => {
        dispatch(addProduct())
    }

    return (
        <StyledGamePage.GameCard>
            <StyledGamePage.Game>
                <StyledGamePage.GameImage src={game.image} alt={game.title}/>
                <StyledGamePage.GameContent>
                    <StyledGamePage.GameTitle>
                        {game.title}
                    </StyledGamePage.GameTitle>
                    <StyledGamePage.GameDescription>{game.description}</StyledGamePage.GameDescription>
                    <StyledGamePage.GamePrice>
                        <b>Цена:</b> {convertCurrency(currency, game.price)}
                    </StyledGamePage.GamePrice>
                    <StyledGamePage.GameButton onClick={handleAddToCart}>
                        Добавить в корзину
                    </StyledGamePage.GameButton>
                </StyledGamePage.GameContent>
            </StyledGamePage.Game>
        </StyledGamePage.GameCard>
    )
}

export default GamePage
