import axios from "axios";

import store from "../store";

const getAccessToken = () => store.getState().auth.getAccessToken


export const apiEndpintURL = 'http://127.0.0.1:8000/'