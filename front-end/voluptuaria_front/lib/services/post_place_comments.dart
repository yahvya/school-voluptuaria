import 'dart:convert';
import 'http_service.dart';

Future<Map<String, dynamic>?> postPlaceComments({
  required String comment,
  required num rating,
  required String callback_datas,
}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "comment": comment,
    "rating": rating,
    "callback_datas" : callback_datas
  };

  final headers = {
    "authentication_token" : "",
  };

  return await httpService.post<Map<String, dynamic>>(
    '/place/comments',
    body,
        (json) => json, // Renvoie directement le JSON
        headers: headers
  );

}