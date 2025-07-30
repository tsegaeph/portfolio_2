from flask import Flask, render_template, request, redirect, url_for, flash
import requests

app = Flask(__name__)
app.secret_key = '3d88dcb4ba9015fa7d8924664dbaf67a'  # Needed for flash messages

# Telegram bot token and chat ID
TELEGRAM_BOT_TOKEN = '8048902693:AAGv_onoqAQ3ckyzpkpIfx6XzH-DfvFXEmE'
TELEGRAM_CHAT_ID = '1124986155'  # Usually your user ID or group ID


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    contact_info = request.form.get('contact', 'No contact info provided')
    message = request.form.get('message')

    if not name or not message:
        flash('Please fill in all required fields.')
        return redirect(url_for('index'))

    telegram_message = (
        f"📩 *New Contact Message from Portfolio Site*\n\n"
        f"*Name:* {name}\n"
        f"*Contact:* {contact_info}\n"
        f"*Message:* {message}"
    )

    send_message_url = (
        f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    )

    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': telegram_message,
        'parse_mode': 'Markdown'
    }

    try:
        response = requests.post(send_message_url, data=payload)
        response.raise_for_status()
        flash('Thank you for your message! I will get back to you soon.')
    except requests.exceptions.RequestException as e:
        print(f"Error sending message to Telegram: {e}")
        flash('Oops! Something went wrong while sending your message.')

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
