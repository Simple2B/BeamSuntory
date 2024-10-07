from flask_mail import Mail
from app.logger import log


class CustomMail(Mail):

    def send(self, message):
        try:
            super().send(message)
            log(log.INFO, "Email send")
        except Exception as e:
            log(log.ERROR, "Error during send email [%x]", e)
