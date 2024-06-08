export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE,
    };
  },
  methods: {
    getAllQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return Array.from(params.keys()).reduce(
        (acc, val) => ({ ...acc, [val]: params.get(val) }),
        {},
      );
    },
    showSuccessMsg(msg) {
      this.$swal.fire({
        position: 'top-right',
        icon: 'success',
        toast: true,
        title: msg,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    showFailMsg(msg) {
      this.$swal.fire({
        position: 'top-right',
        icon: 'error',
        toast: true,
        title: msg,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    checkPermission(module) {
      const permission = JSON.parse(localStorage.getItem('permission')) || [];
      if (permission && permission.length) {
        const find = permission.find((item) => item.module === module);
        if (find) {
          return true;
        }
        return false;
      }
      return false;
    },
  },
};
