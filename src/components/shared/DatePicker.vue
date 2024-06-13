<template>
    <input type="text" class="datepicker form_global" placeholder="YYYY-MM-DD"  v-text="input">
</template>
<script>

import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker'
export default {
    props: {
        input: String
    },
    emits: ['update:input', 'onSelect'],
    watch: {
        input(value) {
            $(this.$el).datepicker("setDate",  value);
        }
    },
    mounted: function() {
        var self = this;
        $(this.$el).datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function(date) {
                self.$emit('update:input', date);
                self.$emit('onSelect', date);
            }
        });
        $(this.$el).datepicker("setDate",  self.input);
    }
}
</script>