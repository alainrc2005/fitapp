<template>
  <q-card class="shadow-8 cursor-pointer" :class="animate"
          @mouseenter="hoverOver" @mouseleave="hoverOut" @click="goRoute">
    <q-card-section :class="classes">
      <div class="row">
        <div class="col-3">
          <q-avatar :icon="icon" size="54px" color="white" text-color="primary" class="shadow-2"/>
        </div>
        <div class="col-9 text-right">
          <div>{{label}}</div>
          <div class="text-h6">{{value}}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'fitCardAdmin',
  data () {
    return {
      animate: []
    }
  },
  props: {
    classes: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    value: {
      type: [String, Number],
      required: true
    },
    to: {
      type: String
    }
  },
  methods: {
    hoverOver () {
      this.animate = ['animate__animated', 'animate__pulse']
    },
    hoverOut () {
      this.animate = []
    },
    goRoute () {
      if (this.to) this.$router.push(this.to)
      else this.$emit('click')
    }
  }
}
</script>
