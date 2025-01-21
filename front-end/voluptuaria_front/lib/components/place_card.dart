import 'package:flutter/material.dart';
import 'package:voluptuaria_front/components/image_item.dart';

class PlaceCard extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String datetime;
  final Function(bool isLike)? onRatingChange;
  final Function(String)? onPhotoTap;

  const PlaceCard({
    Key? key,
    required this.imageUrl,
    required this.title,
    required this.datetime,
    this.onRatingChange,
    this.onPhotoTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 200, // Set a fixed width
      height: 200, // Set a fixed height to make it square
      child: Card(
        clipBehavior: Clip.antiAlias,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        color: Colors.transparent, // Ensure no background color
        elevation: 0, // Remove shadow to ensure no color effect
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0), // Reduced padding
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  ImageItem(
                    imagePath: imageUrl,
                    onTap: () => onPhotoTap?.call("Photo"),
                    width: 72,
                    height: 72,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    title,
                    style: Theme.of(context).textTheme.titleLarge,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 4), // Reduced spacing
                  Text(
                    datetime,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Colors.grey[600],
                    ),
                    textAlign: TextAlign.center,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.thumb_down),
                        onPressed: () => onRatingChange?.call(false),
                        color: Colors.grey[600],
                      ),
                      IconButton(
                        icon: const Icon(Icons.thumb_up),
                        onPressed: () => onRatingChange?.call(true),
                        color: Colors.grey[600],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}