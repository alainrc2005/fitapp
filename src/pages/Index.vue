<template>
  <q-page padding>
    <div class="row full-width justify-center items-start content-center q-gutter-xs">
      <div class="col-12 text-center">
        <img width="340" :src="require('../assets/booking.svg')" class="responsive"/>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <fit-card-stats classes="bg-primary text-white" icon="supervised_user_circle" left-value="Visitantes" :right-value="visits"/>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <fit-card-stats classes="bg-primary text-white" icon="verified" left-value="Contactos" :right-value="contacts"/>
      </div>
      <q-btn color="primary" label="Escanear" @click="scan"/>
    </div>
  </q-page>
</template>

<script>
import { nSQL } from '@nano-sql/core'
import fitCardStats from 'components/fitCardStats'
import { Error, Warning, Success } from 'src/helpers/helpers'

const faker = require('faker/locale/es')

export default {
  name: 'PageIndex',
  components: {
    fitCardStats
  },
  data () {
    return {
      visits: 0,
      contacts: 0
    }
  },
  methods: {
    async updateStats () {
      try {
        const now = window.moment().format('YYYY-MM-DD')
        const sd = `${now} 00:00`, ed = `${now} 23:59`
        this.visits = (await nSQL('visits').query('select', ['COUNT(*) as cnt'])
          .where(['date', '>=', sd, 'AND', 'date', '<=', ed]).exec())[0].cnt
        this.contacts = (await nSQL('contacts').query('select', ['COUNT(*) as cnt'])
          .where(['date', '>=', sd, 'AND', 'date', '<=', ed]).exec())[0].cnt
      } catch (e) {
        Error('Error de acceso a las estadísticas')
        console.error(e.message)
      }
    },
    getJSON (capture) {
      const result = { code: 'Ok' }
      try {
        result.row = JSON.parse(capture)
        if (Object.getOwnPropertyNames(result.json).reduce((carry, current) => {
          carry += ['id', 'name', 'email', 'organization', 'country'].indexOf(current) !== -1 ? 0 : 1
          return carry
        }, 0) !== 0) {
          result.code = 'BadQR'
          return result
        }
      } catch (e) {
        result.code = 'Error'
        console.error(e)
      }
      return result
    },
    getFakerJSON () {
      return {
        code: 'Ok',
        row: {
          id: faker.random.number(),
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          email: faker.internet.email(),
          organization: faker.company.companyName(),
          country: faker.address.country()
        }
      }
    },
    scan () {
      const self = this
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          if (result.cancelled) {
            return Warning('Captura Cancelada')
          }
          const json = self.getFakerJSON()
          if (json.code !== 'Ok') {
            return Error('Error en formato del QR')
          }
          json.row.date = window.moment().format('YYYY-MM-DD HH:mm')
          json.row.place = 'Stand Infotur'
          nSQL('visits').query('upsert', json.row).exec().then(() => {
            Success(json.row.name)
            navigator.notification.beep(1)
            self.updateStats()
            setTimeout(() => {
              self.scan()
            }, 2000)
          }).catch(e => {
            Error('Ha ocurrido un error de acceso a datos')
            console.error(e.message)
          })
        },
        function (error) {
          Error('Ha ocurrido un error: ' + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: false, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: false, // Android, save scan history (default false)
          prompt: 'Colóque QR dentro del Área', // Android
          resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
          orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      )
    }
  },
  mounted () {
    faker.seed(Date.now())
    this.updateStats()
  }
}
</script>
