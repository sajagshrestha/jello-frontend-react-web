import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import ImageService from "src/api/services/image-service";
import { useAppDispatch } from "src/redux";
import { openSnackbar } from "src/redux/slices/snackbar";
import ROUTES from "src/Router/routes";
import { interpolate } from "src/utils/string";
import { OptionButtonContainer } from "./ImageCard.styles";

interface Props {
  id: number;
}

const ImageCardOption: React.FC<Props> = ({ id }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleEdit = () => {
    handleClose();
    navigate(interpolate(ROUTES.EDIT, { id }));
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
