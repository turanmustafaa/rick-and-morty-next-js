import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
}

interface EpisodeState {
    episodes: Episode[];
    loading: boolean;
    error: string | null;
}

const initialState: EpisodeState = {
    episodes: [],
    loading: false,
    error: null,
};

export const fetchEpisodes = createAsyncThunk(
    'episodes/fetchEpisodes',
    async (query: string) => {
        const response = await api.get(`/episode/${query}`);
        return response.data as Episode[];
    }
);

const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisodes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEpisodes.fulfilled, (state, action) => {
                state.loading = false;
                state.episodes = action.payload;
            })
            .addCase(fetchEpisodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch episodes';
            });
    },
});

export default episodeSlice.reducer;
