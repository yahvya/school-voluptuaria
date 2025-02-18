import 'package:flutter/material.dart';
import 'package:front/apis/voluptuaria/voluptuaria-model.dart';
import 'package:front/app/graphical/Application.dart';
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