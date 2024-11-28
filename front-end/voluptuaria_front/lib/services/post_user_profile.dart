import 'http_service.dart';

Future<Map<String, dynamic>?> postUserProfile({

  required String name,
  required String firstname,
  required String birthdate,
  required String phonenumber,
  required num gender,

}) async {
  final HttpService httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

  final body = {
    "name": name,
    "firstname": firstname,
    "birthdate": birthdate,
    "phonenumber": phonenumber,
    "gender" : gender
  };

  final headers = {
    "authentication_token": "",
  };

  return await httpService.post<Map<String, dynamic>>(
    '/user/profile',
    body,
        (json) => json, // Renvoie directement le JSON
    headers: headers,
  );

}