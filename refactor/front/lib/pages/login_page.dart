import 'package:flutter/material.dart';
import 'package:front/resources/themes/colors.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart'; // Pour stocker le token
import 'package:front/components/custom_text_field.dart';
import 'package:front/components/button.dart';

import '../apis/service/authService.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final AuthService _authService = AuthService(); // Instance du service API
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final _storage = const FlutterSecureStorage(); // Pour stocker le token

  bool _isLoading = false;

  // Fonction de login
  Future<void> _login() async {
    setState(() {
      _isLoading = true; // Affiche un indicateur de chargement
    });

    try {
      // Appel à l'API pour se connecter
      final token = await _authService.login(
        "ambrois@gmail.com",
        "Motdepase@@1",
      );
      print("Valeur du token : $token");

      // Stocke le token
      await _storage.write(key: 'auth_token', value: token);

      // Redirige l'utilisateur ou affiche un message de succès
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Connexion réussie')),
      );
      // Redirection possible vers une autre page
      Navigator.pushReplacementNamed(context, '/home');

    } catch (error) {
      // Affiche une erreur
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur:  $error ')),
      );
    } finally {
      setState(() {
        _isLoading = false; // Cache l'indicateur de chargement
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Connexion'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 32.0),
              Text(
                'Voluptuaria',
                style: const TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32.0),
              // Champ email
              CustomTextField(
                controller: _emailController,
                placeholder: 'Email',
                obscureText: false,
              ),
              const SizedBox(height: 16.0),
              // Champ mot de passe
              CustomTextField(
                controller: _passwordController,
                placeholder: 'Mot de passe',
                obscureText: true,
              ),
              const SizedBox(height: 16.0),
              // Indicateur de chargement ou bouton de connexion
              if (_isLoading)
                const Center(child: CircularProgressIndicator())
              else
                CustomButton(
                  text: 'Connexion',
                  onPressed: _login,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
