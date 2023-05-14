import * as StyledHome from "../components/StyledHome";
import {useContext} from "react";
import CurrencyContext from "../context/CurrencyContext";
import {convertCurrency} from "../lib/Currency";
import {useRouter} from "next/router";

const Home = () => {
    const currency = useContext(CurrencyContext)
    const router = useRouter()

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
        },
        {
            id: "4-game-4",
            name: "Game 4",
            price: 1299,
            image: "/images/product_4.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            technicalRequirements: "Рекомендуемые требования:\nОперационная система: Windows 10\nПроцессор: Intel Core i7\nОперативная память: 16 ГБ\nВидеокарта: NVIDIA GeForce RTX 3080\nПоддержка DirectX 12"
        },
        {
            id: "5-game-5",
            name: "Game 5",
            price: 3299,
            image: "/images/product_5.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            technicalRequirements: "Рекомендуемые требования:\nОперационная система: Windows 10\nПроцессор: Intel Core i7\nОперативная память: 16 ГБ\nВидеокарта: NVIDIA GeForce RTX 3080\nПоддержка DirectX 12"
        },
        {
            id: "6-game-6",
            name: "Game 6",
            price: 599,
            image: "/images/product_6.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            technicalRequirements: "Рекомендуемые требования:\nОперационная система: Windows 10\nПроцессор: Intel Core i7\nОперативная память: 16 ГБ\nВидеокарта: NVIDIA GeForce RTX 3080\nПоддержка DirectX 12"
        },
        {
            id: "7-game-7",
            name: "Game 7",
            price: 199,
            image: "/images/product_7.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            technicalRequirements: "Рекомендуемые требования:\nОперационная система: Windows 10\nПроцессор: Intel Core i7\nОперативная память: 16 ГБ\nВидеокарта: NVIDIA GeForce RTX 3080\nПоддержка DirectX 12"
        }
    ]

    return (
        <StyledHome.HomeContainer>
            <StyledHome.HomeTitle>Популярные новинки</StyledHome.HomeTitle>
            <StyledHome.GameList>
                {games
                    .slice(-6)
                    .map((game, index) => (
                        <StyledHome.GameCard onClick={() => router.push(`/games/${game.id}`)} key={game.id}>
                            <StyledHome.GameImage src={game.image} alt={`Game Image ${index + 1}`}/>
                            <StyledHome.GameName>{game.name}</StyledHome.GameName>
                            <StyledHome.GamePrice>{convertCurrency(currency, game.price)}</StyledHome.GamePrice>
                            <StyledHome.GameDescription>{game.description}</StyledHome.GameDescription>
                        </StyledHome.GameCard>
                    ))}
            </StyledHome.GameList>
        </StyledHome.HomeContainer>
    )
}

export default Home
