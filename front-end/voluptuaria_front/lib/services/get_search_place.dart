import 'http_service.dart';

final HttpService _httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

Future<Map<String, dynamic>?> searchPlace({
  required String search,
  required String min_rating,
}) async {
  // Construire l'URL avec les query parameters
  final endpoint = '/search/place';

  final queryParameters = {
    "search": search,
    "min_rating": min_rating,
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