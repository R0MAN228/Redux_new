import { Api } from '../../utils/api'
export const setNotes = userId => async dispatch => {
    dispatch({
        type: 'SET/NOTES/LOADING',
    });
    try {
        const data = await Api.getNotes({ userId });
        dispatch({
            type: 'SET/NOTES/DATA',
            payload: data
        });
    } catch (error) {
        dispatch({
            type: 'SET/NOTES/ERROR',
            payload: error
        });
    }
}

export const deleteNotes = (id, userId) => async dispatch => {
    try {
        await Api.deleteNotes(id);
        dispatch(setNotes(userId));
    } catch (error) {
        dispatch({
            type: 'SET/NOTES/ERROR',
            payload: error
        });
    }
}

export const addNote = newNote => async dispatch => {
    try {
        await Api.postNote(newNote);
        dispatch(setNotes(newNote.userId));
    } catch (error) {
        dispatch({
            type: 'SET/NOTES/ERROR',
            payload: error
        });
    }
}

export const editNote = newNote => async dispatch => {
    try {
        await Api.putNote(newNote);
        dispatch(setNotes(newNote.userId));
    } catch (error) {
        dispatch({
            type: 'SET/NOTES/ERROR',
            payload: error
        });
    }
}