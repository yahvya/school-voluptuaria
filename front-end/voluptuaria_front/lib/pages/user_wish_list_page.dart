import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'package:voluptuaria_front/components/search_bar.dart';
import 'package:voluptuaria_front/components/blur_background.dart';
import 'package:voluptuaria_front/components/custom_text_field.dart';
import 'package:voluptuaria_front/components/button.dart';
import 'package:voluptuaria_front/components/gallery.dart';
import 'package:voluptuaria_front/components/category_gallery.dart';
import 'package:voluptuaria_front/components/navigation_bar.dart';

class UserWishListPage extends StatelessWidget {
  const UserWishListPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 100,
        title: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
          child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Lieux enregistrés',
                      style: TextStyle(fontSize: 30, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold'),
                    ),
                  ),
                  Image.asset(
                    'lib/resources/images/app-icon.png',
                    width: 100.0,
                    height: 100.0,
                  ),
                ],
              ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Gallery(
                imagePaths: [
                  'lib/resources/images/place1.jpg',
                  'lib/resources/images/place2.jpg',
                  'lib/resources/images/place3.jpg',
                ],
                onPhotoTap: (imagePath) {
                  print('Tapped on $imagePath');
                },
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(16.0),
              child: BlurBackground(
                width: 400.0,
                height: 150.0,
                blurIntensity: 0.0,
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Musée du louvre', 
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold')
                            ),
                            IconButton(
                              icon: Icon(Icons.favorite_border),
                              onPressed: () {
                                print('Favorite button pressed');
                              },
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text('18 rue de test, Paris France', 
                                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w400, fontFamily: 'OpenSans-SemiBold')
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Ouvert', 
                                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w400, fontFamily: 'OpenSans-SemiBold', color: specialColor)
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: CategoryGallery(
                title: 'Lieux que vous pourriez aimer',
                items: [
                  CategoryItem(imagePath: 'lib/resources/images/restaurant.jpg', categoryName: 'Restaurants'),
                  CategoryItem(imagePath: 'lib/resources/images/hotel.jpeg', categoryName: 'Hotels'),
                  CategoryItem(imagePath: 'lib/resources/images/shop.jpg', categoryName: 'Shop'),
                  CategoryItem(imagePath: 'lib/resources/images/museum.jpg', categoryName: 'Musée'),
                ],
                onImageTap: (category) {
                  print('Tapped on $category');
                },
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