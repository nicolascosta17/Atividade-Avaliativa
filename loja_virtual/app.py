from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="registro",
)

# Página de cadastro
@app.route("/")
def homepage():
    return render_template("index.html")

# Página de consulta
@app.route("/consulta")
def consulta():
    return render_template("consulta.html")

# API REST - GET vendas
@app.route("/vendas", methods=["GET"])
def get_vendas():
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM venda ORDER BY id ASC")
    vendas = cursor.fetchall()
    cursor.close()
    return jsonify(vendas)

# API REST - POST venda
@app.route("/vendas", methods=["POST"])
def add_venda():
    data = request.get_json()
    produto = data.get("produto")
    valor = data.get("valor")
    cliente = data.get("cliente")

    cursor = mydb.cursor()
    sql = "INSERT INTO venda (produto, valor, cliente) VALUES (%s, %s, %s)"
    values = (produto, valor, cliente)
    cursor.execute(sql, values)
    mydb.commit()
    cursor.close()

    return jsonify({"message": "✅ Venda registrada com sucesso!"}), 201
# Rota DELETE - excluir venda
@app.route("/vendas/<int:venda_id>", methods=["DELETE"])
def delete_venda(venda_id):
    cursor = mydb.cursor()
    cursor.execute("DELETE FROM venda WHERE id = %s", (venda_id,))
    mydb.commit()
    cursor.close()
    return jsonify({"message": "✅ Venda excluída com sucesso!"})


if __name__ == "__main__":
    app.run(debug=True)
