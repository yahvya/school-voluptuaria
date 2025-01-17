import 'package:flutter/material.dart';

class CustomNavigationBar extends StatelessWidget {
  final Color backgroundColor;
  final double borderRadius;
  final List<IconData> icons;
  final Function(int) onIconTap;
  final int currentIndex; // Nouvel attribut

  CustomNavigationBar({
    required this.backgroundColor,
    this.borderRadius = 20.0,
    required this.icons,
    required this.onIconTap,
    required this.currentIndex, // Initialisation du nouvel attribut
  }) : assert(icons.length == 5, 'Must provide exactly 5 icons.');

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
            onTap: () => onIconTap(index),
            child: Icon(
              icons[index],
              size: 35,
              color: index == currentIndex ? Colors.blue : Colors.black, // Changement de couleur si sélectionné
            ),
          );
        }),
      ),
    );
  }
}
