# Generated by Django 4.1.12 on 2023-11-20 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paperInfo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='paperinfo',
            name='keywords',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='paperinfo',
            name='paperPdf',
            field=models.CharField(default='', max_length=255),
        ),
    ]
