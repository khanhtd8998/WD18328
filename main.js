const initialState = {
    products: [{
        id: 1,
        name: "San pham 1",
        description: "Mo ta sp 1",
    }],
    checked: false
}

const action = { type: "ADD", payload: { id: 2, name: "San pham 2", description: "Mo ta sp 2" } }

const reducer = (action, state) => {
    switch (action.type) {
        case "ADD": {
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        }
        default: return state
    }
}
console.log(initialState);
const newInitialState = reducer(action, initialState)
console.log(newInitialState);