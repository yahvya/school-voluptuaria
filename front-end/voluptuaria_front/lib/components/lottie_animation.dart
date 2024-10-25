import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class LottieAnimation extends StatefulWidget {
  final String lottiePath;
  final double? width;
  final double? height;
  final bool repeat;
  final bool autoPlay;
  final Duration? duration;
  final BoxFit fit;
  final VoidCallback? onAnimationComplete;

  const LottieAnimation({
    Key? key,
    required this.lottiePath,
    this.width,
    this.height,
    this.repeat = true,
    this.autoPlay = true,
    this.duration,
    this.fit = BoxFit.contain,
    this.onAnimationComplete,
  }) : super(key: key);

  @override
  State<LottieAnimation> createState() => _LottieAnimationState();
}

class _LottieAnimationState extends State<LottieAnimation>
    with TickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration ?? const Duration(seconds: 2),
    );

    if (widget.autoPlay) {
      _controller.forward();
    }

    if (widget.repeat) {
      _controller.repeat();
    }

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        widget.onAnimationComplete?.call();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Lottie.asset(
      widget.lottiePath,
      controller: _controller,
      width: widget.width,
      height: widget.height,
      fit: widget.fit,
    );
  }

  void play() => _controller.forward();
  void pause() => _controller.stop();
  void reset() => _controller.reset();
  void replay() {
    _controller.reset();
    _controller.forward();
  }
}