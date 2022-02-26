import { ReactComponent as JelloLogo } from "src/assets/jello-logo.svg";

const Logo: React.FC<{ height?: number; width?: number }> = ({
  height = 50,
  width = 120,
}) => {
  return <JelloLogo height={height} width={width} />;
};

export default Logo;
