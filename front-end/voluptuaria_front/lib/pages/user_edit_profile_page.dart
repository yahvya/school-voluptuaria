import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'package:voluptuaria_front/components/blur_background.dart';
import 'package:voluptuaria_front/components/custom_text_field.dart';
import 'package:voluptuaria_front/components/button.dart';
import 'package:voluptuaria_front/components/profile_picture.dart';
import 'package:voluptuaria_front/components/navigation_bar.dart';
import 'package:voluptuaria_front/components/icon_button.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class UserEditProfilePage extends StatelessWidget {
  const UserEditProfilePage({Key? key}) : super(key: key);

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
                height: 500.0,
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
                          placeholder: 'Date de naissance',
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
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
                          placeholder: 'Téléphone',
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
          ],
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: CustomNavigationBar(
          currentIndex: 0,
          backgroundColor: upperBorderColor,
          borderRadius: 30.0,
          icons: [
            Icons.search,
            Icons.bookmark_border,
            Icons.home_outlined,
            Icons.place_outlined,
            Icons.person_outline,
          ],
          onIconTap: (index) {
            print('Icon $index tapped');
          },
        ),
      ),
    );
  }
}