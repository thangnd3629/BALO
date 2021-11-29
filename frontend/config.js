import { DEV_API_URL, PROD_API_URL } from "@env"

export default {
  API_URL: __DEV__ ? DEV_API_URL : PROD_API_URL,
}
