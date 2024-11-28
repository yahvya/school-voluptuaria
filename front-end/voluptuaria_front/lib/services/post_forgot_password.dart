import 'dart:convert';
import 'http_service.dart';

Future<Map<String, dynamic>?> loginForgot({
  required String email,
}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "email": email,
  };

  return await httpService.post<Map<String, dynamic>>(
    '/login/forgot-password',
    body,
        (json) => json, // Renvoie directement le JSON
  );
}