<template>
  <small class="d_flex_start"
    v-for="(err, index) in formErrors"
    :key="key(index)">
    {{ err }}
  </small>
</template>

<script>
export default {
  props: ['formErrors'],
  methods: {
    key(index) {
      return `validation_error_${index}_${Math.random()}`;
    },
  },
};
</script>
