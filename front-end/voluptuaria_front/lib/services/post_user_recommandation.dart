import 'http_service.dart';

Future<Map<String, dynamic>?> postUserRecommandation({

  required num paging,
  required String user_location

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "paging": paging,
    "user_location": user_location,
  };

  final headers = {
    "authentication_token": "",
  };

  return await httpService.post<Map<String, dynamic>>(
    '/user/recommandations/auth',
    body,
        (json) => json, // Renvoie directement le JSON
    headers: headers,
  );

}