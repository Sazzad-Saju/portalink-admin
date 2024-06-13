<template>
    <div>
       <div class="main_title">
            <h1> Update User Information</h1>
        </div>
        <login-info :customer="customer" @loadData="loadData"/>
        
        <!-- additional-info -->
         <additional-info :customer="customer" :address="address"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginInfo from "./components/LoginInfo";
import AdditionalInfo from "./components/AdditionalInfo";
export default {
    name: "UserProfile",
    components: {LoginInfo, AdditionalInfo},
    data() {
        return {
            customer: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                username: '',
                dob: '',
                pro_pic: '',
            },
            address: {},
        }
    },
    created() {
        if (this.user && this.user.id) {
            this.loadData(this.user.id);
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUser'
        })
    },
    methods: {
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
                    this.customer.dob = customerData.dob
                    this.customer.pro_pic = customerData.pro_pic
                    this.customer.url = customerData.url
                    this.address = customerData.address
                })
                .catch((e) => {
                    console.log(e)
                    this.showFailMsg("No customer exists!");
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