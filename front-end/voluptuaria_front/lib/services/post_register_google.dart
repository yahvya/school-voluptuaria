import 'http_service.dart';

Future<Map<String, dynamic>?> postRegisterGoogle({
  required String redirect_url,

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "redirect_url": redirect_url,
  };

  return await httpService.post<Map<String, dynamic>>(
      '/register/by-google',
      body,
          (json) => json, // Renvoie directement le JSON
  );

}