import { HomeRouters } from './home.js'
import { AuthRouters } from './auth.js'
import { MemberRouters } from './member.js'
import { CodeGroupRouters } from './codegroup.js'
import { CodeDetailRouters } from './codedetail.js'
import { BoardRouters } from './board.js'
import { NoticeRouters } from './notice.js'
import { ItemRouters } from './item.js'

const routes = [
  ...HomeRouters,
  ...AuthRouters,
  ...MemberRouters,
  ...CodeGroupRouters,
  ...CodeDetailRouters,
  ...BoardRouters,
  ...NoticeRouters,
  ...ItemRouters,
]

export default routes
