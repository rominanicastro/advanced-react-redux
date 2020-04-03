// export default function({ dispatch }) {
//     return function(next) { //next is actually a function
//         return function(action) { // action object (type property and payload)
//              // redux author thought that these nested functions were
//              // the best appoach to take to create a middleware
//         }
//     }
// }

// middleware function syntaxis
export default ({ dispatch }) => next => action => {
    /**
     * Check if the action has a promise on its payload property
     * 1- If it does, then wait for it to resolve
     * 2- If it doesn't, then send the action to the next middleware
     **/
    
    // 2-  
    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    // 1- wait for it to resolve and then create a new action with the data and dispatch it
    action.payload.then(function (response) { // response object
        // over write payload with the result value from the promise
        const newAction = { ...action, payload: response };
        dispatch(newAction);
    })
};