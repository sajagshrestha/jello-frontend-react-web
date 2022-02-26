import styled from "styled-components";

export const UploadFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  align-items: flex-end;
`;

export const ImagePlaceHolder = styled.div<{ hasBorder: boolean }>`
  background-color: ${({ theme }) => theme.textFieldFill};
  aspect-ratio: 16/9;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${({ hasBorder }) => (hasBorder ? 0.5 : 1)};
  border: ${({ theme, hasBorder }) => hasBorder && theme.borderDashed};
`;
