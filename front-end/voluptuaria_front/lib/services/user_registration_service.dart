import 'package:http/http.dart' as http;
import 'package:voluptuaria_front/config/config.dart';
import 'package:voluptuaria_front/utils/encryption_utils.dart';
import 'dart:convert';

class UserRegistrationService {
  final String baseUrl;
  final String encryptionSecret;

  UserRegistrationService({required this.baseUrl, required this.encryptionSecret});

  Future<Map<String, dynamic>> classicallyRegisterUser({
    required String lang,
    required String email,
    required String password,
    required String name,
    required String firstname,
  }) async {
    final url = Uri.parse('$baseUrl/user/classic-registration/voluptuaria');
    final requestBody = {
      'name': name,
      'firstname': firstname,
      'email': email,
      'password': password
    };

    final encryptionUtil = EncryptionUtil();

    final encryptionResult = await encryptionUtil.encrypt(
      toEncrypt: await Config.securityVoluptuariaTokenClearValue,
      secretKey: await Config.securityVoluptuariaTokenSecret,
    );

    final headers = {
      'accept': 'application/json',
      'lang': lang,
      'voluptuaria_token_iv': "DbqybCkrQwk+i6tQ4/i9/A==",
      'voluptuaria_token': "zuK2e/26FltqbR0=",
      'Content-Type': 'application/json',
    };

    print('URL: $url');
    print('Headers: ${json.encode(headers)}');
    print('Request Body: ${json.encode(requestBody)}');

    try {
      final response = await http.post(
        url,
        headers: headers,
        body: json.encode(requestBody),
      );

      print("response: ${response.statusCode}");
      print("response: ${response.body}");

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        return {'error': 'Failed to register user. Status code: ${response.statusCode}'};
      }
    } catch (error) {
      return {'error': 'Error registering user: $error'};
    }
  }

  Future<Map<String, dynamic>> classicallyConfirmUserRegistration({
    required String email,
    required String password,
    required String name,
    required String firstname,
    required String encryptedConfirmationCode,
    required String confirmationIv,
    required String providedConfirmationCode,
  }) async {
    final url = Uri.parse('$baseUrl/classic-confirm');
    final requestBody = {
      'requestDto': {
        'email': email,
        'password': password,
        'name': name,
        'firstname': firstname,
        'encryptedConfirmationCode': encryptedConfirmationCode,
        'confirmationIv': confirmationIv,
        'providedConfirmationCode': providedConfirmationCode,
      }
    };

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode(requestBody),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        return {'error': 'Failed to confirm registration. Status code: ${response.statusCode}'};
      }
    } catch (error) {
      return {'error': 'Error confirming registration: $error'};
    }
  }
} 