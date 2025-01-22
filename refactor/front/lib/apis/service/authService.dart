import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  final String baseUrl = "http://192.168.1.105:9045/user/login";

  Future<String> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/try');

    // Les valeurs d'encryptionResult et iv
    final encryptionResult = "2BOlLcFi3PsU7as=";
    final iv = "AWy0JNgtcR+mU1+4dEdbig==";

    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
        'voluptuaria_token': encryptionResult, // Ajout du champ dans les headers
        'voluptuaria_token_iv': iv, // Ajout du champ iv dans les headers
      },
      body: json.encode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      return responseData['token']; // Retourne le token
    } else {
      final error = json.decode(response.body)['message'];
      throw Exception(error); // Retourne une erreur
    }
  }
}
