import styles from "styled-components";
import Slider from "react-slick";
export const WrapSlider = styles(Slider)`
& div {
    display: flex !important;
}
& .slick-arrow.slick-prev {
    left: -60px;
    top: 52%;
    z-index: 10;
    &::before {
        font-size: 32px;
        color: #ff761c;
    }
}
& .slick-arrow.slick-next {
    right: -25px;
    top: 52%;
    z-index: 10;
    &::before {
        font-size: 32px;
        color: #ff761c;
    }
}
& .slick-dots {
    z-index: 10;
    bottom: -2px !important;
    li {
        button {
            &::before {
                color: #ff761c;
            }
        }
    }
    li.active {
        button {
            &::before {
                color: #ff761c;
            }
        }
    } 
}
`