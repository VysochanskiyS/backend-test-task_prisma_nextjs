import axios from "axios";

export const network = axios.create({
  baseURL: 'http://localhost:3200'

})
