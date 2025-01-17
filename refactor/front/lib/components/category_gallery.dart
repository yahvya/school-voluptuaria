import 'package:flutter/material.dart';
import 'package:front/resources/themes/colors.dart';

// Widget affichant une galerie de catégories avec des images cliquables
class CategoryGallery extends StatefulWidget {
  final List<CategoryItem> items;
  final Color backgroundColor;
  final double borderRadius;
  final Function(String) onImageTap;

  CategoryGallery({
    required this.items,
    this.backgroundColor = upperBackgroundColor,
    this.borderRadius = 16.0,
    required this.onImageTap,
  });

  @override
  _CategoryGalleryState createState() => _CategoryGalleryState();
}

class _CategoryGalleryState extends State<CategoryGallery> {
  // Contrôleur de page pour le défilement des catégories
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(
      // Définit la page initiale pour permettre un défilement infini
      initialPage: widget.items.length * 1000,
      viewportFraction: 0.33,
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      // Décoration du conteneur avec couleur de fond et coins arrondis
      decoration: BoxDecoration(
        color: widget.backgroundColor,
        borderRadius: BorderRadius.circular(widget.borderRadius),
      ),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Catégories',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 16),
          SizedBox(
            height: 140,
            child: PageView.builder(
              controller: _pageController,
              itemBuilder: (context, index) {
                final actualIndex = index % widget.items.length;
                // Détecte le tap sur l'image et appelle le callback avec le nom de la catégorie
                return GestureDetector(
                  onTap: () {
                    widget.onImageTap(widget.items[actualIndex].categoryName);
                  },
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(16.0),
                        child: Image.asset(
                          widget.items[actualIndex].imagePath,
                          width: 100,
                          height: 100,
                          fit: BoxFit.cover,
                        ),
                      ),
                      SizedBox(height: 8),
                      Text(
                        widget.items[actualIndex].categoryName,
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// Modèle représentant un élément de catégorie avec image et nom
class CategoryItem {
  final String imagePath;
  final String categoryName;

  CategoryItem({required this.imagePath, required this.categoryName});
}