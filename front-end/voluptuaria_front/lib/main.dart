import 'package:flutter/material.dart';
import 'package:voluptuaria_front/apis/voluptuaria/voluptuaria-model.dart';
import 'package:voluptuaria_front/app/graphical/Application.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:voluptuaria_front/services/secure_storage_service.dart';
import 'package:voluptuaria_front/config/config.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  final secureStorageService = SecureStorageService();
  await secureStorageService.saveAllKeys();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => VoluptuariaModel())
      ],
      child: Application()
    )
  );
}