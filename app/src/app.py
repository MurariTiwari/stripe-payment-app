
from flask import Flask, render_template, request
import stripe

stripe_keys = {
  'secret_key': 'sk_test_uNcZ55PhCzKINk8ttQtUhhf6',
  'publishable_key': 'pk_test_OgtpYLyOzrBnlokVVbc4rlhG'
}

stripe.api_key = stripe_keys['secret_key']

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html', key=stripe_keys['publishable_key'])
  #return stripe_keys['publishable_key']

@app.route('/charge', methods=['POST'])
def charge():
  amount = 500
  customer = stripe.Customer.create(
      email= request.form['stripeEmail'],
      card=request.form['stripeToken']
  )

  charge = stripe.Charge.create(
      customer=customer.id,
      amount=request.form['stripeAmount'],
      currency='usd',
      description='Flask Charge'
  )
  #return render_template('charge.html', amount=amount)
  return 'success'

if __name__ == '__main__':
  app.run(debug=True)
