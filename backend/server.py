import requests

from collections import defaultdict
from datetime import datetime
from psycopg2 import pool
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from logic import format_db_row_to_transaction, BOUGHT, SOLD


LIVE_PRICE_API = 'https://api.coingecko.com/api/v3/simple/price'

app = Flask(__name__)
cors = CORS(app)

postgresql_pool = pool.SimpleConnectionPool(
    1,1000, database='exampledb', user='docker', password='docer', host='0.0.0.0', port='5431'
)

app.config['postgresql_pool'] = postgresql_pool

@app.route('/')
def health():
    return {'health': 'I am healthy'}

@app.route('/new_transaction', methods=["POST"])
def new_transaction():
    print("------post Transactions Endpoint------------")
    name = request.json['name']
    symbol = request.json['symbol']
    type = request.json['type']
    amount = request.json['amount']
    time_transacted = datetime.fromtimestamp(request.json['time_transacted'])
    time_created = datetime.fromtimestamp(request.json['time_created'])
    price_purchased_at = float(request.json['price_purchased_at'])
    no_of_coins = int(request.json['no_of_coins'])


    conn = postgresql_pool.getconn()
    cur = conn.cursor()

    insert_statement = f"""
    INSERT INTO 
    transaction (name, symbol, type, amount, time_transacted, time_created, price_purchased_at, no_of_coins ) 
    VALUES ('{name}', '{symbol}', '{type}', '{amount}', '{time_transacted}', '{time_created}', '{price_purchased_at}', '{no_of_coins}' )
    """

    cur.execute(insert_statement)
    conn.commit()

    return jsonify(request.json)

@app.route('/transactions', methods=['GET'])
@cross_origin()
def get_transactions():
    print("------Allclear Transactions Endpoint------------")

    cur = postgresql_pool.getconn().cursor()
    cur.execute("SELECT * FROM transaction")
    rows = cur.fetchall()

    return jsonify(
        [ format_db_row_to_transaction(row) for row in rows]
    )

@app.route('/get_rollups_by_coin')
def get_rollups_by_coin():
    print('-------------------starting endpoint----------------')
    portfolio = defaultdict(
        lambda : {
            'coins': 0,
            'total_cost': 0,
            'total_equity': 0,
            'live_price': 0
        }
    )

    # print(portfolio)

    conn = postgresql_pool.getconn()
    cur = conn.cursor()

    sql_cmd = """

        SELECT symbol, type, SUM(amount)/100 as total_amount, SUM(no_of_coins) as total_coins
        FROM "transaction"
        GROUp BY symbol, type

    """
    cur.execute(sql_cmd)
    rows = cur.fetchall()

    for row in rows:
        coin = row[0].strip()
        transaction_type = row[1]
        transaction_amount = row[2]
        transaction_coins = row[3]

        # if this is a purchase
        if transaction_type == 1:
            portfolio[coin]['total_cost'] += transaction_amount
            portfolio[coin]['coins'] += transaction_coins

        else: 
            portfolio[coin]['total_cost'] -= transaction_amount
            portfolio[coin]['coins'] -= transaction_coins

    symbol_to_coin_id_map = {
        'BTC' : 'bitcoin',
        'SOL': 'solana',
        'LINK': 'chainlink',
        'ETH' : 'ethereum',
        'ADA': 'cardano', 
        'MANA': 'decentraland'

    }   
    rollups_response = []

    for symbol in portfolio:
        print(symbol)
        response = requests.get(f'{LIVE_PRICE_API}?ids={symbol_to_coin_id_map[symbol]}&vs_currencies=usd').json()
        print( 'res===> ', response)
        live_price = response[symbol_to_coin_id_map[symbol]]['usd']  
        portfolio[symbol]['live_price'] = live_price
        portfolio[symbol]['total_equity'] = float(portfolio[symbol]['coins'] * live_price)

        rollups_response.append({
            'symbol': symbol,
            'live_price': round(float(portfolio[symbol]['live_price']), 2),
            'total_equity': round(float(portfolio[symbol]['total_equity']),2),
            'coins':  portfolio[symbol]['coins'],
            'total_cost': round(float(portfolio[symbol]['total_cost']), 2)
        })
    # print(rollups_response)


    return jsonify(rollups_response)


app.run(debug=True, host="0.0.0.0", port=5100)

