# Generated by Django 4.1.7 on 2023-05-26 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_product_upload'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='upload',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
