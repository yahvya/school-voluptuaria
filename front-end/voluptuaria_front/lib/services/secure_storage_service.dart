import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SecureStorageService {
  final _storage = FlutterSecureStorage();

  Future<void> writeData(String key, String value) async {
    await _storage.write(key: key, value: value);
  }

  Future<String?> readData(String key) async {
    return await _storage.read(key: key);
  }

  Future<void> deleteData(String key) async {
    await _storage.delete(key: key);
  }

  Future<void> deleteAllData() async {
    await _storage.deleteAll();
  }

  Future<void> saveAllKeys() async {
    for (final entry in dotenv.env.entries) {
      if (entry.value != null) {
        await writeData(entry.key.toLowerCase(), entry.value);
      }
    }
  }
}