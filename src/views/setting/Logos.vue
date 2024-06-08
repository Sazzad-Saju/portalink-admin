<template>
    <div>
        <div class="main_title">
            <h1>Upload Logos</h1>
        </div>
        <div class="ly_page_wrapper d_block add_new_item_color">
            <div class="add_new_cat_color">
                <div class="ly-row">
                    <div class="ly-2">
                        <div :class="['form_row text_center', {'has_error': errorFor('black_logo')}]">
                            <div class="label_inline mb_5  d_block align_middle fw_500">Black Logo:</div>
                            <div class="form_inline d_block align_middle">
                                <div class="upload-btn-wrapper">
                                    <button class="ly_btn btn_blue_hover">Choose File</button>
                                    <input type="file" accept="image/png, image/gif, image/jpeg" @change="readImagePath($event, 'black_logo')">
                                    <img class="d_block mt_15" :src="tempPath.black_logo" alt="" width="100">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ly-2">
                        <div :class="['form_row text_center', {'has_error': errorFor('white_logo')}]">
                            <div class="label_inline mb_5  d_block align_middle fw_500">White Logo:</div>
                            <div class="form_inline d_block align_middle">
                                <div class="upload-btn-wrapper">
                                    <button class="ly_btn btn_blue_hover">Choose File</button>
                                    <input type="file" accept="image/png, image/gif, image/jpeg" @change="readImagePath($event, 'white_logo')">
                                    <img class="d_block mt_15" :src="tempPath.white_logo" alt="" width="100">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form_row mt_15">
                        <div class="ly-2">
                            <div class="form_inline d_block">
                                <div class="text_right">
                                    <div class="display_inline mr_0">
                                        <button class="ly_btn btn_blue min_width_100p" :disabled="loading" @click.prevent="submit">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="ly_page_wrapper d_block add_new_item_color mt_15" v-if="banners">
            <div class="add_new_cat_color">
                <div class="ly-row">
                    <div class="ly-3 text_center" v-if="banners && banners.black_logo">
                        <label class="d_block fw_bold mb_5">Black Logo</label>
                        <img :src="banners.black_logo" alt="" width="200">
                        <br>
                        <button class="ly_btn btn_danger width_80p mt_15" @click="deleteRecord('image')">Delete</button>
                    </div>
                    <div class="ly-3 text_center" v-if="banners && banners.white_logo">
                        <label class="d_block fw_bold mb_5">White Logo</label>
                        <img :src="banners.white_logo" alt="" width="200">
                        <br>
                        <button class="ly_btn btn_danger width_80p mt_15" @click="deleteRecord('content')">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    
    export default {
        name: 'LogosView',
        data() {
            return {
                banners: [],
                tempPath: {
                    black_logo: null,
                    white_logo: null,
                },
                form: {
                    type: 'logo',
                    black_logo: '',
                    white_logo: '',
                }
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.axios.get('/setting/get-logo').then((response) => this.banners = response.data.data)
            },
            readImagePath(e, type) {
                this.form[type] = e.target.files[0];
                
                let reader = new FileReader();
                reader.readAsDataURL(this.form[type]);
                reader.onload = e => {
                    this.tempPath[type] = e.target.result;
                };
            },
            submit() {
                this.errors = null;
                this.loading = true;
    
                let formData = new FormData()
                
                Object.keys(this.form).forEach(key => {
                    formData.append(key, this.form[key] ? this.form[key] : '');
                })
                
                const config = {
                    headers: { "content-type": "multipart/form-data" }
                };
    
                this.axios.post('/update-logos', formData, config)
                    .then(() => {
                        this.showForm = false;
                        this.loadData();
                        this.resetForm()
                    })
                    .catch((err) => {
                        this.errors = err.response.data.errors
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            },
            resetForm() {
                this.form = {
                    type: 'logo',
                    black_logo: '',
                    white_logo: '',
                }
                this.tempPath = {
                    black_logo: null,
                    white_logo: null,
                }
            },
            deleteRecord(column) {
                let form = new FormData();
                form.append('column', column)
                this.$swal({
                    title: 'Are you sure want to delete?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    confirmButtonColor: '#dd4b39',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.axios.post('/logo-delete', form).then(() => {
                            this.loadData();
    
                            this.$swal.fire(
                                'Deleted',
                                'Item has been deleted!',
                                'success'
                            )
                        });
                    }
                });
            },
        }
    }
    </script>
    