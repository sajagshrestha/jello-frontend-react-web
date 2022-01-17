import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import React from "react";

interface Props {
  name: string;
  checkedName: string;
  checked: boolean;
  label?: number | string;
  checkedLabel?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  checkedIcon: React.ReactNode;
}

const IconCheckBox: React.FC<Props> = ({
  name,
  checkedName,
  checked,
  label,
  checkedLabel,
  onClick,
  icon,
  checkedIcon,
}) => {
  return (
    <FormControlLabel
      control={
        <Tooltip title={checked ? checkedName : name}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            name={name || "icon"}
            checked={checked}
            onClick={onClick}
          />
        </Tooltip>
      }
      label={(checkedLabel ? (checked ? checkedLabel : label) : label) || 0}
    />
  );
};

export default IconCheckBox;
