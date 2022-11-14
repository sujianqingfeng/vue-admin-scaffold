import { createAxios, createSerializeInterceptor,  createExtractDataInterceptor } from '@sujian/utils'

export const request = createAxios({}, {
  requests: [createSerializeInterceptor()],
  responses: [createExtractDataInterceptor()]
})