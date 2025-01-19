import 'package:flutter/material.dart';
import 'blur_background.dart';
import 'profile_picture.dart';
import 'rating.dart';

class Comment extends StatelessWidget {
  final String profileImagePath;
  final String profileName;
  final String commentText;
  final Rating rating;

  const Comment({
    Key? key,
    required this.profileImagePath,
    required this.profileName,
    required this.commentText,
    required this.rating,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlurBackground(
      blurIntensity: 0,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    ProfilePicture(
                      imagePath: profileImagePath,
                      size: 64,
                      borderRadius: 32,
                    ),
                    SizedBox(width: 12),
                    Text(
                      profileName.length > 8 ? '${profileName.substring(0, 8)}...' : profileName,
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.normal,
                      ),
                    ),
                  ],
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 16.0),
                  child: rating,
                ),
              ],
            ),
            SizedBox(height: 12),
            Text(
              commentText,
              style: TextStyle(fontSize: 18),
            ),
          ],
        ),
      ),
    );
  }
}