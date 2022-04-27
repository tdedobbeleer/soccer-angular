// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=p` then `environment.p.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    defaultTeamName: 'SVK',
    api_url: 'http://localhost:9090',
    weather_api_key: 'ed947b1f42105d993e46d24c3d770be2',
    weather_api_country: 'be',
    weather_api_url: 'https://api.openweathermap.org',
    recaptcha_public_key: '6Le0aCkUAAAAACGypCCASAYNfjf2f6SLu8O5V2vf'
};
