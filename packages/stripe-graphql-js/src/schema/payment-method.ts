import { builder } from '../builder'

builder.objectType('StripePaymentMethod', {
  fields: (t) => ({
    id: t.exposeString('id'),
    object: t.exposeString('object'),
    billingDetails: t.expose('billing_details', {
      type: 'StripePaymentMethodBillingDetails',
      nullable: true
    }),
    card: t.expose('card', {
      type: 'StripePaymentMethodCard',
      nullable: true
    }),
    created: t.exposeInt('created'),
    customer: t.exposeString('customer', {
      nullable: true
    }),
    livemode: t.exposeBoolean('livemode'),
    metadata: t.expose('metadata', {
      type: 'JSON'
    }),
    type: t.expose('type', { type: 'StripePaymentMethodTypes' })
  })
})
