import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

import 'package:flutter/material.dart';

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
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      child: Row(
        children: [
          Expanded(
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
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          dayOfWeek,
          style: TextStyle(
            fontSize: fontSize,
            fontWeight: FontWeight.bold,
            color: textColor,
          ),
        ),
        SizedBox(height: 5),
        Row(
          children: [
            Text(
              temperature,
              style: TextStyle(fontSize: fontSize, color: textColor),
            ),
            SizedBox(width: 10),
            Icon(weatherIcon, size: 30, color: textColor),
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
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Pression: $pressure bar',
          style: TextStyle(color: textColor, fontSize: fontSize),
        ),
        SizedBox(height: 5),
        Text(
          'Inf: $inf x',
          style: TextStyle(color: textColor, fontSize: fontSize),
        ),
        SizedBox(height: 5),
        Text(
          'Inf 2: $inf2 x',
          style: TextStyle(color: textColor, fontSize: fontSize),
        ),
      ],
    );
  }
}
