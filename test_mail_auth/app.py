import random
import smtplib
from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'super_secret_key'  # для flash-сообщений

# Временное хранилище для кода
verification_codes = {}

# Настройки вашей почты (здесь используется Gmail SMTP)
EMAIL_ADDRESS = 'bmlraXRhYm9zczQzQGdtYWlsLmNvbQ=='
EMAIL_PASSWORD = 'MTgzNjE5MzdTbiE='

def send_verification_email(to_email, code):
    subject = "Your Verification Code"
    body = f"Your verification code is: {code}"
    message = f"Subject: {subject}\n\n{body}"

    with smtplib.SMTP_SSL("smtp.gmail.com", 587) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.sendmail(EMAIL_ADDRESS, to_email, message)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email = request.form['email']
        code = str(random.randint(100000, 999999))
        verification_codes[email] = code
        try:
            send_verification_email(email, code)
            flash("Verification code sent to your email.", "info")
            return redirect(url_for('verify', email=email))
        except Exception as e:
            flash(f"Error sending email: {e}", "danger")
    return render_template('index.html')

@app.route('/verify', methods=['GET', 'POST'])
def verify():
    email = request.args.get('email')
    if request.method == 'POST':
        input_code = request.form['code']
        correct_code = verification_codes.get(email)
        if input_code == correct_code:
            flash("Email verified successfully!", "success")
            verification_codes.pop(email, None)  # удалить использованный код
        else:
            flash("Incorrect code. Try again.", "danger")
    return render_template('verify.html', email=email)

if __name__ == '__main__':
    app.run(debug=True)
