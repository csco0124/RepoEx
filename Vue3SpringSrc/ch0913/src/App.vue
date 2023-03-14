<template>
  <div id="app">
    <router-view name="header" />
    <router-view name="menu" />
    <router-view/>
    <router-view name="footer" />
  </div>
</template>

<script>
import { provide, onMounted } from 'vue'
import { useAuth } from './compositions/useAuth.js'
import Cookies from 'js-cookie'
import { useCodeGroup } from './compositions/useCodeGroup.js'

export default {
  name: 'App',
  setup() {
    const {
      myinfo,
      isAuthorized,
      isAdmin,
      isMember,
      signin,
      signinByToken,
      signout,
    } = useAuth()

    const {
      codeGroups,
      codeGroup,
      fetchCodeGroupList,
      fetchCodeGroup,
    } = useCodeGroup()

    provide("myinfo", myinfo)
    provide("isAuthorized", isAuthorized)
    provide("isAdmin", isAdmin)
    provide("isMember", isMember)
    provide("signin", signin)
    provide("signout", signout)

    provide("codeGroups", codeGroups)
    provide("codeGroup", codeGroup)
    provide("fetchCodeGroupList", fetchCodeGroupList)
    provide("fetchCodeGroup", fetchCodeGroup)

    onMounted (() => {
      const savedToken = Cookies.get('accessToken')
      if (savedToken) {
        signinByToken(savedToken).then(res => {
          console.log('Logined By Token')
        })
      }
    })
  },
}
</script>
