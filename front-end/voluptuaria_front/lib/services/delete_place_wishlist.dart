import 'http_service.dart';

Future<Map<String, dynamic>?> deletePlaceWishlist({
  required String callbackDatas, // Type explicite pour callback_datas
}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final headers = {
    "authentication_token": '',
  };

  // Construire l'URL avec callback_datas en query parameter
  final endpoint = '/user/places-wish-list/update';

  return await httpService.delete<Map<String, dynamic>>(
    endpoint,
        (json) => json, // Renvoie directement le JSON
    headers: headers,
  );
}