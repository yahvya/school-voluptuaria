import 'dart:convert';
import 'package:http/http.dart' as http;

class HttpService {
  final String baseUrl;

  HttpService({required this.baseUrl});

  /// Méthode GET générique
  Future<T?> get<T>(String endpoint, T Function(Map<String, dynamic>) fromJson, {Map<String, String>? headers} ) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final Map<String, dynamic> data = jsonDecode(response.body);
        return fromJson(data);
      } else {
        print('GET error: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('GET exception: $e');
      return null;
    }
  }

  /// Méthode POST générique
  Future<T?> post<T>(
      String endpoint, Map<String, dynamic> body, T Function(Map<String, dynamic>) fromJson, {Map<String, String>? headers}) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "voluptuaria_access_config": jsonEncode({
            "token": "psx2RVBgaz+A2ei/BMGmXggtAWXdlKOvaMLU881y",
            "iv": "JsiTM0d41TvKJMSrF3VpsA=="
          }),
          ...?headers, // Ajout des en-têtes supplémentaires si fournis
        },
        body: jsonEncode(body),
      );
      if (response.statusCode == 200 || response.statusCode == 201) {
        final Map<String, dynamic> data = jsonDecode(response.body);
        return fromJson(data);
      } else {
        print('POST error: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('POST exception: $e');
      return null;
    }
  }


  /// Méthode DELETE générique
  Future<T?> delete<T>(
      String endpoint,
      T Function(Map<String, dynamic>) fromJson, {
        Map<String, String>? headers,
      }) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.delete(
        url,
        headers: {
          'Content-Type': 'application/json',
          ...?headers, // Ajout des en-têtes supplémentaires si fournis
        },
      );
      if (response.statusCode == 200 || response.statusCode == 204) {
        if (response.body.isNotEmpty) {
          final Map<String, dynamic> data = jsonDecode(response.body);
          return fromJson(data);
        }
        return null; // DELETE réussi, sans corps de réponse
      } else {
        print('DELETE error: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('DELETE exception: $e');
      return null;
    }
  }
}