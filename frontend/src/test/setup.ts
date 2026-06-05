import '@testing-library/jest-dom'
import myAxios from '../api/myAxios'
import { testServer } from './server'

myAxios.defaults.adapter = 'http'
myAxios.defaults.baseURL = 'http://localhost/api'

beforeAll(() => testServer.listen())
afterEach(() => testServer.resetHandlers())
afterAll(() => testServer.close())