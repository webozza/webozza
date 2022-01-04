// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --configuration=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

export const environment = {
  production: true,
  api_url: "http://api.coltpay.com/v1",
  pusher: {
    key: '6ff6eab1bf5bc7903f8e',
    cluster: 'us2',
  }

};

// amranul@leapinglogic.com