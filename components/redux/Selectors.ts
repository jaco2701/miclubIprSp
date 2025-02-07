import { createSelector } from 'reselect';
import { McState } from '../../model/State';

const getCoStatics = (state: McState) => state.coStatics;
const getData = (state: McState) => state.ioData;

export const selectFilteredFmedic = createSelector(
    [getCoStatics],
    (coStatics) => Array.isArray(coStatics) ? coStatics.filter(x => x.strtipo === 'fmedic') : []
);
export const selectFilteredTsocio = createSelector(
    [getCoStatics],
    (coStatics) => Array.isArray(coStatics) ? coStatics.filter(x => x.strtipo === 'tsocio') : []
);
export const selectFilteredDepo = createSelector(
    [getCoStatics],
    (coStatics) => Array.isArray(coStatics) ? coStatics.filter(x => x.strtipo === 'depo') : []
);
export const selectFilteredTpago = createSelector(
    [getCoStatics],
    (coStatics) => Array.isArray(coStatics) ? coStatics.filter(x => x.strtipo === 'tpago') : []
);
export const selectFilteredMediciones= createSelector(
    [getCoStatics],
    (coStatics) => Array.isArray(coStatics) ? coStatics.filter(x => x.strtipo === 'mediciones') : []
);
export const selectIoData = createSelector(
    [getData],
    (ioData) => ioData || {}
);