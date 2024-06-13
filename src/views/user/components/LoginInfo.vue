<template>
    <div>
        <div class="ly_accrodion">
            <div class="ly_accrodion_heading">
                <div class="ly_accrodion_title open_acc" data-toggle="accordion" data-target="#customerLoginInformation"
                    data-class="accordion">
                    <span>User Login Info</span>
                </div>
            </div>
            <div class="accordion_body default_accrodion open" id="customerLoginInformation">
                <div class="ly-wrap-fluid">
                    <div class="ly-row">
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('first_name') }]">
                                <div class="label_inline required width_150p">
                                    First Name
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="form.first_name">
                                    <v-errors :form-errors="errorFor('first_name')"></v-errors>
                                </div>
                            </div>
                            <div :class="['form_row', { 'has_error': errorFor('email') }]">
                                <div class="label_inline required width_150p">
                                    Email
                                </div>
                                <div class="form_inline">
                                    <input type="email" class="form_global" v-model="form.email">
                                    <v-errors :form-errors="errorFor('email')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('last_name') }]">
                                <div class="label_inline required width_150p">
                                    Last Name
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="form.last_name">
                                    <v-errors :form-errors="errorFor('last_name')"></v-errors>
                                </div>
                            </div>
                            <div :class="['form_row', { 'has_error': errorFor('username') }]">
                                <div class="label_inline required width_150p">
                                    username
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="form.username">
                                    <v-errors :form-errors="errorFor('username')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('password') }]">
                                <div class="label_inline required width_150p">
                                    Password
                                </div>
                                <div class="form_inline">
                                    <input type="password" class="form_global" v-model="form.password">
                                    <v-errors :form-errors="errorFor('password')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60 col_gray">
                            <div :class="['form_row', { 'has_error': errorFor('password') }]">
                                <div class="label_inline width_150p">
                                    Status
                                </div>
                                <div class="form_inline">
                                    <div class="custom_radio">
                                        <input type="radio" id="statusActive" name="status" v-model="form.status"
                                            value="1" disabled>
                                        <label for="statusActive">Active</label>
                                    </div>
                                    <div class="custom_radio">
                                        <input type="radio" id="statusInactive" name="status" v-model="form.status"
                                            value="0" disabled>
                                        <label for="statusInactive">Inactive</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60 col_gray">
                            <div :class="['form_row', { 'has_error': errorFor('password') }]">
                                <div class="label_inline width_150p">
                                    Type
                                </div>
                                <div class="form_inline">
                                    <div class="custom_radio">
                                        <input type="radio" id="typeBasic" name="type" v-model="form.type" value="0"
                                            disabled>
                                        <label for="typeBasic">Basic</label>
                                    </div>
                                    <div class="custom_radio">
                                        <input type="radio" id="typeStandard" name="type" v-model="form.type"
                                            value="1" disabled>
                                        <label for="typeStandard">Standard</label>
                                    </div>
                                    <div class="custom_radio">
                                        <input type="radio" id="typePremium" name="type" v-model="form.type"
                                            value="2" disabled>
                                        <label for="typePremium">Premium</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="item_list_advanced_search mb_20">
            <div class="float_right">
                <div class="display_inline mr_0">
                    <button class="ly_btn  btn_blue min_width_100p" :disabled="loading"
                        @click.prevent="update">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    props: ['customer'],
    name: "LoginInfo",
    computed: {
        ...mapGetters({
            user: 'auth/getUser'
        })
    },
    data(){
        return {
            form: {}
        }
    },
    watch: {
        customer: {
            deep: true,
            handler(newVal) {
                this.form = newVal
            }
        }
    },
    methods: {
        update() {
            this.errors = null;
            this.loading = true;

            this.axios.patch('/customers/' + this.user.id, this.form)
                .then(() => {
                    this.showSuccessMsg("Customer Update Successfully!");
                    this.$emit('loadData', this.user.id)
                })
                .catch((err) => {
                    this.errors = err.response.data.errors
                })
                .finally(() => {
                    this.loading = false;
                })
        },
    }
}
</script>