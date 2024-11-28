import 'http_service.dart';

final HttpService _httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

Future<Map<String, dynamic>?> getPlaceComments({
  required String paging,
  required  Map<dynamic, dynamic> callbackDatas,
}) async {
  // Construire l'URL avec les query parameters
  final endpoint = '/place/comments';

  final queryParameters = {
    "paging": paging,
    "callbackDatas": callbackDatas,
  };

  final headers = {
    "" : "",
  };


  final queryString = Uri(queryParameters: queryParameters).query;

  return await _httpService.get<Map<String, dynamic>>(
    '$endpoint?$queryString',
        (json) => json, // Transformer les données JSON en Map
        headers : headers
  );
}