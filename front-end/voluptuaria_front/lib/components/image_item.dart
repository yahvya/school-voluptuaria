import 'package:flutter/material.dart';

class ImageItem extends StatelessWidget {
  final String imagePath;
  final VoidCallback onTap;
  final double width;
  final double height;
  final double borderRadius;

  ImageItem({
    required this.imagePath,
    required this.onTap,
    this.width = double.infinity,
    this.height = 300.0,
    
    this.borderRadius = 16.0,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10.0),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(borderRadius),
          child: Image.asset(
            imagePath,
            width: width,
            height: height,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}