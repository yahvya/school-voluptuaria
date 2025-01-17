import 'package:flutter/material.dart';
import 'components/navigation_bar.dart';
import 'pages/home_page.dart';

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

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 2; // Index initial

  void _onIconTap(int index) {
    setState(() {
      _selectedIndex = index;
    });

    if (index == 2) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => HomePage()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Page ${_selectedIndex}'),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: CustomNavigationBar(
          backgroundColor: Colors.grey[200]!,
          borderRadius: 30.0,
          icons: [
            Icons.search,
            Icons.bookmark_border,
            Icons.home_outlined,
            Icons.place_outlined,
            Icons.person_outline,
          ],
          onIconTap: _onIconTap,
          currentIndex: _selectedIndex,
        ),
      ),
    );
  }
}