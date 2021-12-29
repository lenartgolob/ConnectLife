export const SET_OVEN_STATUS = 'SET_OVEN_STATUS';
export const SET_OVEN_PROGRAM = 'SET_OVEN_PROGRAM';
export const SET_OVEN_TEMPERATURE = 'SET_OVEN_TEMPERATURE';
export const SET_OVEN_MINUTES = 'SET_OVEN_MINUTES';
export const SET_OVEN_HOURS = 'SET_OVEN_HOURS';
export const SET_OVEN_TIME = 'SET_OVEN_TIME';
export const SET_WASHER_STATUS = 'SET_WASHER_STATUS';
export const SET_WASHER_PROGRAM = 'SET_WASHER_PROGRAM';
export const SET_WASHER_TIME = 'SET_WASHER_TIME';
export const SET_INDUCTION1 = 'SET_INDUCTION1';
export const SET_INDUCTION2 = 'SET_INDUCTION2';
export const SET_INDUCTION3 = 'SET_INDUCTION3';
export const SET_INDUCTION4 = 'SET_INDUCTION4';
export const SET_VALUE_INDUCTION1 = 'SET_VALUE_INDUCTION1';
export const SET_VALUE_INDUCTION2 = 'SET_VALUE_INDUCTION2';
export const SET_VALUE_INDUCTION3 = 'SET_VALUE_INDUCTION3';
export const SET_VALUE_INDUCTION4 = 'SET_VALUE_INDUCTION4';
export const SET_COOLER_TEMP = 'SET_COOLER_TEMP';

export const setOvenStatus = ovenStatus => dispatch => {
    dispatch({
        type: SET_OVEN_STATUS,
        payload: ovenStatus,
    });
};

export const setOvenProgram = ovenProgram => dispatch => {
    dispatch({
        type: SET_OVEN_PROGRAM,
        payload: ovenProgram,
    });
};

export const setOvenTemperature = ovenTemperature => dispatch => {
    dispatch({
        type: SET_OVEN_TEMPERATURE,
        payload: ovenTemperature,
    });
};

export const setOvenMinutes = ovenMinutes => dispatch => {
    dispatch({
        type: SET_OVEN_MINUTES,
        payload: ovenMinutes,
    });
};

export const setOvenHours = ovenHours => dispatch => {
    dispatch({
        type: SET_OVEN_HOURS,
        payload: ovenHours,
    });
};

export const setOvenTime = ovenTime => dispatch => {
    dispatch({
        type: SET_OVEN_TIME,
        payload: ovenTime,
    });
};

export const setWasherStatus = washerStatus => dispatch => {
    dispatch({
        type: SET_WASHER_STATUS,
        payload: washerStatus,
    });
};

export const setWasherProgram = washerProgram => dispatch => {
    dispatch({
        type: SET_WASHER_PROGRAM,
        payload: washerProgram,
    });
};

export const setWasherTime = washerTime => dispatch => {
    dispatch({
        type: SET_WASHER_TIME,
        payload: washerTime,
    });
};

export const setInduction1 = induction1 => dispatch => {
    dispatch({
        type: SET_INDUCTION1,
        payload: induction1,
    });
};

export const setInduction2 = induction2 => dispatch => {
    dispatch({
        type: SET_INDUCTION2,
        payload: induction2,
    });
};

export const setInduction3 = induction3 => dispatch => {
    dispatch({
        type: SET_INDUCTION3,
        payload: induction3,
    });
};

export const setInduction4 = induction4 => dispatch => {
    dispatch({
        type: SET_INDUCTION4,
        payload: induction4,
    });
};

export const setValueInduction1 = valueInduction1 => dispatch => {
    dispatch({
        type: SET_VALUE_INDUCTION1,
        payload: valueInduction1,
    });
};

export const setValueInduction2 = valueInduction2 => dispatch => {
    dispatch({
        type: SET_VALUE_INDUCTION2,
        payload: valueInduction2,
    });
};

export const setValueInduction3 = valueInduction3 => dispatch => {
    dispatch({
        type: SET_VALUE_INDUCTION3,
        payload: valueInduction3,
    });
};

export const setValueInduction4 = valueInduction4 => dispatch => {
    dispatch({
        type: SET_VALUE_INDUCTION4,
        payload: valueInduction4,
    });
};

export const setCoolerTemp = coolerTemp => dispatch => {
    dispatch({
        type: SET_COOLER_TEMP,
        payload: coolerTemp,
    });
};