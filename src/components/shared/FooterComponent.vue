<template>
    <div class="footer_area">
        <div class="ly-wrap">
            <div class="ly-row">
                <div class="ly-12">
                    <div class="footer_copyright text_center">
                        <p>© Copyright 2024 by <a target="_blank" href="https://portalink.com/">Portalink</a>. All rights reserved.</p>
                        <img v-if="adminLogo" :src="adminLogo" alt="">
                    </div>
                </div>
            </div>
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
            this.adminLogo = response.data.black_logo;
        });
    },
}
</script>