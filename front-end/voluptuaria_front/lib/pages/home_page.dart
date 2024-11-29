import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'package:voluptuaria_front/components/search_bar.dart';
import 'package:voluptuaria_front/components/gallery.dart';
import 'package:voluptuaria_front/components/category_gallery.dart';
import 'package:voluptuaria_front/components/navigation_bar.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: CustomSearchBar(),
        ),
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
                      style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, fontFamily: 'OpenSans-SemiBold'),
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
              child: CategoryGallery(
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
          currentIndex: 2,
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