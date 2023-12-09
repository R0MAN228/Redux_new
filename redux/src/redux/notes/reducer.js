const initialState = {
    data: [],
    error: null,
    loading: false
}

export const notesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET/NOTES/DATA':
            return { ...state, data: payload, loading: false, error: null }
        case 'SET/NOTES/LOADING':
            return { ...state, loading: true, error: null, data: [] }
        case 'SET/NOTES/ERROR':
            return { ...state, loading: false, error: payload }
        default: return state
    }
}