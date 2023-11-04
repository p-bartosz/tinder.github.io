<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>

  <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
  >
    <!-- <GMapCluster
      :setMaxZoom="() => {}"
    > -->
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
      />
    <!-- </GMapCluster> -->
  </GMapMap>
  <button @click="getLocation">weź lokalizację</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  data() {
    return {
      userPosition: {
        lat: ref(0),
        lng: ref(0)
      },
      center: {lat: 51.093048, lng: 6.842120},
      markers: [
        {
          position: {
            lat: 51.093048, lng: 6.842120
          },
        },
        {
          position: {
            lat: 52, lng: 10
          },
        }
      ]
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // this.userPosition.lat = position.coords.latitude;
          // this.userPosition.lng = position.coords.longitude;
          this.markers[1].position.lat = position.coords.latitude;
          this.markers[1].position.lng = position.coords.longitude;
        })
      }
    }
  }
});
</script>
