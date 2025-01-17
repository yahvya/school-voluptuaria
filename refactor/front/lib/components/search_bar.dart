import 'package:flutter/material.dart';
import 'package:front/resources/themes/colors.dart';

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
      padding: EdgeInsets.symmetric(horizontal: 10), // Padding à l'intérieur pour espacer le contenu des bords
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius), // Arrondir les coins de la barre de recherche
      ),
      child: Row(
        children: [
          Icon(leftIcon, color: textColor), // Icône à gauche
          SizedBox(width: 10), // Espacement entre l'icône et le champ de texte
          Expanded(
            // Expanded permet au TextField de prendre tout l'espace restant
            child: TextField(
              style: TextStyle(color: textColor, fontSize: textSize),
              decoration: InputDecoration(
                hintText: hintText,
                hintStyle: TextStyle(color: textColor.withOpacity(0.5)), // Réduit l'opacité pour différencier le hint text
                border: InputBorder.none, // Supprime la bordure par défaut du TextField
              ),
            ),
          ),
        ],
      ),
    );
  }
}
