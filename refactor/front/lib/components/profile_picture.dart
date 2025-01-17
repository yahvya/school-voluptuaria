import 'package:flutter/material.dart';

class ProfilePicture extends StatelessWidget {
  final double size;
  final double borderRadius;
  final String imagePath;
  final Color backgroundColor;

  const ProfilePicture({
    super.key,
    this.size = 96,
    this.borderRadius = 16,
    required this.imagePath,
    this.backgroundColor = const Color(0xFFE5E7EB),
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      clipBehavior: Clip.antiAlias,
      child: Image.asset(
        imagePath,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return Container(
            color: backgroundColor,
            child: Icon(
              Icons.person,
              size: size * 0.5,
              color: Colors.white,
            ),
          );
        },
      ),
    );
  }
}
