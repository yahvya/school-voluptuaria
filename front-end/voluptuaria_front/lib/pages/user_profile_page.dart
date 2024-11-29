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

class UserProfilePage extends StatelessWidget {
  const UserProfilePage({Key? key}) : super(key: key);

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
                          placeholder: 'email@example.com',
                          fontSize: 16.0,
                          borderRadius: 12.0,
                        ),
                      ),
                      SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: CustomTextField(
                          backgroundColor: backgroundColor,
                          placeholder: '07/12/2000',
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
        child: CustomNavigationBar(
          currentIndex: 4,
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