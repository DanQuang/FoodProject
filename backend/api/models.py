from django.db import models

class FoodImage(models.Model):
    image = models.ImageField(upload_to='food_images/')  # Field for uploading images
    uploaded_at = models.DateTimeField(auto_now_add=True)  # Timestamp for uploads

    def __str__(self):
        return f"Image {self.id} uploaded at {self.uploaded_at}"