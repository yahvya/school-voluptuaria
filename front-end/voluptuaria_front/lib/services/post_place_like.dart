import 'dart:convert';
import 'http_service.dart';

Future<Map<String, dynamic>?> postPlaceLike({
  required String callback_datas,
  required String like_state,
}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "callback_datas": callback_datas,
    "like_state": like_state,
  };

  final headers = {
    "authentication_token" : "",
  };

  return await httpService.post<Map<String, dynamic>>(
      '/place/like/status',
      body,
          (json) => json, // Renvoie directement le JSON
      headers: headers
  );

}