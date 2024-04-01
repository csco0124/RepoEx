<template>
	<main>
		<h1>Test1</h1>
		<v-btn @click="ajaxGetTest">
			Ajax Get Test
		</v-btn> : {{ getResultData }}
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
		}
	},
	async mounted(){
		
	}
}

</script>