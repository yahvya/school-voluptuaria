import 'package:flutter/material.dart';
import 'package:front/resources/themes/colors.dart';

class CustomTextField extends StatelessWidget {
  final String? labelText;
  final String placeholder;
  final Color backgroundColor;
  final double borderRadius;
  final double fontSize;
  final Color placeholderColor;
  final TextEditingController controller;
  final bool obscureText;

  CustomTextField({
    this.labelText,
    required this.placeholder,
    this.backgroundColor = upperBackgroundColor,
    this.borderRadius = 16.0,
    this.fontSize = 20.0,
    this.placeholderColor = primaryText,
    required this.controller,
    required this.obscureText,
  });


  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (labelText != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Text(
              labelText!,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        Container(
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: BorderRadius.circular(borderRadius),
          ),
          padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
          child: TextField(
            controller: controller,  // Passer le contrôleur ici
            obscureText: obscureText,  // Passer la visibilité ici
            style: TextStyle(fontSize: fontSize),
            decoration: InputDecoration(
              hintText: placeholder,
              hintStyle: TextStyle(color: placeholderColor.withOpacity(0.5)),
              border: InputBorder.none,
            ),
          ),
        ),
      ],
    );
  }
}
