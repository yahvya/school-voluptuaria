import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

// Stateful widget for a rating component
class Rating extends StatefulWidget {
  final int starCount;
  final double size;
  final Color color;
  final Color borderColor;
  final Function(int)? onRatingChanged;
  final bool isStatic;
  final int staticRating;

  const Rating({
    Key? key,
    this.starCount = 5,
    this.size = 30,
    this.color = specialColor,
    this.borderColor = upperTextColor,
    this.onRatingChanged,
    this.isStatic = false,
    this.staticRating = 0,
  }) : super(key: key);

  @override
  _RatingState createState() => _RatingState();
}

class _RatingState extends State<Rating> {
  int _rating = 0;
  int _hoveredRating = 0;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(widget.starCount, (index) {
        if (widget.isStatic) {
          return Icon(
            index < widget.staticRating ? Icons.star : Icons.star_border,
            color: index < widget.staticRating ? widget.color : widget.borderColor,
            size: widget.size,
          );
        }
        
        return GestureDetector(
          onTap: () {
            setState(() {
              _rating = index + 1;
              widget.onRatingChanged?.call(_rating);
            });
          },
          child: MouseRegion(
            onEnter: (_) {
              setState(() {
                _hoveredRating = index + 1;
              });
            },
            onExit: (_) {
              setState(() {
                _hoveredRating = 0;
              });
            },
            child: Icon(
              index < (_hoveredRating > 0 ? _hoveredRating : _rating)
                  ? Icons.star
                  : Icons.star_border,
              color: index < (_hoveredRating > 0 ? _hoveredRating : _rating)
                  ? widget.color
                  : widget.borderColor,
              size: widget.size,
            ),
          ),
        );
      }),
    );
  }
}
