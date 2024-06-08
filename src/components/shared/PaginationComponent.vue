<template>
    <div class="pagination_wrapper p10 item_color_pagination_color" v-if="pagination">
        <slot name="pagination-left"></slot>
        <ul class="pagination">
            <li><button class="ly_btn btn_paginate"
                        :disabled="pageData.current_page === 1"
                        @click.prevent="changePage(1)">| <i class="fas fa-chevron-left"></i></button></li>
            <li>
                <button class="ly_btn btn_paginate"
                        :disabled="pageData.current_page === 1"
                        @click.prevent="changePage(pageData.current_page - 1)"> <i class="fas fa-chevron-left"></i> PREV</button>
            </li>
            <li>
                <div class="pagination_input">
                    <input type="text" class="form_global" v-model="page"> of {{ pageData.last_page }}
                </div>
                <div class="pagination_btn">
                    <button class="ly_btn" @click.prevent="changePage(page)">GO</button>
                </div>
            </li>
            <li><button class="ly_btn btn_paginate"
                        :disabled="pageData.current_page === pageData.last_page"
                        @click.prevent="changePage(pageData.current_page + 1)">  NEXT <i class="fas fa-chevron-right"></i></button></li>
            <li>
                <button class="ly_btn btn_paginate"
                        :disabled="pageData.current_page === pageData.last_page"
                        @click.prevent="changePage(pageData.last_page)"> <i class="fas fa-chevron-right"></i> |</button>
            </li>
        </ul>
        <slot name="pagination-right"></slot>
    </div>
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            required: false,
        }
    },
    data() {
        return {
            pageData: {...this.pagination},
            page: this.pagination ? this.pagination.current_page : 0
        }
    },
    watch: {
        pagination: {
            deep: true,
            handler() {
                this.pageData = {...this.pagination};
                this.page = this.pagination.current_page;
            }
        }
    },
    methods: {
        changePage(page) {
            this.pageData.current_page = page;
            this.page = page;
            this.$emit('changePage', page);
        }
    }
}
</script>