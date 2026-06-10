import '@testing-library/jest-dom'
import myAxios from '../api/myAxios'
import { testServer } from './server'

myAxios.defaults.adapter = 'http'
// no baseURL override — keep the app's default baseURL: '/'

beforeAll(() => testServer.listen())
afterEach(() => testServer.resetHandlers())
afterAll(() => testServer.close())