import * as StyledGamesPage from "../../components/StyledGamesPage";
import {convertCurrency} from "../../lib/Currency";
import {useContext} from "react";
import CurrencyContext from "../../context/CurrencyContext";
import {useRouter} from "next/router";

const DLCsPage = () => {
    const currency = useContext(CurrencyContext)
    const router = useRouter()

    const DLCs = [
        {
            id: "1-dlc-1",
            name: "DLC 1",
            price: 1499,
            image: "/images/dlc_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "2-dlc-2",
            name: "DLC 2",
            price: 1999,
            image: "/images/dlc_2.png",
            description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            videoId: "56bh-ROgVlQ",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "3-dlc-3",
            name: "DLC 3",
            price: 2299,
            image: "/images/dlc_3.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "4-dlc-4",
            name: "DLC 4",
            price: 1200,
            image: "/images/dlc_4.jpg",
            description: "asd",
            videoId: "EtF6oSFRFWo",
            new: "1.2.3"
        }
    ]

    return (
        <StyledGamesPage.GameListContainer>
            {DLCs.map((dlc) => (
                <StyledGamesPage.GameCard onClick={() => router.push(`/dlcs/${dlc.id}`)} key={dlc.id}>
                    <StyledGamesPage.GameImage src={dlc.image} alt={dlc.name}/>
                    <StyledGamesPage.GameName>{dlc.name}</StyledGamesPage.GameName>
                    <StyledGamesPage.GamePrice>{convertCurrency(currency, dlc.price)}</StyledGamesPage.GamePrice>
                    <StyledGamesPage.GameDescription>{dlc.description}</StyledGamesPage.GameDescription>
                </StyledGamesPage.GameCard>
            ))}
        </StyledGamesPage.GameListContainer>
    )
}

export default DLCsPage