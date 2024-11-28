import 'http_service.dart';

Future<Map<String, dynamic>?> loginForgotConfirm({
  required String email,
  required String encrypted_confirmation_code,
  required String encryption_iv,
  required String user_confirmation_code,
  required String new_password,

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");


  final body = {
    "email": email,
    "encrypted_confirmation_code": encrypted_confirmation_code,
    "encryption_iv": encryption_iv,
    "user_confirmation_code": user_confirmation_code,
    "new_password": new_password,

  };

  return await httpService.post<Map<String, dynamic>>(
    '/login/forgot-password/confirm',
    body,
        (json) => json, // Renvoie directement le JSON
  );
}