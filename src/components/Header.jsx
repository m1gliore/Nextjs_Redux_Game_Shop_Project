import styled from "styled-components";
import {
    AttachMoney,
    CurrencyRuble,
    Download,
    Euro,
    KeyboardArrowDown,
    Search,
    ShoppingCartOutlined
} from "@mui/icons-material";
import {Badge, Option, Select, selectClasses} from "@mui/joy";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as ModalForm from "./ModalForm";
import ModalWindow from "./ModalWindow";
import {useLocalStorage} from "react-use";

const Wrapper = styled.div`
  width: 100%;
`

const Container = styled.div`
  width: calc(100% - 4vw);
  padding: 1vw 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img`
  width: 6vw;
  height: 3vw;
  cursor: pointer;

  &:hover {
    opacity: .7;
  }
`

const Center = styled.div`
  flex: ${props => props.admin ? 2 : 1};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Item = styled.span`
  text-transform: uppercase;
  opacity: .7;
  cursor: pointer;

  &:hover {
    opacity: .4;
  }
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
`

const BadgeContainer = styled(Badge)`
  opacity: .9;
  cursor: pointer;

  &:hover {
    opacity: .6;
  }
`

const Header = ({handleCurrencyChange}) => {
    let admin = JSON.parse(localStorage.getItem("user"))
    const router = useRouter()
    const {quantity} = useSelector((state) => state.cart)
    const [modalActive, setModalActive] = useState(false)
    const [currentWindow, setCurrentWindow] = useState(null)
    const {register, handleSubmit} = useForm()

    const handleChange = (event, newValue) => {
        handleCurrencyChange(newValue)
    }

    const handleLogin = (data) => {
        const username = data.usernameLogin
        localStorage.setItem("user", username === "admin")
        setModalActive(false)
    }

    const handleReg = () => {
        setModalActive(false)
    }

    return (
        <Wrapper>
            <Container>
                <Left>
                    <Logo src="/images/logo.png" alt="Logo Image" onClick={() => router.push("/")}/>
                </Left>
                <Center admin={admin}>
                    <Item onClick={() => router.push("/games")}>Каталог игр</Item>
                    <Item onClick={() => router.push("/dlcs")}>DLC</Item>
                    {admin && <>
                        <Item onClick={() => router.push("/adminPanel")}>Панель управления</Item>
                        <Item onClick={() => router.push("/reviews")}>Отзывы</Item>
                    </>}
                    <Item onClick={() => {
                        setCurrentWindow("login")
                        setModalActive(true)
                    }}>Вход</Item>
                    <Item onClick={() => {
                        setCurrentWindow("reg")
                        setModalActive(true)
                    }}>Регистрация</Item>
                </Center>
                <Right>
                    <Select defaultValue="RUB" indicator={<KeyboardArrowDown/>} sx={{
                        width: 150,
                        [`& .${selectClasses.indicator}`]: {
                            transition: ".4s ease-out",
                            [`&.${selectClasses.expanded}`]: {
                                transform: "rotate(-180deg)",
                            },
                        },
                    }} onChange={handleChange}>
                        <Option value="RUB"><CurrencyRuble/>&nbsp;Рубль</Option>
                        <Option value="USD"><AttachMoney/>&nbsp;Доллар</Option>
                        <Option value="EUR"><Euro/>&nbsp;Евро</Option>
                    </Select>
                    <BadgeContainer badgeContent={quantity} color="primary"
                                    onClick={() => router.push(`/cart/Migliore`)}>
                        <ShoppingCartOutlined/>
                    </BadgeContainer>
                </Right>
            </Container>
            <ModalWindow active={modalActive} setActive={setModalActive}>
                <ModalForm.Form onSubmit={handleSubmit(handleLogin)}
                                style={{display: currentWindow !== "login" && "none"}}>
                    <ModalForm.Title>Вход</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text" {...register("usernameLogin")}
                                                 placeholder="Имя пользователя"/>
                            <ModalForm.FormInput required type="password" {...register("passwordLogin")}
                                                 placeholder="Пароль"/>
                            <ModalForm.FormButton>Войти</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
                <ModalForm.Form onSubmit={handleSubmit(handleReg)}
                                style={{display: currentWindow !== "reg" && "none"}}>
                    <ModalForm.Title>Регистрация</ModalForm.Title>
                    <ModalForm.MainContainer>
                        <ModalForm.RightFormContainer>
                            <ModalForm.FormInput required type="text" {...register("usernameReg")}
                                                 placeholder="Имя пользователя"/>
                            <ModalForm.FormInput required type="password" {...register("passwordReg")}
                                                 placeholder="Пароль"/>
                            <ModalForm.FormInput required type="password" {...register("repPasswordReg")}
                                                 placeholder="Повторите пароль"/>
                            <ModalForm.FormButton>Зарегистрироваться</ModalForm.FormButton>
                        </ModalForm.RightFormContainer>
                    </ModalForm.MainContainer>
                </ModalForm.Form>
            </ModalWindow>
        </Wrapper>
    )
}

export default Header
