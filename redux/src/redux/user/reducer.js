const initialState = {
    data: null,
    loading: false,
    error: null,
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET/USER/LOADING':
            return { ...state, loading: true, error: null, data: null }
        case 'SET/USER/DATA':
            return { ...state, loading: false, error: null, data: payload }
        case 'SET/USER/ERROR':
            return { ...state, loading: false, error: payload }
        default:
            return state
    }
}