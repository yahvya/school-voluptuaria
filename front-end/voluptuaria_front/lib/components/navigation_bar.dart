import 'package:flutter/material.dart';
import 'package:voluptuaria_front/pages/user_wish_list_page.dart';
import 'package:voluptuaria_front/pages/home_page.dart';
import 'package:voluptuaria_front/pages/travel_routes_page.dart';
import 'package:voluptuaria_front/pages/user_profile_page.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

class CustomNavigationBar extends StatefulWidget {
  final Color backgroundColor;
  final double borderRadius;
  final List<IconData> icons;
  final Function(int) onIconTap;
  final int initialIndex;

  CustomNavigationBar({
    required this.backgroundColor,
    this.borderRadius = 20.0,
    required this.icons,
    required this.onIconTap,
    this.initialIndex = 2,
  }) : assert(icons.length == 5, 'Must provide exactly 5 icons.');

  @override
  _CustomNavigationBarState createState() => _CustomNavigationBarState();
}

class _CustomNavigationBarState extends State<CustomNavigationBar> {
  late int currentIndex;

  @override
  void initState() {
    super.initState();
    currentIndex = widget.initialIndex;
  }

  void _handleNavigation(BuildContext context, int index) {
    setState(() {
      currentIndex = index;
    });
    widget.onIconTap(index);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: widget.backgroundColor,
        borderRadius: BorderRadius.circular(widget.borderRadius),
      ),
      padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: List.generate(widget.icons.length, (index) {
          return GestureDetector(
            onTap: () => _handleNavigation(context, index),
            child: Icon(
              widget.icons[index],
              size: 35,
              color: currentIndex == index ? specialColor : Colors.black,
            ),
          );
        }),
      ),
    );
  }
}
