<template>
    <div>
       <div class="main_title">
            <h1> Update User Information</h1>
        </div>
        <pre>{{customer}}</pre>
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
                                    <input type="text" class="form_global" v-model="customer.first_name">
                                    <v-errors :form-errors="errorFor('first_name')"></v-errors>
                                </div>
                            </div>
                            <div :class="['form_row', { 'has_error': errorFor('email') }]">
                                <div class="label_inline required width_150p">
                                    Email
                                </div>
                                <div class="form_inline">
                                    <input type="email" class="form_global" v-model="customer.email">
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
                                    <input type="text" class="form_global" v-model="customer.last_name">
                                    <v-errors :form-errors="errorFor('last_name')"></v-errors>
                                </div>
                            </div>
                            <div :class="['form_row', { 'has_error': errorFor('username') }]">
                                <div class="label_inline required width_150p">
                                    username
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="customer.username">
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
                                    <input type="password" class="form_global" v-model="customer.password">
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
                                        <input type="radio" id="statusActive" name="status" v-model="customer.status"
                                            value="1" disabled>
                                        <label for="statusActive">Active</label>
                                    </div>
                                    <div class="custom_radio">
                                        <input type="radio" id="statusInactive" name="status" v-model="customer.status"
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
                                        <input type="radio" id="typeBasic" name="type" v-model="customer.type"
                                            value="0" disabled>
                                        <label for="typeBasic">Basic</label>
                                    </div>
                                    <div class="custom_radio">
                                        <input type="radio" id="typeStandard" name="type" v-model="customer.type"
                                            value="1" disabled>
                                        <label for="typeStandard">Standard</label>
                                    </div>
                                    <div class="custom_radio">
                                        <input type="radio" id="typePremium" name="type" v-model="customer.type"
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
            <div class="display_inline mr_0">
                <router-link :to="{ name: 'customers' }" class="link mr_20 item_color_btn">All Customers</router-link>
            </div>
            <div class="float_right">
                <div class="display_inline mr_0">
                    <button class="ly_btn  btn_blue min_width_100p" :disabled="loading" @click.prevent="update">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "UserProfile",
    data() {
        return {
            tempPermissions: [],
            customer: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                username: '',
            },
            editable: false,
        }
    },
    created() {
        if (this.user && this.user.id) {
            this.loadData(this.user.id);
        }
        //   this.getUser();
        //   if (this.$route.params.id) {
        //     this.editable = true
        //     this.loadData(this.$route.params.id)
        //   } else {
        //     this.loadPermissions();
        //   }
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser'
        })
    },
    methods: {
        getUser() {
            this.axios.get('/user')
                .then((response) => {
                    this.customer = response.data
                    console.log(this.customer)
                })
        },
        async loadPermissions() {
            await this.axios.get('get/customer-permission').then((response) => {
                response.data.map((item) => {
                    this.tempPermissions.push({
                        id: item.id,
                        module: item.module,
                        name: item.name,
                        status: false,
                    })
                    this.customer.permissions.push({
                        id: item.id,
                        module: item.module,
                        name: item.name,
                        status: false,
                    })

                })
            })
        },
        submit() {
            this.errors = null;
            this.loading = true;

            let formData = new FormData()

            Object.keys(this.customer).forEach(key => {
                formData.append(key, this.customer[key] ? this.customer[key] : '');
            })

            this.axios.post('/customers', this.customer)
                .then(() => {
                    this.resetForm();
                    this.showSuccessMsg("Customer Created Successfully!");
                })
                .catch((err) => {
                    this.errors = err.response.data.errors
                })
                .finally(() => {
                    this.loading = false;
                })

        },
        resetForm() {
            this.customer = {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                username: '',
                status: 0,
                type: 0,
                permissions: [],
            }
            this.customer.permissions = _.cloneDeep(this.tempPermissions)
        },
        loadData(customerId) {

            this.loading = true;

            this.axios.get('/customers/' + customerId)
                .then((response) => {
                    let customerData = response.data.data;
                    this.customer.first_name = customerData.first_name
                    this.customer.last_name = customerData.last_name
                    this.customer.email = customerData.email
                    this.customer.username = customerData.username
                    this.customer.status = customerData.status
                    this.customer.type = customerData.typeVal
                    this.customer.permissions = [];
                    this.axios.get('get/customer-permission').then((response) => {
                        response.data.map((item) => {
                            let permit = customerData.permissions.find(p => p.module == item.module);
                            this.customer.permissions.push({
                                id: item.id,
                                module: item.module,
                                name: item.name,
                                status: permit ? true : false,
                            })
                        })
                    })
                })
                .catch((e) => {
                    console.log(e)
                    this.showFailMsg("No customer exists!");
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        update() {
            this.errors = null;
            this.loading = true;

            this.axios.patch('/customers/' + this.user.id, this.customer)
                .then(() => {
                    this.showSuccessMsg("Customer Update Successfully!");
                    this.loadData(this.user.id)
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
<style scoped>
.pl_0 {
    padding-left: 0px;
}
</style>