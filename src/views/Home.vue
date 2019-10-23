<template>
  <div class="home">
    <Ysnav />
    <Sy />
    <Foot />
  </div>
</template>

<script>
// @ is an alias to /src
import Sy from "@/components/Sy.vue";
import Ysnav from "@/components/Ysnav.vue";
import Foot from "@/components/Foot.vue";
export default {
  name: "Home",
  components: {
    Sy,
    Ysnav,
    Foot
  }
};
</script>
