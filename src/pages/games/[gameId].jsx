import React, {useContext} from "react";
import styled from "styled-components";
import CurrencyContext from "../../context/CurrencyContext";
import {convertCurrency} from "../../lib/Currency";
import {addProduct} from "../../redux/actions/cart";
import {useDispatch} from "react-redux";

const GameCard = styled.div`
  width: calc(100% - 4vw);
  min-height: calc(65vh - 4vw);
  display: flex;
  flex-direction: column;
  padding: 2vw;
  gap: 2vw;
`

const Game = styled.div`
  display: flex;
  gap: 2vw;
`

const GameImage = styled.img`
  width: 15vw;
  height: 20vw;
  object-fit: cover;
  border-radius: .5vw;
`

const GameContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const GameTitle = styled.h2`
  flex: 1;
  font-size: 2rem;
  margin-bottom: 1vw;
`

const GameDescription = styled.div`
  flex: 5;
  margin-bottom: 1vw;
  font-size: 1.5rem;
`

const GamePrice = styled.div`
  flex: 1;
  font-size: 1.5rem;
  margin-bottom: 1vw;
`

const GameButton = styled.button`
  flex: 1;
  width: 15vw;
  padding: .25vw;
  font-size: 1rem;
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
        <GameCard>
            <Game>
                <GameImage src={game.image} alt={game.title}/>
                <GameContent>
                    <GameTitle>
                        {game.title}
                    </GameTitle>
                    <GameDescription>{game.description}</GameDescription>
                    <GamePrice>
                        <b>Цена:</b> {convertCurrency(currency, game.price)}
                    </GamePrice>
                    <GameButton onClick={handleAddToCart}>
                        Добавить в корзину
                    </GameButton>
                </GameContent>
            </Game>
        </GameCard>
    )
}

export default GamePage
