import { Notify } from 'quasar'

export function Error (message) {
  Notify.create({
    message,
    color: 'red',
    icon: 'error',
    progress: true,
    group: 'fitcuba'
  })
}

export function Success (message) {
  Notify.create({
    message,
    color: 'green',
    icon: 'check',
    progress: true,
    group: 'fitcuba'
  })
}

export function Warning (message) {
  Notify.create({
    message,
    color: 'accent',
    icon: 'warning',
    progress: true,
    group: 'fitcuba'
  })
}
