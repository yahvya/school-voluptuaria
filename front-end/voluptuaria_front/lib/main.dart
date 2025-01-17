import 'package:flutter/material.dart';
import 'package:voluptuaria_front/apis/voluptuaria/voluptuaria-model.dart';
import 'package:voluptuaria_front/app/graphical/Application.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => VoluptuariaModel())
      ],
      child: Application()
    )
  );
}