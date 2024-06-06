<template>
  <template v-if="loaded">
      <template v-if="!['login'].includes($route.name)">
          <sidebar-component></sidebar-component>

          <div id="wrapper">
              <header-component></header-component>

              <div id="main_content">
                  <router-view></router-view>
              </div>

              <footer-component></footer-component>
          </div>
      </template>

      <router-view v-else></router-view>
  </template>
</template>

<script>
import HeaderComponent from "@/components/shared/HeaderComponent";
import SidebarComponent from "@/components/shared/SidebarComponent";
import FooterComponent from "@/components/shared/FooterComponent";

export default {
    name: 'App',
    components: { HeaderComponent, FooterComponent, SidebarComponent },
    data() {
        return {
            loaded: false,
        }
    },
    async created() {
        await this.axios('/user')
            .then(()=>{
              this.axios('/get/login-user/permission')
                  .then((response) => {
                    localStorage.setItem('permission', JSON.stringify(response.data));
                  })
            })
            .catch(() => {
                this.$store.dispatch('auth/logout');
                this.$router.push({name: 'login'});
            })
            .finally(() => this.loaded = true)
    },
}
</script>
