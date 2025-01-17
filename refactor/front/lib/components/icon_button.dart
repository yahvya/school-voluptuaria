import 'package:flutter/material.dart';
import 'package:front/resources/themes/colors.dart';

class CustomIconButton extends StatelessWidget {
  final IconData icon;
  final double size;
  final Color backgroundColor;
  final Color iconColor;
  final VoidCallback onPressed;

  CustomIconButton({
    required this.icon,
    this.size = 40.0,
    this.backgroundColor = upperBackgroundColor,
    this.iconColor = Colors.black,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: backgroundColor,
          shape: BoxShape.circle,
        ),
        child: Icon(
          icon,
          size: size * 0.6,
          color: iconColor,
        ),
      ),
    );
  }
}
