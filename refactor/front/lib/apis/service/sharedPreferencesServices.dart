import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesService {
  // Méthode pour obtenir l'instance de SharedPreferences
  Future<SharedPreferences> _getPrefs() async {
    return await SharedPreferences.getInstance();
  }

  // Méthode pour enregistrer une chaîne de caractères
  Future<void> saveString(String key, String value) async {
    final prefs = await _getPrefs();
    await prefs.setString(key, value);
  }

  // Méthode pour récupérer une chaîne de caractères
  Future<String?> getString(String key) async {
    final prefs = await _getPrefs();
    return prefs.getString(key);
  }

  // Méthode pour enregistrer un booléen
  Future<void> saveBool(String key, bool value) async {
    final prefs = await _getPrefs();
    await prefs.setBool(key, value);
  }

  // Méthode pour récupérer un booléen
  Future<bool?> getBool(String key) async {
    final prefs = await _getPrefs();
    return prefs.getBool(key);
  }

  // Méthode pour supprimer une valeur
  Future<void> remove(String key) async {
    final prefs = await _getPrefs();
    await prefs.remove(key);
  }
}
