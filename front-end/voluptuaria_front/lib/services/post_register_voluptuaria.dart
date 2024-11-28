import 'http_service.dart';

Future<Map<String, dynamic>?> postRegisterVoluptuaria({
  required String email,
  required String name,
  required String firstname,
  required String password,

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "email": email,
    "name": name,
    "firstname": firstname,
    "password": password,
  };

  final headers = {
    "lang": "french",
  };

  return await httpService.post<Map<String, dynamic>>(
    '/register/voluptuaria',
    body,
        (json) => json, // Renvoie directement le JSON
        headers: headers,
  );

}