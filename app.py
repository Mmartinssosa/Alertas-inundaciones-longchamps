from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

reportes = []

@app.route('/reportar', methods=['POST'])
def reportar_inundacion():
    data = request.get_json()
    if data and 'latitud' in data and 'longitud' in data and 'nivel' in data:
        reporte = {
            'latitud': data['latitud'],
            'longitud': data['longitud'],
            'nivel': data['nivel'],
            'hora': data.get('hora'),
            'comentarios': data.get('comentarios')
        }
        reportes.append(reporte)
        return jsonify({'mensaje': 'Reporte recibido con éxito!'}), 201
    else:
        return jsonify({'error': 'Datos inválidos'}), 400

@app.route('/obtener_reportes', methods=['GET'])
def obtener_reportes():
    return jsonify(reportes)

if __name__ == '__main__':
    app.run(debug=True)
