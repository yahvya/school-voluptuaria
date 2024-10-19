import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'components/button.dart';
import 'components/search_bar.dart';
import 'components/weather_info.dart';
import 'components/rating.dart';
import 'components/review.dart';
import 'components/blue_background.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Test',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Test'),
        ),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: CustomSearchBar(
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: WeatherInfo(
                dayOfWeek: 'Lundi',
                temperature: '17°C',
                pressure: 567,
                inf: 10,
                inf2: 10,
                weatherIcon: FontAwesomeIcons.wind,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Review(
                profileName: 'svel',
                profileImage: const AssetImage('lib/resources/images/profileImage.png'),
                commentText: "L'endroit est vraiment bien",
                rating: 1,
              ),
            ),
            Expanded(
              child: Center(
                child: CustomButton(
                  text: 'Click me please',
                  onPressed: () {
                    print('Button pressed');
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
