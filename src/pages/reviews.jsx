import {useRouter} from "next/router";
import * as StyledGamePage from "../components/StyledGamePage";
import {Person} from "@mui/icons-material";
import {formatDateString} from "../lib/Game";
import React, {useState} from "react";

const Reviews = () => {
    const admin = true
    const router = useRouter()
    const [reviews,] = useState([
        {
            id: 1,
            author: 'Nikita',
            content: "Как дела?",
            date: new Date().toISOString()
        },
        {
            id: 2,
            author: 'Arbuz',
            content: "Зачем я это делаю?",
            date: new Date().toISOString()
        }
    ])

    if (!admin) {
        router.push("/404")
        return null
    }

    return (
        <StyledGamePage.ReviewsContainer>
            <StyledGamePage.ReviewsSection>
                <StyledGamePage.ReviewHeading>Принять/отклонить отзывы:</StyledGamePage.ReviewHeading>
                <StyledGamePage.ReviewList>
                    {reviews.map((review) => (
                        <StyledGamePage.ReviewItem key={review.id}>
                            <StyledGamePage.ReviewContent>
                                <StyledGamePage.ReviewAuthor><Person/> {review.author}</StyledGamePage.ReviewAuthor>
                                <StyledGamePage.ReviewText>{review.content}</StyledGamePage.ReviewText>
                                <StyledGamePage.ReviewDate>{formatDateString(review.date)}</StyledGamePage.ReviewDate>
                            </StyledGamePage.ReviewContent>
                            <StyledGamePage.ReviewAccept fontSize="large" color="success"/>
                            <StyledGamePage.ReviewReject fontSize="large" color="error"/>
                        </StyledGamePage.ReviewItem>
                    ))}
                </StyledGamePage.ReviewList>
            </StyledGamePage.ReviewsSection>
        </StyledGamePage.ReviewsContainer>
    )
}

export default Reviews