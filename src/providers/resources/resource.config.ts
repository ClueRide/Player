/**
 * Configuration of the REST API provider.
 * @param RestangularProvider
 */
export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://player-test.clueride.com/rest');

  RestangularProvider.setDefaultHeaders({
    'Authorization': 'Bearer GuestToken'
  });

}
