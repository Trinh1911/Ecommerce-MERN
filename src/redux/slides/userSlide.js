import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    city: '',
    isAdmin: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token = '', address = '', phone = '', avatar = '', _id = '',city = '', isAdmin} = action.payload
            state.name = name || email;
            state.email = email;
            state.address = address;
            state.phone = phone;
            state.avatar = avatar;
            state.city = city;
            state.id = _id ? _id : state.id
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.city = '';
            state.access_token = '';
            state.isAdmin = false;
        },
    },
})

export const {updateUser, resetUser} = userSlide.actions

export default userSlide.reducer