import HomePage from "../pages/HomePage/HomePage"
import OderPage from "../pages/OderPage/OderPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
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
        // duong link nguoi dung nhap sai
        path: '*',
        page: NotFoundPage
    },
]