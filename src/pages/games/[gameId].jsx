import React, {useContext, useEffect, useState} from "react";
import * as StyledGamePage from "../../components/StyledGamePage";
import CurrencyContext from "../../context/CurrencyContext";
import {convertCurrency} from "../../lib/Currency";
import {addGame} from "../../redux/actions/cart";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const GamePage = () => {
    const currency = useContext(CurrencyContext)
    const dispatch = useDispatch()
    const router = useRouter()
    const {gameId} = router.query
    const [game, setGame] = useState(null)

    const games = [
        {
            id: 1,
            name: "Game 1",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            id: 2,
            name: "Game 2",
            price: 1999,
            image: "/images/product_2.jpg",
            description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            id: 3,
            name: "Game 3",
            price: 2299,
            image: "/images/product_3.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
        }
    ]

    useEffect(() => {
        const selectedGame = games.find((game) => game.id === Number(gameId))
        setGame(selectedGame)
    }, [gameId])

    if (!game) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addGame(game))
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
