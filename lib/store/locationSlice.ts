import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
}

interface LocationState {
    locations: Location[];
    loading: boolean;
    error: string | null;
}

const initialState: LocationState = {
    locations: [],
    loading: false,
    error: null,
};

export const fetchLocations = createAsyncThunk(
    'locations/fetchLocations',
    async (query: string) => {
        const validQuery = String(query);
        const response = await api.get(`/location/?name=${validQuery}`);
        return response.data.results as Location[];
    }
);

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.locations = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch locations';
            });
    },
});

export default locationSlice.reducer;
