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
            name: "Game 1",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            name: "Game 2",
            price: 1999,
            image: "/images/product_2.jpg",
            description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            name: "Game 3",
            price: 2299,
            image: "/images/product_3.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
        },
    ]

    return (
        <StyledHome.HomeContainer>
            <StyledHome.HomeTitle>Популярные новинки</StyledHome.HomeTitle>
            <StyledHome.GameList>
                {games
                    .map((game, index) => (
                        <StyledHome.GameCard onClick={() => router.push(`/games/${index + 1}`)} key={index}>
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
