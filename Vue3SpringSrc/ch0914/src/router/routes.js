import { HomeRouters } from './home.js'
import { AuthRouters } from './auth.js'
import { MemberRouters } from './member.js'
import { CodeGroupRouters } from './codegroup.js'
import { CodeDetailRouters } from './codedetail.js'

const routes = [
  ...HomeRouters,
  ...AuthRouters,
  ...MemberRouters,
  ...CodeGroupRouters,
  ...CodeDetailRouters,
]

export default routes
