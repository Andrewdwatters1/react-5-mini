const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';


let initialState = {
  currentValue: 0,
  futureValues: [],
  previousValues: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { 
        currentValue: state.currentValue + action.payload,
        futureValues: [],
        previousValues: [ state.currentValue, ...state.previousValues ]
      }
    case DECREMENT:
      return { 
        currentValue: state.currentValue - action.payload,
        futureValues: [],
        previousValues: [ state.currentValue, ...state.previousValues ]
      }
    case UNDO: 
      return {
        currentValue: state.previousValues[0],
        futureValues: [state.currentValue, ...state.futureValues],
        previousValues: state.previousValues.slice(1)
      }
    case REDO: 
      return {
        currentValue: state.futureValues[0],
        futureValues: state.futureValues.slice(1),
        previousValues: [state.currentValue, ...state.previousValues]
      }
    default:
      return state;
  }
}

export function increment(num) {
  return {
    type: INCREMENT,
    payload: num
  }
}

export function decrement(num) {
  return {
    type: DECREMENT,
    payload: num
  }
}

export function undo() {
  return {
    type: UNDO,
  }
}

export function redo() {
  return {
    type: REDO,
  }
}