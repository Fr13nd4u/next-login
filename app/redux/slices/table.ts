'use client';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import TableService from "../../services/TableService";

interface IState {
  table: any;
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  table: [],
  loading: false,
  error: null,
};

export const fetchTable = createAsyncThunk(
  "table/fetch",
  async () => {
    const res = await TableService.getAll();
    return res.data;
  }
);

// update
export const updateTable = createAsyncThunk(
  "table/update",
  async ({ id, data }: { id: string; data: any }) => {
    const res = await TableService.update(id, data);
    return res.data;
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all
    builder.addCase(fetchTable.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchTable.fulfilled, (state, action: PayloadAction) => {
      state.loading = false;
      state.table = action.payload;
      state.error = '';
    })
    builder.addCase(fetchTable.rejected, (state) => {
      state.loading = false;
      state.table = [];
      state.error = 'Failed to get data.';
    })

     // update
     builder.addCase(updateTable.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(updateTable.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false
      const index = state.table.results.findIndex((p: any) => p._id === action.payload._id)
      state.table.results[index] = action.payload
      state.error = ''
    })
    builder.addCase(updateTable.rejected, (state) => {
      state.loading = false;
      state.error = 'Failed to update table.';
    })
  }
})

const { reducer } = tableSlice;
export default reducer;