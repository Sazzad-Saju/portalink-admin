<template>
    <header class="header_area">
        <ul>
            <li>Welcome {{user ? user.username : 'Admin'}}!</li>
            <template v-if="checkPermission('user')">
            <li class="header_accordion"> <span><i class="fas fa-cog"></i> USER CONTROLLER</span>
                <ul class="header_acc_content">
                        <li data-toggle="accordion" data-target="#User" class="accordion_heading"
                            data-class="accordion">
                            User Controller
                        </li>
                        <ul class="sub_accordion default_accrodion" id="User">
                            <li><router-link :to="{ name: 'profile' }">Profile</router-link></li>
                            <!-- <li><router-link :to="{ name: 'shipping_methods' }">Shipping Method</router-link></li>
                            <li><router-link :to="{ name: 'couriers' }">Courier</router-link></li>
                            <li><router-link :to="{ name: 'social_credentials' }">Social Media Credential</router-link>
                            </li>
                            <li><router-link :to="{ name: 'social_media' }">Social Media</router-link></li>
                            <li><router-link :to="{ name: 'promotions' }">Promotion</router-link></li>
                            <li><router-link :to="{ name: 'point_systems' }">Point System</router-link></li>
                            <li><router-link :to="{ name: 'account_settings' }">Account Setting</router-link></li>
                            <li><router-link :to="{ name: 'messages' }">Messages</router-link></li> -->
                        </ul>
                </ul>
            </li>
            </template>
            <li class="header_account"> more <span></span>
                <ul class="header_account_inner">
                    <li><a href="#" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i> Sign Out</a></li>
                </ul>
            </li>
        </ul>
    </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    methods: {
        logout() {
            this.axios.post('/logout').finally(() => {
                this.$store.dispatch('auth/logout')
                this.$router.push({ name: 'login' })
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
.header_acc_content>li {
    color: #333;
    font-size: 14px;
    text-decoration: none;
}
</style>