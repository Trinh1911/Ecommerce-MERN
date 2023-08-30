import HomePage from "../pages/HomePage/HomePage"
import OderPage from "../pages/OderPage/OderPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import SignInPage from "../pages/SignInPage/SignInPage"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowheader: true,
    },
    {
        path: '/order',
        page: OderPage,
        isShowheader: true,
    },
    {
        path: '/product',
        page: ProductPage,
        isShowheader: true,
    },
    {
        path: '/:type',
        page: TypeProductPage,
        isShowheader: true,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowheader: false,
    }, 
    {
        path: '/sign-in',
        page: SignInPage,
        isShowheader: false,
    }, 
    {
        path: '/product-detail',
        page: ProductDetailPage,
        isShowheader: true,
    },
    {
        // duong link nguoi dung nhap sai
        path: '*',
        page: NotFoundPage
    },
]