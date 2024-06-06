<template>
    <div class="side_nav">
        <div class="brand">
            <router-link to="/">
                <img v-if="adminLogo" :src="adminLogo" alt="">
            </router-link>
        </div>
        <div class="side_nav_list">
            <ul>
               Sidebar
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            adminLogo: '',
        }
    },
    created() {
        //Load Logo
        this.axios.get('/setting/get-logo').then((response) => {
            this.adminLogo = response.data.data.black_logo;
        });
    },
    methods: {
      reload(name){
        if(this.$route.name == name){
            this.$store.commit('setReload', true)
        }
      }
    }
}
</script>