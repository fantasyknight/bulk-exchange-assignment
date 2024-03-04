from django.core.validators import RegexValidator
from django.db import models

phone_number_validator = RegexValidator(
    regex=r'^\d{10,15}$',
    message="Phone number must be entered in the format: '9999999999'. Up to 15 digits allowed."
)

class Profile(models.Model):
    """
    Model representing a user profile.

    Attributes:
        first_name (str): The first name of the user.
        last_name (str): The last name of the user.
        email (str): The email address of the user. Must be unique.
        phone_number (str): The phone number of the user. Must be unique and consist of only digits.
    """
    first_name = models.CharField(max_length=255, blank=False, null=False)
    last_name = models.CharField(max_length=255, blank=False, null=False)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True, validators=[phone_number_validator])

    def __str__(self):
        """
        Return a string representation of the profile.
        """
        return f"{self.first_name} {self.last_name}"
