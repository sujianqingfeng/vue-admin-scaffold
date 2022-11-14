import { request } from './utils/request'

export const fetchTestTableListApi = (param: any) =>
  request.get('/mock/api/users', param)
