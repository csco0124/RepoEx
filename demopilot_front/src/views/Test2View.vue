<template>
  <div>
    <v-btn @click="toggleMenu">메뉴 토글 {{ menuOpen }}</v-btn>
		<v-list>
    <v-list-group>
      <template v-slot:activator="{isOpen, props}">
				<v-list-item v-bind="props">{{ isOpen }}</v-list-item>
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
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  }
};
</script>
