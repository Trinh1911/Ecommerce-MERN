import styles from "styled-components";
import Slider from "react-slick";
export const WrapSlider = styles(Slider)`
& .slick-arrow.slick-prev {
    left: 12px;
    top: 50%;
    z-index: 10;
    &::before {
        font-size: 40px;
        color: #fff;
    }
}
& .slick-arrow.slick-next {
    right: 28px;
    top: 50%;
    z-index: 10;
    &::before {
        font-size: 40px;
        color: #fff;
    }
}
& .slick-dots {
    z-index: 10;
    bottom: -2px !important;
    li {
        button {
            &::before {
                color: rgb(255, 255, 0.5);
            }
        }
    }
    li.active {
        button {
            &::before {
                color: #fff;
            }
        }
    } 
}
`