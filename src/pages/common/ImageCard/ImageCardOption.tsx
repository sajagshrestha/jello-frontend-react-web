import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { OptionButtonContainer } from "./ImageCard.styles";

interface Props {
  id: number;
  handleDelete: () => void;
  handleEdit: () => void;
}

const ImageCardOption: React.FC<Props> = ({ id, handleDelete, handleEdit }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**
   * Event handlers.
   */
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <OptionButtonContainer onClick={handleClick}>
        <MoreHorizIcon />
      </OptionButtonContainer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default ImageCardOption;
