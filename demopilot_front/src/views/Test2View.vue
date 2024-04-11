<template>
  <div>
    <v-btn @click="toggleMenu">메뉴 토글 {{ menuOpen }}</v-btn>
		<v-list :opened="opened">
			<v-list-group value="menu1">
      <template v-slot:activator="{isOpen, props}">
				<v-list-item v-bind="props">{{ isOpen }}</v-list-item>
      </template>
      <v-list-item>메뉴 아이템 1-1</v-list-item>
      <v-list-item>메뉴 아이템 1-2</v-list-item>
    </v-list-group>
		<v-list-group value="menu2">
      <template v-slot:activator="{isOpen, props}">
				<v-list-item v-bind="props">{{ isOpen }}</v-list-item>
      </template>
      <v-list-item>메뉴 아이템 2-1</v-list-item>
      <v-list-item>메뉴 아이템 2-2</v-list-item>
    </v-list-group>
	</v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
			opened : ['menu1'],
    };
  },
  methods: {
    toggleMenu() {
			if(this.opened[0] == 'menu1'){
				this.opened[0] = 'menu2';
			} else {
				this.opened[0] = 'menu1';
			}
    },
  }
};
</script>
