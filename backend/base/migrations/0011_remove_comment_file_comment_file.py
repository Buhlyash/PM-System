# Generated by Django 4.1.7 on 2023-05-26 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_file_comment_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='file',
        ),
        migrations.AddField(
            model_name='comment',
            name='file',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.file'),
        ),
    ]