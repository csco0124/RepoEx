import { HomeRouters } from '/@router/home.js'
import { AuthRouters } from '/@router/auth.js'
import { MemberRouters } from '/@router/member.js'
import { CodeGroupRouters } from '/@router/codegroup.js'
import { CodeDetailRouters } from '/@router/codedetail.js'
import { BoardRouters } from '/@router/board.js'
import { NoticeRouters } from '/@router/notice.js'
import { ItemRouters } from '/@router/item.js'
import { CoinRouters } from '/@router/coin.js'
import { UserItemRouters } from '/@router/useritem.js'
import { PdsRouters } from '/@router/pds.js'

const routes = [
  ...HomeRouters,
  ...AuthRouters,
  ...MemberRouters,
  ...CodeGroupRouters,
  ...CodeDetailRouters,
  ...BoardRouters,
  ...NoticeRouters,
  ...ItemRouters,
  ...CoinRouters,
  ...UserItemRouters,
  ...PdsRouters,
]

export default routes
