<template>
  <div class="wrap">
    <v-head></v-head>
<!--    <v-breadcrumb></v-breadcrumb>-->
    <div class="main">
      <div class="content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>

    </div>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import vHead from './header.vue';
  import vFoot from './footer.vue';
  import vBreadcrumb from './breadcrumb.vue';

  export default {
    components: {
      vHead, vFoot, vBreadcrumb
    }
  }
</script>
