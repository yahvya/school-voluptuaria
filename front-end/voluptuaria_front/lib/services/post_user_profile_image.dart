import 'http_service.dart';

Future<Map<String, dynamic>?> postUserProfileImage({

  required String image,

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "image": image,
  };

  final headers = {
    "authentication_token": "",
  };

  return await httpService.post<Map<String, dynamic>>(
    '/user/profile-image',
    body,
        (json) => json, // Renvoie directement le JSON
    headers: headers,
  );

}