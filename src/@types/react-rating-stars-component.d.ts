declare module "react-rating-stars-component" {
  import { ElementType } from "react";

  interface ReactStarsProps {
    classNames?: string;
    edit?: boolean;
    half?: boolean;
    value?: number;
    count?: number;
    char?: string;
    size?: number;
    color?: string;
    activeColor?: string;
    emptyIcon?: ElementType;
    halfIcon?: ElementType;
    filledIcon?: ElementType;
    a11y?: boolean;
    onChange?: (rating: number) => void;
  }

  function ReactStars(props: ReactStarsProps): JSX.Element;

  export default ReactStars;
}
