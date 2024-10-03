import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:voluptuaria_front/components/button.dart';

void main() {
  testWidgets('CustomButton', (WidgetTester tester) async {
    bool buttonPressed = false;

    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: CustomButton(
          text: 'Тестовая кнопка',
          width: 300,
          height: 60,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 18,
          onPressed: () {
            buttonPressed = true;
          },
        ),
      ),
    ));

    expect(find.text('Test'), findsOneWidget);

    final SizedBox sizedBox = tester.widget<SizedBox>(find.byType(SizedBox));
    expect(sizedBox.width, 300);
    expect(sizedBox.height, 60);

    await tester.tap(find.byType(ElevatedButton));
    await tester.pump();

    expect(buttonPressed, isTrue);
  });
}
