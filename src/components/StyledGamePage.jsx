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

export const GameDetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
`;

export const TechnicalRequirementsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f5f5f5;
  min-width: 25vw;
`;

export const DLCContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

export const TechnicalRequirementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const TechnicalRequirementsItem = styled.li`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
`

export const DLCHeading = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`

export const DLCItems = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2vw;
`

export const DLCItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-out;

  &:hover {
    transform: scale(1.1);
  }
`

export const DLCImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`

export const DLCName = styled.p`
  margin-top: 0.5rem;
  text-align: center;
`

export const DLCPrice = styled.p`
  margin-top: 0.25rem;
  font-weight: bold;
`

export const ChangelogContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f5f5f5;
  margin-top: 2rem;
`

export const ChangelogTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

export const ChangelogList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
`

export const ChangelogItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`
