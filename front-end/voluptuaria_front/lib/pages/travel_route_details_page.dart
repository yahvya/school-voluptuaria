import 'package:flutter/material.dart';
import 'package:voluptuaria_front/components/place_card.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'package:voluptuaria_front/components/blur_background.dart';
import 'package:voluptuaria_front/components/category_gallery.dart';
import 'package:voluptuaria_front/components/image_item.dart';
import '../components/application-navbar.dart';
import 'package:voluptuaria_front/components/curved_line_painter.dart';

class TravelRouteDetailsPage extends StatelessWidget {
  const TravelRouteDetailsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 70,
        title: Center(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Image.asset(
              'lib/resources/images/app-icon.png',
              width: 100.0,
              height: 100.0,
            ),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 16.0),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Align(
                alignment: Alignment.center,
                child: Text('Nom du parcours',
                    style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold')
                ),
              ),
            ),
            const SizedBox(height: 16.0),
            Stack(
              children: [
                const Column(
                  children: [
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: Align(
                          alignment: Alignment.centerLeft,
                          child: PlaceCard(imageUrl: 'lib/resources/images/museum.jpg', title: 'Musée du louvre', datetime: '21/09/24 10h - 15h')
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: Align(
                          alignment: Alignment.centerRight,
                          child: PlaceCard(imageUrl: 'lib/resources/images/museum.jpg', title: 'Musée du louvre', datetime: '21/09/24 10h - 15h')
                      ),
                    ),
                  ],
                ),
                CustomPaint(
                  size: Size(100, 100),
                  painter: CurvedLinePainter(),
                ),
                CustomPaint(
                  size: Size(100, 100),
                  painter: CurvedLinePainter(reverse: true, x: 50, y: 200),
                ),
              ],
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Align(
                  alignment: Alignment.centerLeft,
                  child: PlaceCard(imageUrl: 'lib/resources/images/museum.jpg', title: 'Musée du louvre', datetime: '21/09/24 10h - 15h')
              ),
            ),
          ],
        ),
      ),

      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ApplicationNavbar(initialIndex: 3),
      ),
    );
  }
}