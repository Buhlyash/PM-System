# Generated by Django 4.1.7 on 2023-04-18 17:53

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0003_project_board_project'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='usersWithAccess',
            field=models.ManyToManyField(related_name='usersWithAccess', to=settings.AUTH_USER_MODEL),
        ),
    ]
