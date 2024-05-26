// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  baseUrlBackend: 'http://localhost:3000/api',
  baseUrlWidget: 'http://localhost:5000/ppw',
  production: false,
  STRIPE_PUBLISHABLE_KEY: 'pk_test_51Kdx1pIW1Ds2aqQrxLJEF6wwxxPzhSVvgSMXz04gLh1aDDLt2f4xY0hqjpKJxCSTs2Lc1Tl4kvE7zmwaTAJs3yxt000dOdWCiT'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.