import styled from "styled-components";

export const GameCard = styled.div`
  width: calc(100% - 4vw);
  min-height: calc(65vh - 4vw);
  display: flex;
  flex-direction: column;
  padding: 2vw;
  gap: 2vw;
`

export const Game = styled.div`
  display: flex;
  gap: 2vw;
`

export const GameImage = styled.img`
  width: 15vw;
  height: 20vw;
  object-fit: cover;
  border-radius: .5vw;
`

export const GameContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const GameTitle = styled.h2`
  flex: 1;
  font-size: 2rem;
  margin-bottom: 1vw;
`

export const GameDescription = styled.div`
  flex: 5;
  margin-bottom: 1vw;
  font-size: 1.5rem;
`

export const GamePrice = styled.div`
  flex: 1;
  font-size: 1.5rem;
  margin-bottom: 1vw;
`

export const GameButton = styled.button`
  flex: 1;
  width: 15vw;
  padding: .25vw;
  font-size: 1rem;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: .5vw;
  cursor: pointer;
  transition: .25s ease-out;

  &:hover {
    background-color: transparent;
    color: black;
  }
`
