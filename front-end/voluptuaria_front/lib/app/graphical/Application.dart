import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:voluptuaria_front/app/configs/application-routes.dart';
import 'package:go_router/go_router.dart';
import 'package:voluptuaria_front/pages/forgot_password_page.dart';
import 'package:voluptuaria_front/pages/new_travel_route_form_page.dart';
import 'package:voluptuaria_front/pages/travel_route_details_page.dart';
import 'package:voluptuaria_front/pages/travel_routes_page.dart';
import 'package:voluptuaria_front/pages/user_wish_list_page.dart';
import 'package:voluptuaria_front/pages/place_details.dart';

import '../../pages/home_page.dart';
import '../../pages/login_page.dart';
import '../../pages/registration_page.dart';
import '../../pages/user_profile_page.dart';

class Application extends StatelessWidget{
  final _router = GoRouter(
    initialLocation: "/",
    routes: [
      GoRoute(
        path: "/",
        name: ApplicationRoutes.HOME_PAGE,
        builder: (context,state) => HomePage()
      ),
      GoRoute(
          path: "/home/search",
          name: ApplicationRoutes.HOME_SEARCH,
          builder: (context,state) => HomePage(autoFocusSearch: true)
      ),
      GoRoute(
          path: "/login",
          name: ApplicationRoutes.LOGIN_PAGE,
          builder: (context,state) => LoginPage()
      ),
      GoRoute(
          path: "/register",
          name: ApplicationRoutes.REGISTRATION_PAGE,
          builder: (context,state) => RegistrationPage()
      ),
      GoRoute(
          path: "/details",
          name: ApplicationRoutes.DETAILS_PAGE,
          builder: (context,state) => PlaceDetailsPage()
      ),
      GoRoute(
          path: "/favorites",
          name: ApplicationRoutes.FAVORITES_PAGES,
          builder: (context,state) => UserWishListPage()
      ),
      GoRoute(
          path: "/profile",
          name: ApplicationRoutes.USER_PROFILE_PAGE,
          builder: (context,state) => UserProfilePage()
      ),
      GoRoute(
          path: "/profile/edit",
          name: ApplicationRoutes.USER_PROFILE_EDIT,
          builder: (context,state) => UserProfilePage()
      ),
      GoRoute(
          path: "/travel-routes",
          name: ApplicationRoutes.TRAVEL_ROUTES_PAGE,
          builder: (context,state) => TravelRoutesPage()
      ),
      GoRoute(
          path: "/travel-routes/details",
          name: ApplicationRoutes.TRAVEL_ROUTES_PAGE_DETAILS,
          builder: (context,state) => TravelRouteDetailsPage()
      ),
      GoRoute(
          path: "/travel-routes/new",
          name: ApplicationRoutes.TRAVEL_ROUTES_CREATE,
          builder: (context,state) => NewTravelRouteFormPage()
      ),
      GoRoute(
          path: "/travel-routes/new",
          name: ApplicationRoutes.FORGOT_PASSWORD_PAGE,
          builder: (context,state) => ForgotPasswordPage()
      ),
    ]
  );

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}