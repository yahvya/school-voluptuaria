import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class RegistrationService {
  final String baseUrl = "http://192.168.1.105:9045/user/classic-registration"; // Remplacez cette URL par l'URL de votre API d'inscription

  Future<String> register(String name, String firstname, String email, String password) async {
    final url = Uri.parse('$baseUrl/voluptuaria');

    // Les valeurs d'encryptionResult et iv
    final encryptionResult = "2BOlLcFi3PsU7as=";
    final iv = "AWy0JNgtcR+mU1+4dEdbig==";

    try {
      // Envoi de la requête POST avec les données de l'utilisateur
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'lang' : 'french',
          'voluptuaria_token': encryptionResult, // Ajout du champ dans les headers
          'voluptuaria_token_iv': iv, // Ajout du champ iv dans les headers
        },
        body: json.encode({
          'name': name,
          'firstname': firstname,
          'email': email,
          'password': password,
        }),
      );

      // Vérification de la réponse
      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        // Sauvegarder les informations dans SharedPreferences
        SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString('name', name);
        prefs.setString('firstname', firstname);
        prefs.setString('email', email);
        prefs.setString('password', password); // Sauvegarder le mot de passe (attention à la sécurité)
        prefs.setString('confirmationCode',responseData['confirmation_code']);
        prefs.setString('confirmationCodeIv',responseData['confirmation_code_iv']);
        return ""; // Par exemple, un message de confirmation

      } else {
        // Si l'API retourne un code d'erreur
        final error = json.decode(response.body)['message'];
        throw Exception(error);
      }
    } catch (e) {
      // Gérer les erreurs de réseau ou d'API
      throw Exception('Une erreur s\'est produite: $e');
    }
  }

  // Fonction pour envoyer le code de confirmation au serveur
  Future<String> confirmRegistration(String name, String firstname, String email, String password,String confirmationCode, String confirmationCodeIv, String code) async {
  final url = Uri.parse('$baseUrl/voluptuaria/confirm');
  // Les valeurs d'encryptionResult et iv
  final encryptionResult = "2BOlLcFi3PsU7as=";
  final iv = "AWy0JNgtcR+mU1+4dEdbig==";
    try{
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'voluptuaria_token': encryptionResult, // Ajout du champ dans les headers
          'voluptuaria_token_iv': iv, // Ajout du champ iv dans les headers
        },
        body: jsonEncode({
          'name': name,
          'firstname': firstname,
          'email': email,
          'password': password,
          'confirmation_iv': confirmationCodeIv,
          'encrypted_confirmation_code': confirmationCode,  // Le code de confirmation de l'utilisateur
          'provided_confirmation_code': code,
        }),
      );

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        SharedPreferences token = await SharedPreferences.getInstance();
        token.setString('token', responseData['authentication_token']);
        return responseData['authentication_token'];

      } else {
        // Si l'API retourne un code d'erreur
        final error = json.decode(response.body)['error'];
        throw Exception(error);
      }
    }catch(e)
    {
      // Gérer les erreurs de réseau ou d'API
      throw Exception('Une erreur s\'est produite: $e');
    }
  }


}





