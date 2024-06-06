<template>
    <div class="login_page_wrapper">
        <div class="login_page">
            <div class="login_inner">
                <div class="login_header text_center">
                    <h2>{{ appName }}</h2>
                    <br>
                </div>
                <div class="login_form">
                    <div class="login_form_field mb_15" :class="{'has_error': errorFor('email')}">
                        <input type="text" class="form_global" v-model="form.email" placeholder="Email">
                        <v-errors :form-errors="errorFor('email')"></v-errors>
                    </div>
                    <div class="login_form_field mb_15" :class="{'has_error': errorFor('password')}">
                        <input type="password" class="form_global" v-model="form.password" @keyup="loginKeyup" placeholder="password">
                        <v-errors :form-errors="errorFor('password')"></v-errors>
                    </div>
                    <div class="login_btn">
                        <button class="ly_btn btn_blue" @click="login">Secure Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import validationErrors from "@/mixins/validationErrors";

export default {
    mixins: [validationErrors],
    computed: {
        ...mapGetters({
            appName: 'getAppName'
        })
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            this.errors = null;

            this.$store.dispatch('auth/login', this.form)
                .then(() => window.location.href = process.env.VUE_APP_BASE)
                .catch((err) => this.errors = err.errors)
                .finally(() => this.loading = false);
        },
        loginKeyup(e) {
            var code = e.keyCode || e.which;
            if(code == 13) {
                this.login();
            }
        }
    }
}
</script>