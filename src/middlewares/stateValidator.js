import tv4 from 'tv4'; // https://github.com/geraintluff/tv4
import stateSchema from './stateSchema';

// getState gets the data from our store
export default ({ dispatch, getState }) => next => action => {
    next(action);

    const valid = tv4.validate(getState, stateSchema);
    if(!valid) {
        console.warn('Invalid state schema detected');
    }
};