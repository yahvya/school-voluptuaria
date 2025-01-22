import 'package:flutter/material.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'blur_background.dart';
import 'rating.dart';
import 'custom_text_field.dart';
import 'button.dart';

class WriteComment extends StatelessWidget {
  final Function(String comment, int rating) onSubmit;

  const WriteComment({
    Key? key,
    required this.onSubmit,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final TextEditingController commentController = TextEditingController();
    int currentRating = 0;

    return BlurBackground(
      blurIntensity: 0,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Ecrire un commentaire',
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold'),
              ),
            ),
            SizedBox(height: 32),
            CustomTextField(
              backgroundColor: backgroundColor,
              placeholder: "Votre commentaire",
            ),
            SizedBox(height: 32),
            Center(
              child: Rating(
                onRatingChanged: (newRating) {
                  currentRating = newRating;
                },
              ),
            ),
            SizedBox(height: 32),
            CustomButton(
              text: "Poster",
              onPressed: () {
                onSubmit(commentController.text, currentRating);
              },
            ),
          ],
        ),
      ),
    );
  }
} 