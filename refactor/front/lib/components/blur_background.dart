import 'package:flutter/material.dart';
import 'package:front/resources/themes/colors.dart';


class BlurBackground extends StatelessWidget {
  final double? width;
  final double? height;
  final Color backgroundColor;
  final double blurIntensity;
  final Widget? child;
  final BorderRadius? borderRadius;

  const BlurBackground({
    super.key,
    this.width,
    this.height,
    this.backgroundColor = upperBackgroundColor,
    this.blurIntensity = 5,
    this.child,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        borderRadius: borderRadius ?? BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: backgroundColor,
            blurRadius: blurIntensity,
            spreadRadius: -blurIntensity / 2,
          ),
        ],
      ),
      child: child,
    );
  }
}