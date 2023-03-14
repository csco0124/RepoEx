import { HomeRouters } from './home.js'
import { AuthRouters } from './auth.js'
import { MemberRouters } from './member.js'

const routes = [
  ...HomeRouters,
  ...AuthRouters,
  ...MemberRouters,
]

export default routes
