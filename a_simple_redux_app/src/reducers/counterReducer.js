
export default (state=1, action) => {
    console.log(action)
    switch(action.type){
        case "INCREMENT":
            let newState = state+action.step
            return newState
        default:
            return state
    }

}