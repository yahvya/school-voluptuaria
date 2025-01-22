import 'package:flutter/material.dart';
import 'package:voluptuaria_front/apis/voluptuaria/voluptuaria-model.dart';
import 'package:voluptuaria_front/app/graphical/Application.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:voluptuaria_front/services/secure_storage_service.dart';
import 'package:voluptuaria_front/config/config.dart';
import 'package:voluptuaria_front/services/user_registration_service.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  final secureStorageService = SecureStorageService();
  await secureStorageService.saveAllKeys();

  final userRegistrationService = UserRegistrationService(
    baseUrl: 'http://192.168.211.252:9045',
    encryptionSecret: await Config.securityVoluptuariaTokenSecret,
  );

  final result = await userRegistrationService.classicallyRegisterUser(
        lang: 'french',
        email: 'ntsn444@gmail.com',
        password: 'Password1234@',
        name: 'Test',
        firstname: 'User',
      );

  print(result);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => VoluptuariaModel())
      ],
      child: Application()
    )
  );
}