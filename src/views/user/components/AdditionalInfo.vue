<template>
    <div class="mt_60">
        <div class="ly_accrodion">
            <div class="ly_accrodion_heading">
                <div class="ly_accrodion_title open_acc" data-toggle="accordion" data-target="#additionalInformation"
                    data-class="accordion">
                    <span>User Additional Info</span>
                </div>
            </div>
            <div class="accordion_body default_accrodion open" id="additionalInformation">
                <div class="ly-wrap-fluid">
                    <div class="ly-row">
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('pro_pic') }]">
                                <div class="label_inline required width_150p">
                                    Upload Profile Photo
                                </div>
                                <div class="form_inline align_middle">
                                    <div class="upload-btn-wrapper">
                                        <button class="ly_btn btn_blue_hover">Choose File</button>
                                        <input type="file" @input="(event) => form.pro_pic = event.target.files[0]">
                                        <span class="pl_10" v-if="form.pro_pic && form.pro_pic.name">{{
                                            form.pro_pic.name
                                            }}</span>
                                        <span class="font_italic color_grey_type2 ml_20 font_12p"> Required size: must
                                            be less than 500kb</span>
                                        <span v-if="form.pro_pic" class="color_green ml_20"
                                            @click.prevent="showDownloadFile(form.pro_pic)">Photo</span>
                                    </div>
                                    <v-errors :form-errors="errorFor('pro_pic')"></v-errors>
                                </div>
                            </div>
                            <div :class="['form_row', { 'has_error': errorFor('dob') }]">
                                <div class="label_inline width_150p">
                                    Date of Birth
                                </div>
                                <div class="form_inline datepicker_wrapper">
                                    <date-picker :value="form.dob" @onSelect="setDob($event)"></date-picker>
                                    <v-errors :form-errors="errorFor('dob')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('phone') }]">
                                <div class="label_inline required width_150p">
                                    Phone
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="addressForm.phone">
                                    <v-errors :form-errors="errorFor('phone')"></v-errors>
                                </div>
                            </div>
                            <div :class="['form_row', { 'has_error': errorFor('address') }]">
                                <div class="label_inline required width_150p">
                                    address
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="addressForm.address">
                                    <v-errors :form-errors="errorFor('address')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('city') }]">
                                <div class="label_inline width_150p">
                                    City
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="addressForm.city">
                                    <v-errors :form-errors="errorFor('city')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('state') }]">
                                <div class="label_inline required width_150p">
                                    State
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="addressForm.state">
                                    <v-errors :form-errors="errorFor('state')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('country_id') }]">
                                <div class="label_inline required width_150p">
                                    Country
                                </div>
                                <div class="form_inline">
                                    <div class="select">
                                        <select class="form_global" v-model="addressForm.country_id">
                                            <option value="0">Select Country</option>
                                            <option v-for="(country, index) in countries" :value="country.id"
                                                :key="'country_' + index">{{
                                                country.name }}</option>
                                        </select>
                                        <v-errors :form-errors="errorFor('country_id')"></v-errors>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('postal_code') }]">
                                <div class="label_inline width_150p">
                                    Postal Code
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="addressForm.postal_code">
                                    <v-errors :form-errors="errorFor('postal_code')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('plus_code') }]">
                                <div class="label_inline width_150p">
                                    Plus Code
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" v-model="addressForm.plus_code">
                                    <v-errors :form-errors="errorFor('plus_code')"></v-errors>
                                </div>
                            </div>
                        </div>
                        <div class="ly-6 pl_0 pr_60">
                            <div :class="['form_row', { 'has_error': errorFor('url') }]">
                                <div class="label_inline required width_150p">
                                    Profile URL
                                </div>
                                <div class="form_inline">
                                    <input type="text" class="form_global" disabled :value="form.url">
                                    <v-errors :form-errors="errorFor('url')"></v-errors>
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
                        @click.prevent="updateAdditionalInfo">Update</button>
                </div>
            </div>
        </div>
        <FileModal v-if="showFileModal" :filePath="filePath" @closeModal="hideFileModal" />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import DatePicker from "@/components/shared/DatePicker";
import FileModal from "./FileModal";
export default {
    props: ['customer', 'address'],
    components: { DatePicker, FileModal },
    computed: {
        ...mapGetters({
            user: 'auth/getUser'
        })
    },
    data() {
        return {
            form: {},
            addressForm: {},
            filePath: '',
            showFileModal: false,
            countries: [],
        }
    },
    created() {
        this.axios.get('/countries').then((response) => this.countries = response.data.data);
    },
    watch: {
        customer: {
            deep: true,
            handler(newVal) {
                this.form = newVal
            }
        },
        address: {
            deep: true,
            handler(newVal) {
                this.addressForm = newVal
            }
        }
    },
    methods: {
        showDownloadFile(filePath) {
            this.filePath = filePath;
            this.showFileModal = true;
        },
        hideFileModal() {
            this.filePath = '';
            this.showFileModal = false;
        },
        setDob(value) {
            this.form.dob = value
        },
        updateAdditionalInfo(){
            this.errors = null;
            this.loading = true;
            
            let formData = new FormData()
            
            for(let key in this.form) {
                formData.append(key, this.form[key]);
            }
            
            for(let key in this.addressForm) {
                formData.append(key, this.addressForm[key]);
            }
            
            const config = {
                headers: { "content-type": "multipart/form-data" }
            };
            
            this.axios.post('/customer/update-additional', formData, config)
                .then((res) => {
                    console.log(res)
                }).catch((e) => {
                    console.log(e)
                })
            
        }
    }
}
</script>