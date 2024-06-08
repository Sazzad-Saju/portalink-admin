<template>
    <div class="side_nav">
        <div class="brand">
            <router-link to="/">
                <img v-if="adminLogo" :src="adminLogo" alt="">
            </router-link>
        </div>
        <div class="side_nav_list">
            <ul>
                <template v-if="checkPermission('customer')">
                    <li data-toggle="accordion" data-target="#Customers" class="accordion_heading"
                        data-class="accordion">
                        Customers
                    </li>
                    <ul class="sub_accordion default_accrodion" id="Customers">
                        <li><router-link :to="{ name: 'customers' }"> All Customers</router-link></li>
                        <li><router-link :to="{ name: 'create-customer' }"> Create Customer</router-link></li>
                    </ul>
                </template>
                <template v-if="checkPermission('settings')">
                    <li data-toggle="accordion" data-target="#bannerManager" class="accordion_heading"
                        data-class="accordion">
                        Settings
                    </li>
                    <ul class="sub_accordion default_accrodion" id="bannerManager">
                        <li><router-link :to="{ name: 'banner_logos' }">Logo</router-link></li>
                    </ul>
                </template>
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
        reload(name) {
            if (this.$route.name == name) {
                this.$store.commit('setReload', true)
            }
        }
    }
}
</script>