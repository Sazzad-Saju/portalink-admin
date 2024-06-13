<template>
    <div class="modal open_modal" style="z-index: 9999" id="customerFile">
        <div class="modal_overlay" @click="closeModal()" />
        <div class="modal_inner">
        <div class="modal_wrapper modal_600p">
            <div class="modal_header display_table">
                <span class="modal_header_title">Profile Picture</span>
                <div class="float_right">
                    <button class="ly_btn btn_blue" @click.prevent="downloadFile(filePath)">Download</button>
                    <span class="close_modal" style="top:6px; left:5px" @click="closeModal()" />
                </div>
            </div>
            <div class="modal_content">
                <div class="ly-wrap-fluid">
                    <div class="ly-row">
                        <div class="ly-12">
                            <div class="list_item_popup_img">
                                <template v-if="['gif', 'png', 'jpg', 'jpeg', 'JPG'].includes(fileExtension)">
                                    <img :src="filePath" alt="filePath" class="width_full"> 
                                </template>
                                <template v-if="['pdf'].includes(fileExtension)">
                                    <embed :src="filePath" class="width_full" height="400"> 
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>

    export default {
        name: 'customer-file-modal',
        props: {
            showSendMailModal: {
                type: Boolean,
                default: false,
            },
            filePath: {
                type: String,
                required: true
            }
        }, 
        computed: {
            fileExtension(){
                return this.filePath.split('.').pop();
            }
        },
        methods: {
            downloadFile(filePath){
                const a = document.createElement('a');
                a.href = filePath;
                let filenameArr  = filePath.split('/');
                let filename = filenameArr[filenameArr.length-1];
                a.download = filename;
                a.style.display = `none`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            },
            closeModal(){
                this.$emit('closeModal');
            },
        }
    }
</script>
