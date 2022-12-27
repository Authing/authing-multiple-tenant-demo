import axios from "axios";

import env from "./env";

axios.defaults.baseURL = env("API_BASE_URL");
