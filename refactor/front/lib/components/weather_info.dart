import 'package:flutter/material.dart';
import 'package:front/resources/themes/colors.dart';

class WeatherInfo extends StatelessWidget {
  final String dayOfWeek;
  final String temperature;
  final double pressure;
  final int inf;
  final int inf2;
  final IconData weatherIcon;
  final Color backgroundColor;
  final Color textColor;
  final double fontSize;
  final double borderRadius;

  WeatherInfo({
    required this.dayOfWeek,
    required this.temperature,
    required this.pressure,
    required this.inf,
    required this.inf2,
    required this.weatherIcon,
    this.backgroundColor = upperBackgroundColor,
    this.textColor = upperTextColor,
    this.fontSize = 20,
    this.borderRadius = 20,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(10), // Ajoute une marge intérieure pour le contenu du conteneur
      decoration: BoxDecoration(
        color: backgroundColor, // Couleur d'arrière-plan du widget
        borderRadius: BorderRadius.circular(borderRadius), // Arrondit les coins du widget
      ),
      child: Row(
        children: [
          Expanded(
            // Expanded distribue l'espace de manière égale entre les deux parties
            child: LeftWeatherInfo(
              dayOfWeek: dayOfWeek,
              temperature: temperature,
              weatherIcon: weatherIcon,
              textColor: textColor,
              fontSize: fontSize,
            ),
          ),
          Expanded(
            child: RightWeatherInfo(
              pressure: pressure,
              inf: inf,
              inf2: inf2,
              textColor: textColor,
              fontSize: fontSize,
            ),
          ),
        ],
      ),
    );
  }
}

class LeftWeatherInfo extends StatelessWidget {
  final String dayOfWeek;
  final String temperature;
  final IconData weatherIcon;
  final Color textColor;
  final double fontSize;

  LeftWeatherInfo({
    required this.dayOfWeek,
    required this.temperature,
    required this.weatherIcon,
    required this.textColor,
    required this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start, // Alignement à gauche
      children: [
        Text(
          dayOfWeek, // Affiche le jour de la semaine
          style: TextStyle(
            fontSize: fontSize,
            fontWeight: FontWeight.bold, // Met le texte en gras
            color: textColor,
          ),
        ),
        SizedBox(height: 5), // Espace entre le jour et la température
        Row(
          children: [
            Text(
              temperature, // Affiche la température
              style: TextStyle(fontSize: fontSize, color: textColor),
            ),
            SizedBox(width: 10), // Espace entre la température et l'icône
            Icon(weatherIcon, size: 30, color: textColor), // Icône de la météo
          ],
        ),
      ],
    );
  }
}

class RightWeatherInfo extends StatelessWidget {
  final double pressure;
  final int inf;
  final int inf2;
  final Color textColor;
  final double fontSize;

  RightWeatherInfo({
    required this.pressure,
    required this.inf,
    required this.inf2,
    required this.textColor,
    required this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start, // Alignement à gauche
      children: [
        Text(
          'Pression: $pressure bar', // Affiche la pression
          style: TextStyle(color: textColor, fontSize: fontSize),
        ),
        SizedBox(height: 5), // Espace entre les lignes
        Text(
          'Inf: $inf x', // Affiche l'inf 1
          style: TextStyle(color: textColor, fontSize: fontSize),
        ),
        SizedBox(height: 5),
        Text(
          'Inf 2: $inf2 x', // Affiche l'inf 2
          style: TextStyle(color: textColor, fontSize: fontSize),
        ),
      ],
    );
  }
}
