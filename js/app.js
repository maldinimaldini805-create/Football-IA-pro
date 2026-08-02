from flask import Flask, request, jsonify, render_template

app = Flask(__name__, template_folder='.')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/combine', methods=['POST'])
def api_generer_combine():
    data = request.get_json()
    liste_matchs = data.get('matchs', [])
    
    combine_resultat = []
    
    for match in liste_matchs:
        # Simulation des règles de calcul du robot :
        # Le robot analyse et applique une règle spécifique Victoire vs Double Chance
        if "Bayern" in match or "Arsenal" in match:
            choix = "Victoire Directe (1)"
            pourcentage = 78
        else:
            choix = "Double Chance 1X"
            pourcentage = 86
            
        combine_resultat.append({
            "match": match,
            "choix": choix,
            "pourcentage": pourcentage
        })
        
    return jsonify({
        "status": "success",
        "combine": combine_resultat
    })

if __name__ == '__main__':
    app.run(debug=True)
