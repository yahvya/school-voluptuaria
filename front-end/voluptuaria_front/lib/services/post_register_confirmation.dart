import 'http_service.dart';

Future<Map<String, dynamic>?> postRegisterConfirmation({
  required String email,
  required String name,
  required String firstname,
  required String password,
  required String encrypted_confirmation_code,
  required String encryption_iv,
  required String user_confirmation_code,

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "email": email,
    "name": name,
    "firstname": firstname,
    "password": password,
    "encrypted_confirmation_code": encrypted_confirmation_code,
    "encryption_iv": encryption_iv,
    "user_confirmation_code": user_confirmation_code,
  };

  return await httpService.post<Map<String, dynamic>>(
    '/register/confirmation',
    body,
        (json) => json, // Renvoie directement le JSON
  );

}