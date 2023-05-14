import React, {useContext, useEffect, useState} from "react";
import * as StyledGamePage from "../../components/StyledGamePage";
import CurrencyContext from "../../context/CurrencyContext";
import {convertCurrency} from "../../lib/Currency";
import {addGame} from "../../redux/actions/cart";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import YouTubeVideo from "../../components/YouTubeVideo";
import {Download, Person} from "@mui/icons-material";
import {fileHandler, formatDateString} from "../../lib/Game";
import ModalWindow from "../../components/ModalWindow";
import * as ModalForm from "../../components/ModalForm";
import {useForm} from "react-hook-form";

const GamePage = () => {
    const admin = true
    const currency = useContext(CurrencyContext)
    const dispatch = useDispatch()
    const router = useRouter()
    const {gameId} = router.query
    const [game, setGame] = useState(null)
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

    const games = [
        {
            id: "1-game-1",
            name: "Game 1",
            price: 1499,
            image: "/images/product_1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            videoId: "Oj5e6oHolkA",
            technicalRequirements: "Рекомендуемые требования:.Операционная система: Windows 10.Процессор: Intel Core i7.Оперативная память: 16 ГБ.Видеокарта: NVIDIA GeForce RTX 3080.Поддержка DirectX 12"
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
        }
    ]

    useEffect(() => {
        const selectedGame = games.find((game) => game.id === gameId)
        setGame(selectedGame)
        fileHandler(file, setImageUrl)
    }, [file, gameId])

    if (!game) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addGame(game))
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

    const handleDLC = (data) => {
    }
    const handleUpdate = (data) => {
    }
    const handleDelete = (data) => {
    }

    return (
        <StyledGamePage.GameCard>
            {admin && <>
                <StyledGamePage.DLCIcon fontSize="large" color="success" onClick={() => {
                    setCurrentWindow("dlc")
                    setModalActive(true)
                }}/>
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
                        {game.technicalRequirements.split('.').map((item, index) => (
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
                                style={{display: currentWindow !== "dlc" && "none"}}>
                    <ModalForm.Title>Добавить DLC</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.LeftFormContainer>
                            <ModalForm.FormImage
                                src={imageUrl !== "/images/defaultGame.png" ? imageUrl : "/images/defaultGame.png"}
                                alt="Изображение DLC"/>
                            <ModalForm.FormLabel style={{cursor: "pointer"}} htmlFor="fileUpdate">
                                <Download/>
                            </ModalForm.FormLabel>
                            <ModalForm.FormInput style={{opacity: 0, pointerEvents: "none"}} type="file"
                                                 id="fileUpdate" {...register("fileUpdate")}
                                                 onChange={(event) => setFile(event.target.files[0])} accept="image/*"/>
                        </ModalForm.LeftFormContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text" {...register("nameAdd")}
                                                 placeholder="Наименование DLC"/>
                            <ModalForm.FormInput required type="text" {...register("descAdd")}
                                                 placeholder="Описание DLC"/>
                            <ModalForm.FormInput required type="number" min="0"{...register("priceAdd")}
                                                 placeholder="Цена"/>
                            <ModalForm.FormInput required type="text" {...register("youtubeAdd")}
                                                 placeholder="Id трейлера"/>
                            <ModalForm.FormInput required type="text" {...register("newMAdd")}
                                                 placeholder="Нововведения"/>
                            <ModalForm.FormButton>Добавить</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
                <ModalForm.Form onSubmit={handleSubmit(handleUpdate)}
                                style={{display: currentWindow !== "update" && "none"}}>
                    <ModalForm.Title>Изменить игру</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.LeftFormContainer>
                            <ModalForm.FormImage
                                src={imageUrl !== "/images/defaultGame.png" ? imageUrl : game.image}
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
                                                 defaultValue={game.name} {...register("nameUpdate")}
                                                 placeholder="Наименование игры"/>
                            <ModalForm.FormInput required type="text"
                                                 defaultValue={game.description} {...register("descUpdate")}
                                                 placeholder="Описание игры"/>
                            <ModalForm.FormInput required type="number" min="0"
                                                 defaultValue={game.price} {...register("priceUpdate")}
                                                 placeholder="Цена"/>
                            <ModalForm.FormInput required type="text"
                                                 defaultValue={game.videoId} {...register("youtubeUpdate")}
                                                 placeholder="Id трейлера"/>
                            <ModalForm.FormInput required type="text"
                                                 defaultValue={game.technicalRequirements} {...register("newMUpdate")}
                                                 placeholder="Системные требования"/>
                            <ModalForm.FormButton>Изменить</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
                <ModalForm.Form onSubmit={handleSubmit(handleDelete)}
                                style={{display: currentWindow !== "delete" && "none"}}>
                    <ModalForm.Title>Удалить игру</ModalForm.Title>
                    <ModalForm.FormButton>Удалить</ModalForm.FormButton>
                </ModalForm.Form>
            </ModalWindow>
        </StyledGamePage.GameCard>
    )
}

export default GamePage
