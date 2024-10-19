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
        body: Stack(
          children: [
            Positioned.fill(
              child: BlueBackground(),
            ),

            Column(
              children: [
                Expanded(
                  child: Center(
                    child: CustomButton(
                      width: 300,

                      text: 'Click me please',
                      onPressed: () {
                        print('Button pressed');
                      },
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}