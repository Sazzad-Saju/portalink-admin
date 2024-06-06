<template>
    <header class="header_area">
        <ul>
            <li>Welcome Admin!</li>
            <li class="header_account"> more <span></span>
                <ul class="header_account_inner">
                    <li><a href="#" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i>  Sign Out</a></li>
                </ul>
            </li>
        </ul>
    </header>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    methods: {
        logout() {
            this.axios.post('/logout').finally(() => {
                this.$store.dispatch('auth/logout')
                this.$router.push({name: 'login'})
            })
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser'
        })
    }
}
</script>
<style lang="scss" scoped>
    .header_acc_content > li {
        color: #333;
        font-size: 14px;
        text-decoration: none;
    }
</style>