<template>
  <div>
    <v-btn @click="toggleMenu">메뉴 토글 {{ menuOpen }}</v-btn>
		<v-list>
    <v-list-group :value="menuOpen">
      <template v-slot:activator="{isOpen, props}">
        <v-list-item-content>
          <v-list-item-title v-bind="props" @click="menuAction(isOpen)">메뉴 제목 {{ isOpen }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item>메뉴 아이템 1</v-list-item>
      <v-list-item>메뉴 아이템 2</v-list-item>
    </v-list-group>
	</v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
		menuAction(isOpen){
			isOpen = !isOpen;
		}
  }
};
</script>
