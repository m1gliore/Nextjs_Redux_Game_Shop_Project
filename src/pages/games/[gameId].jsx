import React, {useContext, useEffect, useState} from "react";
import * as StyledGamePage from "../../components/StyledGamePage";
import CurrencyContext from "../../context/CurrencyContext";
import {convertCurrency} from "../../lib/Currency";
import {addGame} from "../../redux/actions/cart";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import YouTubeVideo from "../../components/YouTubeVideo";

const GamePage = () => {
    const currency = useContext(CurrencyContext)
    const dispatch = useDispatch()
    const router = useRouter()
    const {gameId} = router.query
    const [game, setGame] = useState(null)

    const games = [
        {
            id: "1-game-1",
            name: "Game 1",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            technicalRequirements: "Рекомендуемые требования:\nОперационная система: Windows 10\nПроцессор: Intel Core i7\nОперативная память: 16 ГБ\nВидеокарта: NVIDIA GeForce RTX 3080\nПоддержка DirectX 12"
        },
        {
            id: "2-game-2",
            name: "Game 2",
            price: 1999,
            image: "/images/product_2.jpg",
            description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            videoId: "56bh-ROgVlQ",
            technicalRequirements: "Рекомендуемые требования:\nОперационная система: Windows 10\nПроцессор: Intel Core i7\nОперативная память: 16 ГБ\nВидеокарта: NVIDIA GeForce RTX 3080\nПоддержка DirectX 12"
        },
        {
            id: "3-game-3",
            name: "Game 3",
            price: 2299,
            image: "/images/product_3.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            technicalRequirements: "Рекомендуемые требования:\nОперационная система: Windows 10\nПроцессор: Intel Core i7\nОперативная память: 16 ГБ\nВидеокарта: NVIDIA GeForce RTX 3080\nПоддержка DirectX 12"
        }
    ]

    const DLCs = [
        {
            id: "1-dlc-1",
            name: "DLC 1",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
        },
        {
            id: "2-dlc-2",
            name: "DLC 2",
            price: 1999,
            image: "/images/product_2.jpg",
            description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            videoId: "56bh-ROgVlQ",
        },
        {
            id: "3-dlc-3",
            name: "DLC 3",
            price: 2299,
            image: "/images/product_3.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
        }
    ]

    useEffect(() => {
        const selectedGame = games.find((game) => game.id === gameId)
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
                <StyledGamePage.GameImage src={game.image} alt={game.name}/>
                <StyledGamePage.GameContent>
                    <StyledGamePage.GameTitle>
                        {game.name}
                    </StyledGamePage.GameTitle>
                    <StyledGamePage.GameDescription>{game.description}</StyledGamePage.GameDescription>
                    <StyledGamePage.GamePrice>
                        <b>Цена:</b> {convertCurrency(currency, game.price)}
                    </StyledGamePage.GamePrice>
                    <StyledGamePage.GameButton onClick={handleAddToCart}>
                        Добавить в корзину
                    </StyledGamePage.GameButton>
                </StyledGamePage.GameContent>
                <YouTubeVideo videoId={game.videoId}/>
            </StyledGamePage.Game>
            <StyledGamePage.GameDetailsContainer>
                <StyledGamePage.TechnicalRequirementsContainer>
                    <StyledGamePage.TechnicalRequirementsList>
                        {game.technicalRequirements.split('\n').map((item, index) => (
                            <StyledGamePage.TechnicalRequirementsItem
                                key={index}>{item}</StyledGamePage.TechnicalRequirementsItem>
                        ))}
                    </StyledGamePage.TechnicalRequirementsList>
                </StyledGamePage.TechnicalRequirementsContainer>
                <StyledGamePage.DLCContainer>
                    <StyledGamePage.DLCHeading>DLC для этой игры:</StyledGamePage.DLCHeading>
                    <StyledGamePage.DLCItems>
                        {DLCs.map((dlc) => (
                            <StyledGamePage.DLCItem key={dlc.id} onClick={() => router.push(`/dlcs/${dlc.id}`)}>
                                <StyledGamePage.DLCImage src={dlc.image} alt={dlc.name}/>
                                <StyledGamePage.DLCName>{dlc.name}</StyledGamePage.DLCName>
                                <StyledGamePage.DLCPrice>{convertCurrency(currency, dlc.price)}</StyledGamePage.DLCPrice>
                            </StyledGamePage.DLCItem>
                        ))}
                    </StyledGamePage.DLCItems>
                </StyledGamePage.DLCContainer>
            </StyledGamePage.GameDetailsContainer>
        </StyledGamePage.GameCard>
    )
}

export default GamePage
