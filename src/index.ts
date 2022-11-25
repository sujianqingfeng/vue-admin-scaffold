import Scaffold from './Scaffold'
import type { ScaffoldSchema } from './types'
import { defineScaffoldConfig, defineScaffoldSchema } from './config'

type ScaffoldInstance = InstanceType<typeof Scaffold>

export {
  Scaffold,
  ScaffoldSchema,
  ScaffoldInstance,
  defineScaffoldConfig, 
  defineScaffoldSchema   
}