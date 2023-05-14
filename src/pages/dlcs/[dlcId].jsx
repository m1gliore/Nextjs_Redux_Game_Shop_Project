import React, {useContext, useEffect, useState} from "react";
import CurrencyContext from "../../context/CurrencyContext";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {addGame} from "../../redux/actions/cart";
import * as StyledGamePage from "../../components/StyledGamePage";
import {convertCurrency} from "../../lib/Currency";
import YouTubeVideo from "../../components/YouTubeVideo";
import {Download, Person} from "@mui/icons-material";
import {fileHandler, formatDateString} from "../../lib/Game";
import {useForm} from "react-hook-form";
import * as ModalForm from "../../components/ModalForm";
import ModalWindow from "../../components/ModalWindow";

const DLCPage = () => {
    const admin = true
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
    const [modalActive, setModalActive] = useState(false)
    const [currentWindow, setCurrentWindow] = useState(null)
    const {register, handleSubmit} = useForm()
    const [imageUrl, setImageUrl] = useState("/images/defaultGame.png")
    const [file, setFile] = useState(null)

    const DLCs = [
        {
            id: "1-dlc-1",
            name: "DLC 1",
            price: 1499,
            image: "/images/dlc_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            new: "изменение1.изменение2.изменение3"
        },
        {
            id: "2-dlc-2",
            name: "DLC 2",
            price: 1999,
            image: "/images/dlc_2.png",
            description:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            videoId: "56bh-ROgVlQ",
            new: "изменение1.изменение2.изменение3"
        },
        {
            id: "3-dlc-3",
            name: "DLC 3",
            price: 2299,
            image: "/images/dlc_3.jpg",
            description: "Excepteur sint occaecat cupidatat non proident.",
            videoId: "EtF6oSFRFWo",
            new: "изменение1.изменение2.изменение3"
        }
    ]

    useEffect(() => {
        const selectedDlc = DLCs.find((game) => game.id === dlcId)
        setDlc(selectedDlc)
        fileHandler(file, setImageUrl)
    }, [file, dlcId])

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

    const handleUpdate = (data) => {
    }
    const handleDelete = (data) => {
    }

    return (
        <StyledGamePage.GameCard>
            {admin && <>
                <StyledGamePage.UpdateIcon fontSize="large" color="warning" onClick={() => {
                    setCurrentWindow("update")
                    setModalActive(true)
                }}/>
                <StyledGamePage.DeleteIcon fontSize="large" color="error" onClick={() => {
                    setCurrentWindow("delete")
                    setModalActive(true)
                }}/>
            </>}
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
                    {dlc.new.split('.').map((item, index) => (
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
            <ModalWindow active={modalActive} setActive={setModalActive}>
                <ModalForm.Form onSubmit={handleSubmit(handleUpdate)}
                                style={{display: currentWindow !== "update" && "none"}}>
                    <ModalForm.Title>Изменить DLC</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.LeftFormContainer>
                            <ModalForm.FormImage
                                src={imageUrl !== "/images/defaultGame.png" ? imageUrl : dlc.image}
                                alt="Изображение игры"/>
                            <ModalForm.FormLabel style={{cursor: "pointer"}} htmlFor="fileUpdate">
                                <Download/>
                            </ModalForm.FormLabel>
                            <ModalForm.FormInput style={{opacity: 0, pointerEvents: "none"}} type="file"
                                                 id="fileUpdate" {...register("fileUpdate")}
                                                 onChange={(event) => {
                                                     setFile(event.target.files[0])
                                                     console.log(event.target.files[0])
                                                 }} accept="image/*"/>
                        </ModalForm.LeftFormContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text"
                                                 defaultValue={dlc.name} {...register("nameUpdate")}
                                                 placeholder="Наименование DLC"/>
                            <ModalForm.FormInput required type="text"
                                                 defaultValue={dlc.description} {...register("descUpdate")}
                                                 placeholder="Описание DLC"/>
                            <ModalForm.FormInput required type="number" min="0"
                                                 defaultValue={dlc.price} {...register("priceUpdate")}
                                                 placeholder="Цена"/>
                            <ModalForm.FormInput required type="text"
                                                 defaultValue={dlc.videoId} {...register("youtubeUpdate")}
                                                 placeholder="Id трейлера"/>
                            <ModalForm.FormInput required type="text" defaultValue={dlc.new} {...register("newMUpdate")}
                                                 placeholder="Нововведения"/>
                            <ModalForm.FormButton>Изменить</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
                <ModalForm.Form onSubmit={handleSubmit(handleDelete)}
                                style={{display: currentWindow !== "delete" && "none"}}>
                    <ModalForm.Title>Удалить DLC</ModalForm.Title>
                    <ModalForm.FormButton>Удалить</ModalForm.FormButton>
                </ModalForm.Form>
            </ModalWindow>
        </StyledGamePage.GameCard>
    )
}

export default DLCPage