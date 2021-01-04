import { nSQL } from '@nano-sql/core'
import { getMode } from '@nano-sql/adapter-sqlite-cordova'

export default async (/* { app, router, Vue ... } */) => {
  await nSQL().createDatabase({
    id: 'fitcuba',
    mode: getMode(),
    tables: [{
      name: 'visits',
      model: {
        'uuid:uuid': { pk: true },
        'id:int': { notNull: true },
        'name:string': { notNull: true },
        'country:string': { notNull: true },
        'organization:string': { notNull: true },
        'date:string': { notNull: true },
        'place:string': { notNull: true },
        'upload:int': { notNull: true, default: 0 }
      },
      indexes: {
        'date:string': {},
        'place:string': {}
      }
    }, {
      name: 'contacts',
      model: {
        'uuid:uuid': { pk: true },
        'id:int': { notNull: true },
        'name:string': { notNull: true },
        'country:string': { notNull: true },
        'organization:string': { notNull: true },
        'date:string': { notNull: true },
        'place:string': { notNull: true },
        'upload:int': { notNull: true, default: 0 }
      },
      indexes: {
        'date:string': {},
        'place:string': {}
      }
    }, {
      name: 'config',
      model: {
        'key:string': { pk: true },
        'value:string': {}
      }
    }, {
      name: 'locations',
      model: {
        'id:int': { pk: true, ai: true },
        'place:string': {}
      }
    }],
    version: 1
  }).then(() => {
    nSQL('locations').query('select', ['COUNT(*) as cnt']).exec().then(async r => {
      if (r && r.length > 0 && r[0].cnt === 0) {
        await nSQL('locations').query('upsert', [
          { id: 1, place: 'Entrada Principal' },
          { id: 2, place: 'Stand Infotur' },
          { id: 3, place: 'Stand Gran Caribe' },
          { id: 4, place: 'Stand Gaviota' }
        ]).exec()
      }
    })
  }).catch(e => {
    console.error(e.message)
  })
}
