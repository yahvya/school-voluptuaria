import 'package:flutter/material.dart';
import 'package:voluptuaria_front/components/application-navbar.dart';
import 'package:voluptuaria_front/components/search_bar.dart';
import 'package:voluptuaria_front/components/gallery.dart';
import 'package:voluptuaria_front/components/category_gallery.dart';

class HomePage extends StatelessWidget {
  final bool autoFocusSearch;

  const HomePage({
    super.key,
    this.autoFocusSearch = false,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: CustomSearchBar(autofocus: autoFocusSearch),
        ),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Lieux du jour',
                      style: TextStyle(fontSize: 30,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'OpenSans-SemiBold'),
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
            Padding(
              padding: const EdgeInsets.all(0.0),
              child: Gallery(
                imagePaths: const [
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
              child: CategoryGallery(
                items: [
                  CategoryItem(imagePath: 'lib/resources/images/restaurant.jpg',
                      categoryName: 'Restaurants'),
                  CategoryItem(imagePath: 'lib/resources/images/hotel.jpeg',
                      categoryName: 'Hotels'),
                  CategoryItem(imagePath: 'lib/resources/images/shop.jpg',
                      categoryName: 'Shop'),
                  CategoryItem(imagePath: 'lib/resources/images/museum.jpg',
                      categoryName: 'Musée'),
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
        child: ApplicationNavbar(initialIndex: autoFocusSearch ? 0 : 2),
      ),
    );
  }
}
