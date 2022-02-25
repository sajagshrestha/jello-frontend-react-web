import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import ImageService from "src/api/services/image-service";
import { useAppDispatch } from "src/redux";
import { openSnackbar } from "src/redux/slices/snackbar";
import { OptionButtonContainer } from "./ImageCard.styles";

interface Props {
  id: number;
}

const ImageCardOption: React.FC<Props> = ({ id }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

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

  const handleDelete = async () => {
    try {
      await deleteImageMutation.mutateAsync(id);
      queryClient.invalidateQueries("profile");
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "success",
          message: "Image deleted.",
        })
      );
    } catch (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "error",
          message: "Failed to Delete Image.",
        })
      );
    }
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
