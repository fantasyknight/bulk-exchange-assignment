from django.core.exceptions import ValidationError
from django.test import TestCase
from profiles.models import Profile

class ProfileModelTest(TestCase):
    def test_valid_phone_number(self):
        """
        Test that a valid phone number passes validation.
        """
        profile = Profile(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            phone_number="1234567890"  # Example valid phone number
        )
        # This should not raise any validation error
        profile.full_clean()

    def test_invalid_phone_number(self):
        """
        Test that an invalid phone number raises validation error.
        """
        profile = Profile(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            phone_number="asdfw42342d"  # Example invalid phone number
        )
        # This should raise a validation error
        with self.assertRaises(ValidationError):
            profile.full_clean()

    def test_unique_email(self):
        """
        Test that email field is unique.
        """
        # Create a profile with a specific email
        Profile.objects.create(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            phone_number="1234567890"
        )

        # Try to create another profile with the same email
        duplicate_profile = Profile(
            first_name="Jane",
            last_name="Doe",
            email="john@example.com",  # Same email as previous profile
            phone_number="9876543210"
        )
        # This should raise a validation error because email must be unique
        with self.assertRaises(ValidationError):
            duplicate_profile.full_clean()
