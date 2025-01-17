import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:front/resources/themes/colors.dart';
import 'package:front/components/icon_button.dart';
import 'package:front/components/blur_background.dart';
import 'package:front/components/custom_text_field.dart';
import 'package:front/components/button.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class RegistrationPage extends StatelessWidget {
  const RegistrationPage({Key? key}) : super(key: key);

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
                          placeholder: 'Nom',
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          backgroundColor: backgroundColor,
                          placeholder: 'Prénom',
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          backgroundColor: backgroundColor,
                          placeholder: 'Email',
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          backgroundColor: backgroundColor,
                          placeholder: 'Mot de passe',
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
                          text: 'Connexion',
                          onPressed: () {
                            print('Connexion button pressed');
                          },
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