import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

class PathCard extends StatelessWidget {
  final String title;
  final String startDate;
  final String endDate;
  final Color backgroundColor;
  final double borderRadius;
  final Widget buttonWidget;

  PathCard({
    required this.title,
    required this.startDate,
    required this.endDate,
    this.backgroundColor = upperBackgroundColor,
    this.borderRadius = 16.0,
    required this.buttonWidget,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                startDate,
                style: TextStyle(fontSize: 16),
              ),
              Row(
                children: [
                  Icon(
                    Icons.circle,
                    size: 8,
                    color: Colors.orange,
                  ),
                  SizedBox(width: 4),
                  Container(
                    width: 100,
                    height: 1,
                    child: DashLine(),
                  ),
                  SizedBox(width: 4),
                  Icon(
                    Icons.circle,
                    size: 8,
                    color: Colors.orange,
                  ),
                ],
              ),
              Text(
                endDate,
                style: TextStyle(fontSize: 16),
              ),
            ],
          ),
          SizedBox(height: 16),
          buttonWidget,
        ],
      ),
    );
  }
}

// Widget pour créer une ligne en pointillé
class DashLine extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final dashWidth = 5.0;
        final dashSpace = 3.0;
        final dashCount = (constraints.constrainWidth() / (dashWidth + dashSpace)).floor();
        return Flex(
          direction: Axis.horizontal,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: List.generate(dashCount, (_) {
            return SizedBox(
              width: dashWidth,
              height: 1,
              child: DecoratedBox(
                decoration: BoxDecoration(color: Colors.orange),
              ),
            );
          }),
        );
      },
    );
  }
}
