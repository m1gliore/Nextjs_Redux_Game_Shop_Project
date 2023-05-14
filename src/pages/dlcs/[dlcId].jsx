import React, {useContext, useEffect, useState} from "react";
import CurrencyContext from "../../context/CurrencyContext";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {addGame} from "../../redux/actions/cart";
import * as StyledGamePage from "../../components/StyledGamePage";
import {convertCurrency} from "../../lib/Currency";
import YouTubeVideo from "../../components/YouTubeVideo";
import {Person} from "@mui/icons-material";
import {formatDateString} from "../../lib/Game";

const DLCPage = () => {
    const currency = useContext(CurrencyContext)
    const dispatch = useDispatch()
    const router = useRouter()
    const {dlcId} = router.query
    const [dlc, setDlc] = useState(null)
    const [reviews, setReviews] = useState([
        {
            id: 1,
            author: 'Anonymous',
            content: "Ogo moschno",
            date: new Date().toISOString()
        }
    ])
    const [newReview, setNewReview] = useState('')

    const DLCs = [
        {
            id: "1-dlc-1",
            name: "DLC 1",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "2-dlc-2",
            name: "DLC 2",
            price: 1999,
            image: "/images/product_2.jpg",
            description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            videoId: "56bh-ROgVlQ",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "3-dlc-3",
            name: "DLC 3",
            price: 2299,
            image: "/images/product_3.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "4-dlc-4",
            name: "DLC 4",
            price: 1299,
            image: "/images/product_4.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "5-dlc-5",
            name: "DLC 5",
            price: 3299,
            image: "/images/product_5.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "6-dlc-6",
            name: "DLC 6",
            price: 599,
            image: "/images/product_6.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            new: "изменение1\nизменение2\nизменение3"
        },
        {
            id: "7-dlc-7",
            name: "DLC 7",
            price: 199,
            image: "/images/product_7.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            new: "изменение1\nизменение2\nизменение3"
        }
    ]

    useEffect(() => {
        const selectedDlc = DLCs.find((game) => game.id === dlcId)
        setDlc(selectedDlc)
    }, [dlcId])

    if (!dlc) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addGame(dlc))
    }

    const handleReviewChange = (e) => {
        setNewReview(e.target.value)
    }

    const handleAddReview = (e) => {
        e.preventDefault()
        if (newReview.trim() === '') return
        const review = {
            id: reviews.length + 1,
            content: newReview,
            author: 'Anonymous',
            date: new Date().toISOString()
        }
        setReviews([...reviews, review])
        setNewReview('')
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
            <StyledGamePage.ReviewsSection>
                <StyledGamePage.ReviewHeading>Отзывы:</StyledGamePage.ReviewHeading>
                <StyledGamePage.ReviewList>
                    {reviews.map((review) => (
                        <StyledGamePage.ReviewItem key={review.id}>
                            <StyledGamePage.ReviewContent>
                                <StyledGamePage.ReviewAuthor><Person/> {review.author}</StyledGamePage.ReviewAuthor>
                                <StyledGamePage.ReviewText>{review.content}</StyledGamePage.ReviewText>
                                <StyledGamePage.ReviewDate>{formatDateString(review.date)}</StyledGamePage.ReviewDate>
                            </StyledGamePage.ReviewContent>
                        </StyledGamePage.ReviewItem>
                    ))}
                </StyledGamePage.ReviewList>
                <StyledGamePage.AddReviewForm onSubmit={handleAddReview}>
                    <StyledGamePage.AddReviewTextarea
                        value={newReview}
                        onChange={handleReviewChange}
                        placeholder="Оставьте свой отзыв..."
                    />
                    <StyledGamePage.GameButton type="submit">Добавить отзыв</StyledGamePage.GameButton>
                </StyledGamePage.AddReviewForm>
            </StyledGamePage.ReviewsSection>
        </StyledGamePage.GameCard>
    )
}

export default DLCPage