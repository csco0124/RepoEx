<template>
	<main>
		<h1>Test1</h1>
		<v-btn @click="ajaxGetTest">
			Ajax Get Test
		</v-btn>
		<v-btn>
			Ajax Post Test
		</v-btn>
	</main>
</template>

<script>
import $api from '@/common/CommonAxios';

export default {
	name: "Test1View",
	data: () => ({

	}),
	methods: {
		async ajaxGetTest(){
			const res = await $api.get("/dbTest");
			console.log('res', res.data.curDate);
		}
	},
}

</script>