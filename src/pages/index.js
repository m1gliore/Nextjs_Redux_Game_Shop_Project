import styled from "styled-components";
import {useContext} from "react";
import CurrencyContext from "../context/CurrencyContext";
import {convertCurrency} from "../lib/Currency";
import {useRouter} from "next/router";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
`

const HomeTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2vw;
`

const GameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
`

const GameCard = styled.div`
  background-color: #fff;
  padding: 2vw;
  border-radius: 0.5vw;
  box-shadow: 0 0.15vw 0.3vw rgba(0, 0, 0, 0.1);
  flex: 1;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.35vw);
    box-shadow: 0 0.45vw 1.2vw rgba(0, 0, 0, 0.1);
  }
`

const GameImage = styled.img`
  width: 100%;
  max-height: 15vw;
  object-fit: cover;
  border-radius: 0.5vw;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.2);
`

const GameName = styled.h2`
  font-size: 1.5rem;
  margin: 1vw 0;
`

const GamePrice = styled.p`
  font-family: "Source Code Pro", sans-serif;
  font-size: 1.2rem;
  color: #888;
`

const GameDescription = styled.p`
  font-size: 1rem;
  color: #555;
`

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
        <HomeContainer>
            <HomeTitle>Популярные новинки</HomeTitle>
            <GameList>
                {games
                    .map((game, index) => (
                        <GameCard onClick={() => router.push(`/games/${index + 1}`)} key={index}>
                            <GameImage src={game.image} alt={`Game Image ${index + 1}`}/>
                            <GameName>{game.name}</GameName>
                            <GamePrice>{convertCurrency(currency, game.price)}</GamePrice>
                            <GameDescription>{game.description}</GameDescription>
                        </GameCard>
                    ))}
            </GameList>
        </HomeContainer>
    )
}

export default Home
