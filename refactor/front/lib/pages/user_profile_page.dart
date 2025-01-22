import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:front/pages/application-navbar.dart';
import 'package:front/resources/themes/colors.dart';
import 'package:front/components/blur_background.dart';
import 'package:front/components/custom_text_field.dart';
import 'package:front/components/button.dart';
import 'package:front/components/profile_picture.dart';
import 'package:front/components/icon_button.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class UserProfilePage extends StatefulWidget {
  const UserProfilePage({Key? key}) : super(key: key);
  @override
  State<UserProfilePage> createState() => _UserProfilePage();
}
class _UserProfilePage extends State<UserProfilePage>{

  final _emailController = TextEditingController();
  final _birthdayContoller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            print('Icon button pressed');
          },
          icon: const Icon(Icons.arrow_back),
          iconSize: 30.0,
        ),
        title: const Text(
          'Profil utilisateur',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.w500,
            fontFamily: 'OpenSans-SemiBold',
          ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  SizedBox(width: 40.0),
                  ProfilePicture(
                    size: 128,
                    imagePath: 'lib/resources/images/profileImage.jpg',
                  ),
                  SizedBox(width: 32.0),
                  Column(
                    children: [
                      Text(
                        'John Doe',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold'),
                      ),
                      SizedBox(height: 8.0),
                      SizedBox(
                        width: 160,
                        height: 40,
                        child: CustomButton(
                          fontSize: 16,
                          text: 'Modifier',
                          onPressed: () {
                            print('Modifier button pressed');
                          },
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 16.0),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: BlurBackground(
                width: 400.0,
                height: 260.0,
                blurIntensity: 0.0,
                child: Align(
                  alignment: Alignment.topCenter,
                  child: Column(
                    children: [
                      SizedBox(height: 16.0),
                      Text(
                        'Vos informations',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold'),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          backgroundColor: backgroundColor,
                          controller: _emailController,
                          placeholder: 'email@example.com',
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
                          controller: _birthdayContoller,
                          placeholder: '07/12/2000',
                          obscureText: false,
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: IconButton(
                          onPressed: () {
                            print('Icon button pressed');
                          },
                          icon: Icon(Icons.info_sharp),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(height: 16.0),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: BlurBackground(
                width: 400.0,
                height: 160.0,
                blurIntensity: 0.0,
                child: Align(
                  alignment: Alignment.topCenter,
                  child: Column(
                    children: [
                      SizedBox(height: 16.0),
                      Text(
                        'Réseaux sociaux',
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold'),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconButton(
                              icon: FontAwesomeIcons.facebook,
                              size: 75.0,
                              backgroundColor: upperBackgroundColor,
                              iconColor: upperTextColor,
                              onPressed: () {
                                print('Facebook button pressed');
                              },
                            ),
                            SizedBox(width: 16.0),
                            CustomIconButton(
                              icon: FontAwesomeIcons.instagram,
                              size: 75.0,
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
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ApplicationNavbar(),
      ),
    );
  }
}