from django.db import models # type: ignore

class Users(models.Model):
    password = models.CharField(max_length=8)
    username = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.username
    
class Message(models.Model):
    sender = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )

    recipient = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name='received_messages'
    )

    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} -> {self.recipient}: {self.message}"