<template>
	<div>
		<div v-if="checkPermission('dashboard')" class="main_title">
			<h1 class="mr_8">Dashboard</h1>
		</div>
		<div v-if="checkPermission('dashboard')" class="ly_card">
			BASIC DASHBOARD
		</div>
	</div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// import { BarChart } from "vue-chart-3";

export default {
	name: 'DashBoard',
	components: { },
    data() {
        return {
        }
    },
    mounted(){
		
    },
    created() {
    },
    methods: {
    }
}
</script>