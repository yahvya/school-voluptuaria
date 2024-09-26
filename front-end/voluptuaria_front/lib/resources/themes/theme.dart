import 'package:flutter/material.dart';
import 'colors.dart'; // Импортируем ваш файл с цветами

ThemeData lightThemeData() {
  return ThemeData(
    brightness: Brightness.light,

    scaffoldBackgroundColor: backgroundColor,

    primaryColor: buttonBackgroundColor,
    colorScheme: ColorScheme.light().copyWith(
      primary: buttonBackgroundColor,
      onPrimary: buttonTextColor,
      secondary: specialColor,
      onSecondary: upperTextColor,
      background: backgroundColor,
      surface: upperBackgroundColor,
    ),

    textTheme: TextTheme(
      bodyMedium: TextStyle(color: primaryText),
      titleLarge: TextStyle(color: upperTextColor),
    ),

    buttonTheme: ButtonThemeData(
      buttonColor: buttonBackgroundColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8.0),
        side: BorderSide(color: buttonBorderColor),
      ),
    ),

    iconTheme: IconThemeData(
      color: iconColor,
    ),

    shadowColor: buttonShadowColor,
  );
}

ThemeData darkThemeData() {
  return ThemeData(
    brightness: Brightness.dark,

    scaffoldBackgroundColor: backgroundColorDark,

    primaryColor: buttonBackgroundColorDark,
    colorScheme: ColorScheme.dark().copyWith(
      primary: buttonBackgroundColorDark,
      onPrimary: buttonTextColorDark,
      secondary: specialColorDark,
      onSecondary: upperTextColorDark,
      background: backgroundColorDark,
      surface: upperBackgroundColorDark,
    ),

    textTheme: TextTheme(
      bodyMedium: TextStyle(color: primaryTextDark),
      titleLarge: TextStyle(color: upperTextColorDark),
    ),

    buttonTheme: ButtonThemeData(
      buttonColor: buttonBackgroundColorDark,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8.0),
        side: BorderSide(color: buttonBorderColorDark),
      ),
    ),

    iconTheme: IconThemeData(
      color: iconColorDark,
    ),

    shadowColor: buttonShadowColorDark,
  );
}