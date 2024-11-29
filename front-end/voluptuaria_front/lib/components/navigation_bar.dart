import 'package:flutter/material.dart';
import 'package:voluptuaria_front/pages/user_wish_list_page.dart';
import 'package:voluptuaria_front/pages/home_page.dart';
import 'package:voluptuaria_front/pages/travel_routes_page.dart';
import 'package:voluptuaria_front/pages/user_profile_page.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

class CustomNavigationBar extends StatelessWidget {
  final Color backgroundColor;
  final double borderRadius;
  final List<IconData> icons;
  final Function(int) onIconTap;
  final int currentIndex;

  CustomNavigationBar({
    required this.backgroundColor,
    this.borderRadius = 20.0,
    required this.icons,
    required this.onIconTap,
    required this.currentIndex,
  }) : assert(icons.length == 5, 'Must provide exactly 5 icons.');

  void _handleNavigation(BuildContext context, int index) {
    onIconTap(index);
    
    Widget? nextPage;
    switch (index) {
      case 0:
        nextPage = HomePage();
        break;
      case 1:
        nextPage = UserWishListPage();
        break;
      case 2:
        nextPage = HomePage();
        break;
      case 3:
        nextPage = TravelRoutesPage();
        break;
      case 4:
        nextPage = UserProfilePage();
        break;
    }

    if (nextPage != null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => nextPage!),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: List.generate(icons.length, (index) {
          return GestureDetector(
            onTap: () => _handleNavigation(context, index),
            child: Icon(
              icons[index],
              size: 35,
              color: index == currentIndex ? specialColor : Colors.black,
            ),
          );
        }),
      ),
    );
  }
}
