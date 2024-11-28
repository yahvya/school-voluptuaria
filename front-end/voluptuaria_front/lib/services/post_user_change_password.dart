import 'http_service.dart';

Future<Map<String, dynamic>?> postUserChangePassword({

  required String old_password,
  required String new_password,
  required String new_password_confirmation,

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "old_password": old_password,
    "new_password": new_password,
    "new_password_confirmation": new_password_confirmation,
  };

  final headers = {
    "authentication_token": "",
  };

  return await httpService.post<Map<String, dynamic>>(
    '/user/change-password',
    body,
        (json) => json, // Renvoie directement le JSON
        headers: headers,
  );

}