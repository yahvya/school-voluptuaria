import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final double? width;
  final double? height;
  final Color backgroundColor;
  final Color textColor;
  final Color borderColor;
  final double fontSize;
  final double borderRadius;

  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.width,
    this.height = 60,
    this.backgroundColor = buttonBackgroundColor,
    this.textColor = buttonTextColor,
    this.borderColor = upperBorderColor,
    this.fontSize = 24,
    this.borderRadius = 20.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10), // Ajoute des marges intérieures gauche et droite pour espacer le bouton des bords
      child: SizedBox(
        width: width ?? double.infinity, // Si `width` n'est pas défini, le bouton prend toute la largeur disponible
        height: height,
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: backgroundColor,
            foregroundColor: textColor,
            textStyle: TextStyle(fontSize: fontSize),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(borderRadius), // Applique un arrondi au bouton
            ),
          ),
          onPressed: onPressed, // Action déclenchée lors du clic sur le bouton
          child: Text(text),
        ),
      ),
    );
  }
}
