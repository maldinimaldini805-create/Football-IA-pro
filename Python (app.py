from flask import Flask, request, jsonify

app = Flask(__name__)

# Base de données d'exemple ou logique de votre algorithme
def calculer_meilleure_option(match_id):
    # Exemple de logique : le robot calcule les probabilités lui-même
    # Remplacez ceci par vos vrais calculs de statistiques
    stats_dummy = {
        "MATCH_001": {"equipes": "Real Madrid vs FC Barcelone", "prob_win": 68, "prob_dc": 88},
        "MATCH_002": {"equipes": "Arsenal vs Chelsea", "prob_win": 54, "prob_dc": 81}
    }
    
    match = stats_dummy.get(match_id, {"equipes": match_id, "prob_win": 50, "prob_dc": 70})
    
    # Règle du robot pour différencier Victoire et Double Chance :
    # Si la probabilité de victoire est très haute (> 65%), on tente la Victoire Cash.
    # Sinon, on sécurise le combiné avec la Double Chance.
    if match["prob_win"] >= 65:
        choix = "Victoire Cash (1 ou 2)"
        pourcentage = match["prob_win"]
    else:
        choix = "Double Chance (1X ou X2)"
        pourcentage = match["prob_dc"]
        
    return {
        "match": match["equipes"],
        "choix": choix,
        "pourcentage": pourcentage
    }

@app.route('/api/combine', methods=['POST'])
def api_generer_combine():
    data = request.get_json()
    liste_ids = data.get('matchs', [])
    
    combine_resultat = []
    
    # Le robot traite chaque match coché
    for match_id in liste_ids:
        analyse = calculer_meilleure_option(match_id)
        combine_resultat.append(analyse)
        
    return jsonify({
        "status": "success",
        "combine": combine_resultat
    })

if __name__ == '__main__':
    app.run(debug=True)
