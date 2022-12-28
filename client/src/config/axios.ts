import axios from "axios";

import env from "./env";

axios.defaults.baseURL = env("PROXY_BASE_URL");
