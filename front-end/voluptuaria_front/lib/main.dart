import 'package:flutter/material.dart';
import 'package:voluptuaria_front/pages/home_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Test',
      home: HomePage(),
    );
  }
}
