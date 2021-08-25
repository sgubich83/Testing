import { combineReducers } from "redux";
import main from "modules/Main/reducers/main";
import auth from "modules/Auth/reducers/auth";

const reducers = combineReducers({
    main,
    auth,
});

export default reducers;
