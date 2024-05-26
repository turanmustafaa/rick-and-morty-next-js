import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Character {
  created: string,
  episode: string[],
  gender: string,
  id: number,
  image: string,
  location: {
    name: string
  },
  name: string,
  origin: {
    name: string
  },
  species: string,
  status: string,
  type: string,
  url: string
}

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  'rickAndMorty/fetchCharacters',
  async (query: string) => {

    const response = await api.get(`/character/?name=${query}`);
    return response.data.results as Character[];
  }
);

const CharacterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch characters';
      });
  },
});

export default CharacterSlice.reducer;
