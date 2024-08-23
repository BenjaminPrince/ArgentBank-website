// src/store/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action asynchrone pour la connexion
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
        const { token } = response.data.body;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Action asynchrone pour l'inscription
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/signup', userData);
        const { token } = response.data.body;
        localStorage.setItem('token', token);
        return { token };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Action asynchrone pour récupérer le profil utilisateur
export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/user/profile',
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data.body;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Action asynchrone pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(
            'http://localhost:3001/api/v1/user/profile',
            profileData,
            { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
        return response.data.body;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
