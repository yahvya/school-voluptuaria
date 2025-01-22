import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:front/resources/themes/colors.dart';
import 'package:front/components/blur_background.dart';
import 'package:front/components/custom_text_field.dart';
import 'package:front/components/button.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../apis/service/registrationService.dart';
import '../app/configs/application-routes.dart';

class RegistrationConfirmationPage extends StatefulWidget {
  const RegistrationConfirmationPage({Key? key}) : super(key: key);

  @override
  State<RegistrationConfirmationPage> createState() => _RegistrationConfirmationPage();
}

class _RegistrationConfirmationPage extends State<RegistrationConfirmationPage>{

  final _codeController = TextEditingController();

  String? name;
  String? firstname;
  String? email;
  String? password;
  String? confirmationCode;
  String? confirmationCodeIv;

  @override
  void initState() {
    super.initState();
    _loadUserData();  // Charger les informations utilisateur
  }

  Future<void> _loadUserData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      name = prefs.getString('name');
      firstname = prefs.getString('firstname');
      email = prefs.getString('email');
      password = prefs.getString('password');
      confirmationCode = prefs.getString('confirmationCode');
      confirmationCodeIv = prefs.getString('confirmationCodeIv');
    });
  }


  // Fonction de confirmation d'enregistrement
  Future<void> _confirmRegistration() async {
    final  RegistrationService _confirmationService = RegistrationService();
    try {
      // Vérifiez si les données sont chargées
      if (name == null || email == null || firstname == null || password == null || confirmationCode == null || confirmationCodeIv == null) {
        throw Exception('Données manquantes');
      }

      final code = _codeController.text;

      // Appel à l'API de confirmation avec l'email et le code
      final response = await _confirmationService.confirmRegistration(name!,firstname!,email!, password!, confirmationCode!, confirmationCodeIv!, code);

      // Afficher un message de succès
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Inscription réussie')),
      );

      GoRouter.of(context).pushNamed(ApplicationRoutes.HOME_PAGE);
    } catch (e) {
      // Afficher un message d'erreur si la confirmation échoue
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
            SizedBox(height: 32.0),
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Text(
                      'Voluptuaria',
                      style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, fontFamily: 'OpenSans-SemiBold'),
                    ),
            ),
            SizedBox(height: 32.0),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: BlurBackground(
                width: 400.0,
                height: 500.0,
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
                      SizedBox(height: 32.0),
                      Text(
                      'Veuillez saisir le code reçu',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, fontFamily: 'OpenSans-SemiBold'),
                      ),
                      SizedBox(height: 32.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          controller: _codeController,
                          backgroundColor: backgroundColor,
                          placeholder: 'Code de confirmation',
                          obscureText: false,
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 32.0),
                      GestureDetector(
                        onTap: () {
                          print('Forgot password clicked');
                        },
                        child: Text(
                          "Connexion?",
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
                          text: 'Confirmer',
                          onPressed: _confirmRegistration
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