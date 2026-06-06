import axios from 'axios'
import type { AxiosInstance } from 'axios'

interface MyAxiosInstance extends AxiosInstance {
  isAxiosError: typeof axios.isAxiosError
}

const instance = axios.create({ baseURL: '/' })
;(instance as MyAxiosInstance).isAxiosError = axios.isAxiosError

const myAxios = instance as MyAxiosInstance

export default myAxios