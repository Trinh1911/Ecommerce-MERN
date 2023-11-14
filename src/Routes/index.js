import HomePage from "../pages/HomePage/HomePage"
import OrderPage from "../pages/OrderPage/OrderPage"
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage"
import ProductPage from "../pages/ProductPage/ProductPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import SignInPage from "../pages/SignInPage/SignInPage"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import PaymentPage from "../pages/PaymentPage/PaymentPage"
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess"
import AdminPage from "../pages/AdminPage/AdminPage"
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage.jsx"
import SearchFeed from "../pages/SearchFeed/SearchFeed.jsx"
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowheader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowheader: true,
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowheader: true,
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowheader: true,
    },
    {
        path: '/product',
        page: ProductPage,
        isShowheader: true,
    },
    {
        path: '/search/:search',
        page: SearchFeed,
        isShowheader: true,
    },
    {
        path: '/product/:type',
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
        path: '/product-detail/:id',
        page: ProductDetailPage,
        isShowheader: true,
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowheader: true,
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowheader: true,
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowheader: true,
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowheader: false,
        isPrivate: true,
    },
    {
        // duong link nguoi dung nhap sai
        path: '*',
        page: NotFoundPage
    },
]