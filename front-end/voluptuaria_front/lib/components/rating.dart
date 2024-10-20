import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';

// Stateful widget for a rating component
class Rating extends StatefulWidget {
  final int starCount;
  final double size;
  final Color color;
  final Color borderColor;
  final Function(int) onRatingChanged;

  const Rating({
    Key? key,
    this.starCount = 5,
    this.size = 30,
    this.color = specialColor,
    this.borderColor = upperTextColor,
    required this.onRatingChanged,
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
        return GestureDetector(
          // Set rating on tap
          onTap: () {
            setState(() {
              _rating = index + 1;
              widget.onRatingChanged(_rating);
            });
          },
          child: MouseRegion(
            // Change hovered rating on mouse enter
            onEnter: (_) {
              setState(() {
                _hoveredRating = index + 1;
              });
            },
            // Reset hovered rating on mouse exit
            onExit: (_) {
              setState(() {
                _hoveredRating = 0;
              });
            },
            // Display star icon based on rating and hover state
            child: Icon(
              index < (_hoveredRating > 0 ? _hoveredRating : _rating)
                  ? Icons.star
                  : Icons.star_border,
              // Change color based on rating and hover state
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
