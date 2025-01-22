import 'package:flutter/material.dart';
import 'image_item.dart';

class Gallery extends StatefulWidget {
  final List<String> imagePaths;
  final Function(String) onPhotoTap;

  Gallery({required this.imagePaths, required this.onPhotoTap});

  @override
  _GalleryState createState() => _GalleryState();
}

class _GalleryState extends State<Gallery> {
  late PageController _pageController;
  int _currentPage = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(
      initialPage: widget.imagePaths.length * 1000,
      viewportFraction: 0.8,
    );
    _currentPage = widget.imagePaths.length * 1000;
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      child: PageView.builder(
        controller: _pageController,
        itemBuilder: (context, index) {
          int actualIndex = index % widget.imagePaths.length;
          return ImageItem(
            imagePath: widget.imagePaths[actualIndex],
            onTap: () {
              widget.onPhotoTap(widget.imagePaths[actualIndex]);
            },
          );
        },
      ),
    );
  }
}