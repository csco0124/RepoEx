import { HomeRouters } from './home.js'
import { AuthRouters } from './auth.js'

const routes = [
  ...HomeRouters,
    ...AuthRouters
]

export default routes
