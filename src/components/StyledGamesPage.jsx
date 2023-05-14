import styled from "styled-components";

export const GameListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1vw;
  padding: 1vw;
`

export const GameCard = styled.div`
  width: 25vw;
  height: 20vw;
  background-color: #f5f5f5;
  border: .15vw solid #ccc;
  border-radius: .6vw;
  margin-top: 1vw;
  padding: 1vw;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.35vw);
    box-shadow: 0 0.45vw 1.2vw rgba(0, 0, 0, 0.1);
  }
`

export const GameImage = styled.img`
  width: 100%;
  max-height: 10vw;
  object-fit: cover;
  border-radius: .6vw;
  margin-bottom: .5vw;
`

export const GameName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`

export const GamePrice = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`

export const GameDescription = styled.p`
  font-size: 14px;
`