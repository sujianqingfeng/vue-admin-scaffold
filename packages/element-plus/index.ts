import Scaffold from './src/scaffold'

import { ScaffoldProvider } from 'core'

export {
  Scaffold,
  ScaffoldProvider
}

export type ScaffoldInstance = InstanceType<typeof ScaffoldProvider>

export { defineScaffoldSchema, defineScaffoldConfig } from 'shared/config'