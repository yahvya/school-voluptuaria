import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

class CustomSearchBar extends StatelessWidget {
  final Color backgroundColor;
  final Color textColor;
  final double height;
  final double textSize;
  final IconData leftIcon;
  final String hintText;
  final double borderRadius;

  CustomSearchBar({
    this.backgroundColor = upperBackgroundColor,
    this.textColor = primaryText,
    this.height = 60,
    this.textSize = 20,
    this.leftIcon = Icons.search,
    this.hintText = 'Recherche',
    this.borderRadius = 20.0,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      padding: EdgeInsets.symmetric(horizontal: 10),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      child: Row(
        children: [
          Icon(leftIcon, color: textColor),
          SizedBox(width: 10),
          Expanded(
            child: TextField(
              style: TextStyle(color: textColor, fontSize: textSize),
              decoration: InputDecoration(
                hintText: hintText,
                hintStyle: TextStyle(color: textColor.withOpacity(0.5)),
                border: InputBorder.none,
              ),
            ),
          ),
        ],
      ),
    );
  }
}