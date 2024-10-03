import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:voluptuaria_front/components/button.dart'; // Импортируем ваш виджет

void main() {
  testWidgets('CustomButton отображает правильный текст и реагирует на нажатие', (WidgetTester tester) async {
    // Флаг, чтобы отследить вызов onPressed
    bool buttonPressed = false;

    // Рендерим наш виджет в тестовой среде
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

    // Проверяем, что кнопка отображает правильный текст
    expect(find.text('Тестовая кнопка'), findsOneWidget);

    // Проверяем, что размеры кнопки заданы правильно
    final SizedBox sizedBox = tester.widget<SizedBox>(find.byType(SizedBox));
    expect(sizedBox.width, 300);
    expect(sizedBox.height, 60);

    // Проверяем, что функция onPressed работает
    await tester.tap(find.byType(ElevatedButton));
    await tester.pump(); // Обновляем состояние

    // Ожидаем, что переменная buttonPressed станет true после нажатия
    expect(buttonPressed, isTrue);
  });
}
