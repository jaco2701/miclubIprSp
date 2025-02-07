import { createSlice, PayloadAction , configureStore} from '@reduxjs/toolkit';
import { MobileData } from '@/model/MobileData';
import { Lista } from '@/model/Lista';

interface McState {
    ioData: MobileData | null;
    coStatics: Lista[] | null;
}

const initialState: McState = {
    ioData: null,
    coStatics: null,
};

const McSlice = createSlice({
    name: 'Mc',
    initialState,
    reducers: {
        ToData(state, action: PayloadAction<MobileData>) {
            state.ioData = action.payload;
        },
        ToSts(state, action: PayloadAction<Lista[]>) {
            state.coStatics = action.payload;
        },
        Clr(state) {
            state.coStatics = null;
            state.ioData = null;
        },
    },
});

export const { ToData, ToSts, Clr } = McSlice.actions;

export const Store = configureStore({
    reducer: McSlice.reducer,
});

export default McSlice.reducer;