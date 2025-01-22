import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> fetchEncryptedToken() async {
  var SECURITY_VOLUPTUARIA_TOKEN_HEADER_KEY = "voluptuaria_token";
  var SECURITY_VOLUPTUARIA_TOKEN_IV_KEY = "voluptuaria_token_iv";
  var SECURITY_VOLUPTUARIA_TOKEN_CLEAR_VALUE = "clear value";
  var SECURITY_VOLUPTUARIA_TOKEN_SECRET = "temporary secret";

  final url = Uri.parse('https://loca/get-encrypted-token');

  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      final encryptedToken = responseData['encryptionResult'];
      final iv = responseData['iv'];

      print('Encrypted Token: $encryptedToken');
      print('IV: $iv');
    } else {
      print('Failed to fetch token. Status code: ${response.statusCode}');
    }
  } catch (error) {
    print('Error fetching token: $error');
  }
}