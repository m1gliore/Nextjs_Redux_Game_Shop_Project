import styled from "styled-components";
import {AttachMoney, CurrencyRuble, Euro, KeyboardArrowDown, Search, ShoppingCartOutlined} from "@mui/icons-material";
import {Badge, Option, Select, selectClasses} from "@mui/joy";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

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

const SearchContainer = styled.div`
  width: 10vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, .2);
  border-radius: .15vw;
  padding: .2vw;

  &:hover {
    opacity: .7;
  }
`

const SearchInput = styled.input`
  width: 100%;
  text-transform: uppercase;
  opacity: .7;
  border: none;
  outline: none;
  background-color: transparent;
`

const SearchIcon = styled(Search)`
  opacity: .4;
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
    const admin = true
    const router = useRouter()
    const {quantity} = useSelector((state) => state.cart)

    const handleChange = (event, newValue) => {
        handleCurrencyChange(newValue)
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
                    <SearchContainer>
                        <SearchInput placeholder="Найти игры"/>
                        <SearchIcon/>
                    </SearchContainer>
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
        </Wrapper>
    )
}

export default Header
