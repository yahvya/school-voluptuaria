import 'package:flutter/material.dart';

// Widget affichant une galerie d'images défilable avec des photos cliquables
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
      // Définit la page initiale pour permettre un défilement infini
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
          // Calcul de l'index réel pour boucler les images
          int actualIndex = index % widget.imagePaths.length;
          return GestureDetector(
            // Appelle le callback lorsqu'une photo est tapée
            onTap: () {
              widget.onPhotoTap(widget.imagePaths[actualIndex]);
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(16.0),
                child: Image.asset(
                  widget.imagePaths[actualIndex],
                  fit: BoxFit.cover,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
