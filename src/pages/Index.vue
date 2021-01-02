<template>
  <q-page class="flex flex-center">
    <q-btn color="primary" label="Escanear" @click="scan"/>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
export default {
  name: 'PageIndex',
  methods: {
    scan () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          Notify.create({
            message: result.text,
            icon: 'announcement'
          })
        },
        function (error) {
          alert('Scanning failed: ' + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: false, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: 'Place a barcode inside the scan area', // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
          orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      )
    }
  }
}
</script>
