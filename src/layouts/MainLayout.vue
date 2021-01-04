<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <img :src="require('../assets/fitcuba.png')" @click="drawer = !drawer"/>
        <q-toolbar-title>
          FITCuba
        </q-toolbar-title>

        <div>{{ time }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer"
              :width="200"
              content-class="bg-primary text-white">
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="dashboard"/>
            </q-item-section>
            <q-item-section>
              Inicio
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item clickable v-ripple to="/config" exact>
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              Configurar
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item clickable v-ripple to="/sync" exact>
            <q-item-section avatar>
              <q-icon name="sync"/>
            </q-item-section>
            <q-item-section>
              Sincronizar
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout"/>
            </q-item-section>
            <q-item-section>
              Salir
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'MainLayout',
  data () {
    return {
      now: Date.now(),
      drawer: false
    }
  },
  computed: {
    time () {
      return date.formatDate(this.now, 'DD/MM/YYYY HH:mm')
    }
  },
  created () {
    setInterval(() => {
      this.now = Date.now()
    }, 1000)
  }
}
</script>
<style>
.q-item.q-router-link--active {
  color: yellow !important;
}
</style>
