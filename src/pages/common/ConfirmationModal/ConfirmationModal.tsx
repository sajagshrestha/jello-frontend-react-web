import { Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import styled from "styled-components";

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
`;
const TitleContainer = styled.div`
  padding-bottom: 1rem;
`;
const SubtitleContainer = styled.div`
  padding-bottom: 3rem;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IConfirmationModal {
  isOpen: boolean;
  onClose: () => void;
  onSuccessHandler: () => void;
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  confirmButtonText: string;
}

const ConfirmationModal: React.FC<IConfirmationModal> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  confirmButtonText,
  onSuccessHandler,
  isLoading,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <TitleContainer>
          <h2>{title}</h2>
        </TitleContainer>
        <SubtitleContainer>
          <h4>{subtitle}</h4>
        </SubtitleContainer>
        <ButtonSection>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={onSuccessHandler}>
            {confirmButtonText}
          </Button>
        </ButtonSection>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
