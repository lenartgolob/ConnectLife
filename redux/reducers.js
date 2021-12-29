import { SET_OVEN_STATUS, SET_OVEN_PROGRAM, SET_OVEN_TEMPERATURE, SET_OVEN_MINUTES, SET_OVEN_HOURS, SET_OVEN_TIME,
    SET_WASHER_STATUS, SET_WASHER_PROGRAM, SET_WASHER_TIME, SET_INDUCTION1, SET_INDUCTION2, SET_INDUCTION3, 
    SET_INDUCTION4, SET_VALUE_INDUCTION1, SET_VALUE_INDUCTION2, SET_VALUE_INDUCTION3, SET_VALUE_INDUCTION4, SET_COOLER_TEMP} from './actions';

const initialState = {
    ovenProgram: '',
    ovenTemperature: 0,
    ovenMinutes: 0,
    ovenHours: 0,
    ovenStatus: 'off',
    ovenTime: 0,
    washerStatus: 'off',
    washerProgram: '',
    washerTime: 0,
    induction1: 'default',
    induction2: 'default',
    induction3: 'default',
    induction4: 'default',
    valueInduction1: 0,
    valueInduction2: 0,
    valueInduction3: 0,
    valueInduction4: 0,
    coolerTemp: 5,
}

function kitchenReducer(state = initialState, action) {
    switch(action.type) {
        case SET_OVEN_STATUS:
            return { ...state, ovenStatus: action.payload };
        case SET_OVEN_PROGRAM:
            return { ...state, ovenProgram: action.payload };
        case SET_OVEN_TEMPERATURE:
            return { ...state, ovenTemperature: action.payload };
        case SET_OVEN_MINUTES:
            return { ...state, ovenMinutes: action.payload };
        case SET_OVEN_HOURS:
            return { ...state, ovenHours: action.payload };
        case SET_OVEN_TIME:
            return { ...state, ovenTime: action.payload };
        case SET_WASHER_STATUS:
            return { ...state, washerStatus: action.payload };
        case SET_WASHER_PROGRAM:
            return { ...state, washerProgram: action.payload };
        case SET_WASHER_TIME:
            return { ...state, washerTime: action.payload };
        case SET_INDUCTION1:
            return { ...state, induction1: action.payload };  
        case SET_INDUCTION2:
            return { ...state, induction2: action.payload };
        case SET_INDUCTION3:
            return { ...state, induction3: action.payload };
        case SET_INDUCTION4:
            return { ...state, induction4: action.payload };
        case SET_VALUE_INDUCTION1:
            return { ...state, valueInduction1: action.payload };
        case SET_VALUE_INDUCTION2:
            return { ...state, valueInduction2: action.payload };
        case SET_VALUE_INDUCTION3:
            return { ...state, valueInduction3: action.payload };
        case SET_VALUE_INDUCTION4:
            return { ...state, valueInduction4: action.payload };
        case SET_COOLER_TEMP:
            return { ...state, coolerTemp: action.payload };    
        default:
            return state;                                                                                                                                                                                                  
    }
}

export default kitchenReducer;