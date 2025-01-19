import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

class CurvedLinePainter extends CustomPainter {
  final bool reverse;
  final double x;
  final double y;

  CurvedLinePainter({this.reverse = false, this.x = 0.0, this.y = 0.0});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = specialColor
      ..strokeWidth = 2.0
      ..style = PaintingStyle.stroke;

    var startPoint = Offset(size.width * 1.8 + x, size.height / 2 + y);
    var endPoint = reverse ? Offset(size.width * 0.6 + x, size.height * 1.8 + y) : Offset(size.width * 3 + x, size.height * 1.8 + y);

    final controlPoint = reverse ? Offset(size.width * 1.1 + x, 0 + y) : Offset(size.width * 2.5 + x, 0 + y);

    final path = Path()
      ..moveTo(startPoint.dx, startPoint.dy)
      ..quadraticBezierTo(
        controlPoint.dx,
        controlPoint.dy,
        endPoint.dx,
        endPoint.dy,
      );

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}