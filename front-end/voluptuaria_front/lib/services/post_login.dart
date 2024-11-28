import 'dart:convert';
import 'http_service.dart';

Future<Map<String, dynamic>?> login({
  required String email,
  required String password,
}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "email": email,
    "password": password,
  };

  return await httpService.post<Map<String, dynamic>>(
    '/login',
    body,
        (json) => json, // Renvoie directement le JSON
  );
}