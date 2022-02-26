import styled from "styled-components";
import emptyImage from "src/assets/Empty.png";

const EmptyFeedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  padding-top: 50px;
  p {
    text-align: center;
    font-size: 1.2rem;
  }
`;

const EmptyFeed: React.FC<{ additionalText?: string }> = ({
  additionalText,
}) => {
  return (
    <EmptyFeedContainer>
      <img src={emptyImage} alt="" width={200} height={180} />
      <div>
        <p>Wow, Such Empty.</p>
        <p>{additionalText || ""}</p>
      </div>
    </EmptyFeedContainer>
  );
};

export default EmptyFeed;
