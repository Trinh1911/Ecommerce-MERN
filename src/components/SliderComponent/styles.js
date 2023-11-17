import styles from "styled-components";
import Slider from "react-slick";
import { Image } from "antd";
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
    @media (max-width:1023px) {
        right: 15px;
    }
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
export const WrapContent = styles.div`
@media (max-width:1023px) {
    display: block !important;
    padding: 0 19px;
}
    flex-direction: column;
    margin: auto;
    color: #004146;
    & span {
        font-size: 13px;
        font-weight: 700;
    }
`
export const Heading = styles.div`
@media (max-width:1023px) {
    font-size: 36px;
    margin-top: 10px;
    font-weight: 700;
}
    margin: 0px 0px 10px;
    font-size: 50px;
    line-height: 1.25;
`
export const WrapImage = styles(Image)`
@media (max-width:1023px) {
    display: none !important;
}
`
