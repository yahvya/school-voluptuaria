import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:voluptuaria_front/app/configs/application-routes.dart';
import 'package:go_router/go_router.dart';

import 'navigation_bar.dart';
import '../resources/themes/colors.dart';

/// application navbar
class ApplicationNavbar extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    var routing = [
      {
        "icon" : Icons.search,
        "route" : ApplicationRoutes.HOME_SEARCH
      },
      {
        "icon" : Icons.bookmark_border,
        "route" : ApplicationRoutes.FAVORITES_PAGES
      },
      {
        "icon" : Icons.home_outlined,
        "route" : ApplicationRoutes.HOME_PAGE
      },
      {
        "icon" : Icons.place_outlined,
        "route" : ApplicationRoutes.TRAVEL_ROUTES_PAGE
      },
      {
        "icon" : Icons.person_outline,
        "route" : ApplicationRoutes.USER_PROFILE_PAGE
      },
    ];

    return CustomNavigationBar(
      currentIndex: 0,
      backgroundColor: upperBorderColor,
      borderRadius: 30.0,
      icons: routing.map((config) => config["icon"] as IconData).toList(),
      onIconTap: (index) {
        GoRouter.of(context).pushNamed(routing[index]["route"] as String);
      },
    );
  }
}