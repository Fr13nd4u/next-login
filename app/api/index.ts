import axios from "axios";

export default axios.create({
  baseURL: 'https://technical-task-api.icapgroupgmbh.com/api/',
  headers: {
    'accept': 'application/json'
  }
})

