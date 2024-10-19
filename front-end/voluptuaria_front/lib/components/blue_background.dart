import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

class BlueBackground extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Positioned(
          top: 50,
          left: 20,
          right: 20,
          height: 500,
          child: Container(
            decoration: BoxDecoration(
              color: upperBackgroundColor,
              borderRadius: BorderRadius.circular(16.0),
            ),
          ),
        ),
      ],
    );
  }
}
