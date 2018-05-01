import { createStore } from 'redux';
import rootReducer from './reducers';

let store = createStore(rootReducer);
console.disableYellowBox = true;
export default store;

