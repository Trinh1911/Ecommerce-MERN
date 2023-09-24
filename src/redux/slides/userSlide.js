import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token = '', address = '', phone = '', avatar = ''} = action.payload
            state.name = name || email;
            state.email = email;
            state.address = address;
            state.phone = phone;
            state.avatar = avatar;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.access_token = '';
        },
    },
})

export const {updateUser, resetUser} = userSlide.actions

export default userSlide.reducer