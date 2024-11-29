import 'http_service.dart';

Future<Map<String, dynamic>?> postUserNoAuthRecommandation({

  required num paging,
  required String user_location,
  required String user_searches

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "paging": paging,
    "user_location": user_location,
    "user_searches": user_searches
  };


  return await httpService.post<Map<String, dynamic>>(
    '/user/recommandations/not-auth',
    body,
        (json) => json, // Renvoie directement le JSON
  );

}