<template>
  <q-card>
    <q-card-section :class="classes" class="text-center">
      <q-icon :name="icon" size="40px"/>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col text-center text-bold">
          {{leftValue}}
        </div>
        <q-separator vertical/>
        <div class="col text-center text-bold">
          {{rightValue}}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'fitCardStats',
  props: {
    classes: {
      type: String
    },
    icon: {
      type: String,
      required: true
    },
    leftValue: {
      type: [String, Number],
      required: true
    },
    rightValue: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
