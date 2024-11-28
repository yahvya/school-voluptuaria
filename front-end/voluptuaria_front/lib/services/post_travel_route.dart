import 'http_service.dart';

Future<Map<String, dynamic>?> postTravelRoute({

  required String travel_routes,


}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "travel_routes": travel_routes,
  };

  final headers = {
    "authentication_token": "",
  };

  return await httpService.post<Map<String, dynamic>>(
    '/user/travel_routes/generate',
    body,
        (json) => json, // Renvoie directement le JSON
    headers: headers,
  );

}