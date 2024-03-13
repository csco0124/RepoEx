<template>
	<main>
		<h1>Test1</h1>
		<v-btn @click="ajaxGetTest">
			Ajax Get Test
		</v-btn> : {{ getResultData }}
		<br /><br />
		<v-btn @click="ajaxPostTest">
			Ajax Post Test
		</v-btn> : {{ postResultData }}
	</main>
</template>

<script>
import $api from '@/common/CommonAxios';

export default {
	name: "Test1View",
	data: () => ({
		getResultData: "",
		postResultData: "",
	}),
	methods: {
		async ajaxGetTest() {
			const res = await $api.get("/dbTest");
			this.getResultData = res.data.curDate;
		},
		async ajaxPostTest() {
			let params = {
				param1: 'value1',
				param2: 'value2',
			}
			const res = await $api.post("/dbTest", params);
			this.postResultData = res.data;
		}
	},
	async mounted(){
		
	}
}

</script>