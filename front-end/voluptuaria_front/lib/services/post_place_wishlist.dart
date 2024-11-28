import 'http_service.dart';

Future<Map<String, dynamic>?> postPlaceWishlist({
  required String callback_datas,

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "callback_datas": callback_datas,
  };

  final headers = {
    "authentication_token": "",
  };

  return await httpService.post<Map<String, dynamic>>(
    '/user/places-wish-list/update',
    body,
        (json) => json, // Renvoie directement le JSON
    headers: headers,
  );

}