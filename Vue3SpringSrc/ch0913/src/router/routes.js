import { HomeRouters } from './home.js'
import { AuthRouters } from './auth.js'
import { MemberRouters } from './member.js'
import { CodeGroupRouters } from './codegroup.js'

const routes = [
  ...HomeRouters,
  ...AuthRouters,
  ...MemberRouters,
  ...CodeGroupRouters,
]

export default routes
