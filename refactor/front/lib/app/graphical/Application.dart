import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class Application extends StatelessWidget{
  final _router = GoRouter(
    initialLocation: "/",
    routes: [
    ]
  );

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router
    );
  }

}