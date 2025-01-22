import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:front/apis/service/registrationService.dart';
import 'package:front/app/configs/application-routes.dart';
import 'package:front/resources/themes/colors.dart';
import 'package:front/components/icon_button.dart';
import 'package:front/components/blur_background.dart';
import 'package:front/components/custom_text_field.dart';
import 'package:front/components/button.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:go_router/go_router.dart';

class RegistrationPage extends StatefulWidget {
  const RegistrationPage({Key? key}) : super(key: key);
  @override
  State<RegistrationPage> createState() => _RegistrationPage();
}

class _RegistrationPage extends State<RegistrationPage>{
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _firstnameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  // Méthode pour enregistrer un utilisateur
  Future<void> _register() async {
    // Récupérer les données des contrôleurs
    final RegistrationService _regisService = RegistrationService(); // Instance du service API
    final name = _nameController.text;
    final firstname = _firstnameController.text;
    final email = _emailController.text;
    final password = _passwordController.text;
    // Assurez-vous que les champs ne sont pas vides ici
    if (name.isEmpty || firstname.isEmpty || email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Veuillez remplir tous les champs')),
      );
      return;  // Arrête l'exécution si les champs sont vides
    }
    try {
      // Appel du service d'enregistrement
      final response = await _regisService.register(name,firstname,email,password);

      // Affichage d'un message de succès
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Veuillez Confirmer avec le code reçu en mail')),
      );
      GoRouter.of(context).pushNamed(ApplicationRoutes.REGISTRATION_CONFIRMATION_PAGE);
    } catch (e) {
      // Affichage d'un message d'erreur
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: IconButton(
                  onPressed: () {
                    print('Icon button pressed');
                  },
                  icon: const Icon(Icons.home_outlined),
                  iconSize: 35.0,
                ),
              ),
            ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: 16.0),
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Text(
                      'Voluptuaria',
                      style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, fontFamily: 'OpenSans-SemiBold'),
                    ),
            ),
            SizedBox(height: 16.0),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: BlurBackground(
                width: 400.0,
                height: 650.0,
                blurIntensity: 5.0,
                child: Align(
                  alignment: Alignment.topCenter,
                  child: Column(
                    children: [
                      Image.asset(
                        'lib/resources/images/app-icon.png',
                        width: 100.0,
                        height: 100.0,
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          backgroundColor: backgroundColor,
                          controller: _nameController,
                          placeholder: 'Nom',
                          obscureText: false,
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          controller: _firstnameController,
                          backgroundColor: backgroundColor,
                          placeholder: 'Prénom',
                          obscureText: false,
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          backgroundColor: backgroundColor,
                          controller: _emailController,
                          placeholder: 'Email',
                          obscureText: false,
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          backgroundColor: backgroundColor,
                          controller: _passwordController,
                          placeholder: 'Mot de passe',
                          obscureText: true,
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      GestureDetector(
                        onTap: () {
                          print('Forgot password clicked');
                        },
                        child: Text(
                          "Je m'inscris?",
                          style: TextStyle(
                            fontFamily: 'OpenSans-Regular',
                            color: upperTextColor,
                            fontSize: 16.0,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ),
                      SizedBox(height: 16.0),
                      GestureDetector(
                        onTap: () {
                          print('Forgot password clicked');
                        },
                        child: Text(
                          'Mot de passe oublié?',
                          style: TextStyle(
                            fontFamily: 'OpenSans-Regular',
                            color: upperTextColor,
                            fontSize: 16.0,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ),
                      SizedBox(height: 32.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomButton(
                          text: 'Inscription',
                          onPressed: _register
                        ),
                      ),
                      SizedBox(height: 32.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconButton(
                              icon: FontAwesomeIcons.facebook,
                              size: 50.0,
                              backgroundColor: upperBackgroundColor,
                              iconColor: upperTextColor,
                              onPressed: () {
                                print('Facebook button pressed');
                              },
                            ),
                            SizedBox(width: 16.0),
                            CustomIconButton(
                              icon: FontAwesomeIcons.google,
                              size: 50.0,
                              backgroundColor: upperBackgroundColor,
                              iconColor: upperTextColor,
                              onPressed: () {
                                print('Google button pressed');
                              },
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}