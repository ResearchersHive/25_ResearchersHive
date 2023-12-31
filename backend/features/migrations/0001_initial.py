# Generated by Django 4.1.12 on 2023-12-02 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ConferencesCache',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('conference_id', models.IntegerField(unique=True)),
                ('conference_name', models.CharField(max_length=255)),
                ('deadline', models.CharField(max_length=255)),
                ('venue', models.CharField(max_length=255)),
                ('conference_link', models.CharField(max_length=255)),
                ('fetch_date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'conferences_cache',
            },
        ),
    ]
