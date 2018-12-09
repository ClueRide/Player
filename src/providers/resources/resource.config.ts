/**
 * Configuration of the REST API provider.
 * @param RestangularProvider
 */
export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('https://player.clueride.com/rest');

  RestangularProvider.setDefaultHeaders({
    'Authorization': 'Bearer GuestToken'
  });

}
