import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'package:voluptuaria_front/components/blur_background.dart';
import 'package:voluptuaria_front/components/category_gallery.dart';
import 'package:voluptuaria_front/components/image_item.dart';
import '../components/application-navbar.dart';

class UserWishListPage extends StatelessWidget {
  const UserWishListPage({super.key});

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
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ImageItem(
                      imagePath: 'lib/resources/images/place1.jpg',
                      onTap: () {
                        print('Tapped on place1');
                      },
                      width: double.infinity,
                      height: 200.0,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ImageItem(
                      imagePath: 'lib/resources/images/place2.jpg',
                      onTap: () {
                        print('Tapped on place2');
                      },
                      width: double.infinity,
                      height: 200.0,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ImageItem(
                      imagePath: 'lib/resources/images/place3.jpg',
                      onTap: () {
                        print('Tapped on place3');
                      },
                      width: double.infinity,
                      height: 200.0,
                    ),
                  ),
                ],
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
                            const Text('Musée du louvre',
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold')
                            ),
                            IconButton(
                              icon: const Icon(Icons.favorite_border),
                              onPressed: () {
                                print('Favorite button pressed');
                              },
                            ),
                          ],
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text('18 rue de test, Paris France', 
                                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w400, fontFamily: 'OpenSans-SemiBold')
                          ),
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
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
        child: ApplicationNavbar(initialIndex: 1),
      ),
    );
  }
}