import os
import smtplib
from email.mime.text import MIMEText
from celery import Celery
from dotenv import load_dotenv
load_dotenv()

celery_app = Celery('worker', broker='redis://localhost:6379/0')

@celery_app.task
def send_ya_mail_task(recipient_email: str, msg_text: str):
    login = os.getenv("SMTP_LOGIN")
    password = os.getenv("SMTP_PASSWORD")
    msg = MIMEText(f'{msg_text}', 'plain', 'utf-8')
    msg['Subject'] = "New notification"
    msg['From'] = login
    msg['To'] = recipient_email
    s = smtplib.SMTP_SSL('smtp.yandex.ru', 465)
    try:
        s.login(login, password)
        s.sendmail(msg['From'], recipient_email, msg.as_string())
    except Exception as e:
        raise Exception("Unable to send email")
    finally:
        s.quit()