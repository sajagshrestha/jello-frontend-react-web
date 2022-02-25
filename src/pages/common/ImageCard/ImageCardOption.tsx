import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button, Menu, MenuItem } from "@mui/material";
import { OptionButtonContainer } from "./ImageCard.styles";
import { useMutation } from "react-query";
import ImageDTO from "src/api/dto/image";
import ImageService from "src/api/services/image-service";
import { image } from "@cloudinary/url-gen/qualifiers/source";

interface Props {
  id: number;
}

const ImageCardOption: React.FC<Props> = ({ id }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**
   * Mutations.
   */
  const deleteImageMutation = useMutation((id: number) => {
    return ImageService.deleteImage(id);
  });

  /**
   * Event handlers.
   */
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteImageMutation.mutate(id);
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
        <MenuItem onClick={handleClose}>Edit {id}</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default ImageCardOption;
