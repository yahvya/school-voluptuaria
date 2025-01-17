import 'package:flutter/material.dart';
import 'rating.dart';
import 'package:front/resources/themes/colors.dart';

class Review extends StatelessWidget {
  final Color backgroundColor;
  final String profileName;
  final ImageProvider profileImage;
  final String commentText;
  final Color commentTextColor;
  final double commentTextSize;
  final double borderRadius;
  final int rating;

  Review({
    this.backgroundColor = upperBackgroundColor,
    this.commentTextColor = upperTextColor,
    this.commentTextSize = 20.0,
    this.borderRadius = 20,
    required this.profileName,
    required this.profileImage,
    required this.commentText,
    required this.rating,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: backgroundColor, // Couleur d'arrière-plan du widget
        borderRadius: BorderRadius.circular(borderRadius), // Arrondit les coins du widget
      ),
      padding: EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                backgroundImage: profileImage,
                radius: 24.0,
              ),
              SizedBox(width: 16.0),
              Text(
                profileName,
                style: TextStyle(
                    color: commentTextColor,
                    fontSize: commentTextSize,
                ),
              ),
              SizedBox(width: 16.0),
              Rating(onRatingChanged: (rating) {
                print(rating);
              }),
            ]
          ),
          SizedBox(height: 16.0),
          Text(
            commentText,
            style: TextStyle(
              color: commentTextColor,
              fontSize: commentTextSize,
            ),
          ),
        ],
      ),
    );
  }
}
