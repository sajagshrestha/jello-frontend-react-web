import styled from "styled-components";
import pageNotFoundImg from "src/assets/notFoundImg.png";

const PageNotFoundContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  padding-top: 50px;
  p {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const PageNotFound: React.FC<{ additionalText?: string }> = ({
  additionalText,
}) => {
  return (
    <PageNotFoundContainer>
      <img src={pageNotFoundImg} alt="" width={160} height={250} />
      <div>
        <p>404 Page Not Found</p>
        <p>{additionalText || ""}</p>
      </div>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
