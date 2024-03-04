from django.contrib import admin
from .models import Profile

class ProfileAdmin(admin.ModelAdmin):
    list = ('first_name', 'last_name', 'email', 'phone_number')

    admin.site.register(Profile)
