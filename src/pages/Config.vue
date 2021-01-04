<template>
  <q-page padding>
    <div class="row full-width justify-center items-start content-center q-gutter-xs">
      <div class="col-12 text-center">
        <img width="340" :src="require('../assets/config.svg')" class="responsive"/>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <fit-card-admin classes="bg-primary text-white" icon="place" label="Lugares" :value="places.length"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { nSQL } from '@nano-sql/core'
import fitCardAdmin from 'components/fitCardAdmin'

export default {
  name: 'Config',
  components: {
    fitCardAdmin
  },
  data () {
    return {
      places: []
    }
  },
  methods: {
    getPlaces () {
      nSQL('locations').query('select').exec().then(r => {
        this.places = r
      })
    }
  },
  mounted () {
    this.getPlaces()
  }
}
</script>
