import 'http_service.dart';

final HttpService _httpService = HttpService(baseUrl: "http://192.0.0.2:3000");

Future<Map<String, dynamic>?> getTravelRoute({
  required String startDate,
  required String endDate,
  required num budget,
  required String zone,
}) async {
  // Construire l'URL avec les query parameters
  final endpoint = '/user/travel_routes/generate';

  final queryParameters = {
    "startDate": startDate,
    "endDate": endDate,
    "budget": budget,
    "zone": zone,
  };

  final headers = {
    "authentication_token" : "",
  };

  final queryString = Uri(queryParameters: queryParameters).query;

  return await _httpService.get<Map<String, dynamic>>(
      '$endpoint?$queryString',
          (json) => json, // Transformer les données JSON en Map
      headers : headers
  );
}