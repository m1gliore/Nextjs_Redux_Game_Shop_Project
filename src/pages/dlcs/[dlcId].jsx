import React, {useContext, useEffect, useState} from "react";
import CurrencyContext from "../../context/CurrencyContext";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {addGame} from "../../redux/actions/cart";
import * as StyledGamePage from "../../components/StyledGamePage";
import {convertCurrency} from "../../lib/Currency";
import YouTubeVideo from "../../components/YouTubeVideo";

const DLCPage = () => {
    const currency = useContext(CurrencyContext)
    const dispatch = useDispatch()
    const router = useRouter()
    const {dlcId} = router.query
    const [dlc, setDlc] = useState(null)

    const DLCs = [
        {
            id: 1,
            name: "DLC 1",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: 2,
            name: "DLC 2",
            price: 1999,
            image: "/images/product_2.jpg",
            description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            videoId: "56bh-ROgVlQ",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: 3,
            name: "DLC 3",
            price: 2299,
            image: "/images/product_3.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            new: "изменение1\nизменение2\nизменение3"
        }
    ]

    useEffect(() => {
        const selectedDlc = DLCs.find((game) => game.id === Number(dlcId))
        setDlc(selectedDlc)
    }, [dlcId])

    if (!dlc) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addGame(dlc))
    }

    return (
        <StyledGamePage.GameCard>
            <StyledGamePage.Game>
                <StyledGamePage.GameImage src={dlc.image} alt={dlc.name}/>
                <StyledGamePage.GameContent>
                    <StyledGamePage.GameTitle>
                        {dlc.name}
                    </StyledGamePage.GameTitle>
                    <StyledGamePage.GameDescription>{dlc.description}</StyledGamePage.GameDescription>
                    <StyledGamePage.GamePrice>
                        <b>Цена:</b> {convertCurrency(currency, dlc.price)}
                    </StyledGamePage.GamePrice>
                    <StyledGamePage.GameButton onClick={handleAddToCart}>
                        Добавить в корзину
                    </StyledGamePage.GameButton>
                </StyledGamePage.GameContent>
                <YouTubeVideo videoId={dlc.videoId}/>
            </StyledGamePage.Game>
            <StyledGamePage.ChangelogContainer>
                <StyledGamePage.ChangelogTitle>Нововведения:</StyledGamePage.ChangelogTitle>
                <StyledGamePage.ChangelogList>
                    {dlc.new.split('\n').map((item, index) => (
                        <StyledGamePage.ChangelogItem key={index}>{item}</StyledGamePage.ChangelogItem>
                    ))}
                </StyledGamePage.ChangelogList>
            </StyledGamePage.ChangelogContainer>
        </StyledGamePage.GameCard>
    )
}

export default DLCPage